import Lock from "./lock.model.js";
import { metrics } from "../../config/metrics.js";
import { getPolicy } from "../policies/policy.service.js";
import { emitUpdate } from "../../utils/socketEmit.js";

async function getTtlMs() {
  const policy = await getPolicy();
  return (policy.ttlSeconds || 30) * 1000;
}

export async function acquireLock(resource, owner) {
  metrics.acquireRequests++;

  const ttlMs = await getTtlMs();
  const now = new Date();
  const expiresAt = new Date(Date.now() + ttlMs);

  const existing = await Lock.findOne({ resource });

  if (!existing) {
    const created = await Lock.create({
      resource,
      owner,
      expiresAt,
    });

    emitUpdate("locks:update");
    emitUpdate("metrics:update");

    return { success: true, lock: created };
  }

  if (existing.owner === owner) {
    existing.expiresAt = expiresAt;
    await existing.save();

    emitUpdate("locks:update");
    emitUpdate("metrics:update");

    return { success: true, lock: existing };
  }

  if (existing.expiresAt <= now) {
    metrics.expiredReclaims++;

    existing.owner = owner;
    existing.waiting = [];
    existing.expiresAt = expiresAt;

    await existing.save();

    emitUpdate("locks:update");
    emitUpdate("metrics:update");

    return {
      success: true,
      lock: existing,
      expiredReassigned: true,
    };
  }

  if (!existing.waiting.includes(owner)) {
    existing.waiting.push(owner);
    await existing.save();
  }

  metrics.conflicts++;

  emitUpdate("metrics:update");
  emitUpdate("locks:update");

  return {
    success: false,
    status: 409,
    message: "Lock already held",
    heldBy: existing.owner,
    waiting: existing.waiting,
  };
}

export async function acquireWithRetry(resource, owner) {
  const policy = await getPolicy();
  const retryCount = policy.retryCount || 3;

  for (let i = 0; i < retryCount; i++) {
    const result = await acquireLock(resource, owner);

    if (result.success) return result;

    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  return {
    success: false,
    status: 409,
    message: "Retry limit exceeded",
  };
}

export async function releaseLock(resource, owner) {
  const ttlMs = await getTtlMs();

  const lock = await Lock.findOne({ resource });

  if (!lock || lock.owner !== owner) return false;

  metrics.releases++;

  if (lock.waiting.length > 0) {
    lock.owner = lock.waiting.shift();
    lock.expiresAt = new Date(Date.now() + ttlMs);

    await lock.save();

    emitUpdate("locks:update");
    emitUpdate("metrics:update");

    return true;
  }

  await Lock.deleteOne({ resource, owner });

  emitUpdate("locks:update");
  emitUpdate("metrics:update");

  return true;
}

export async function renewLock(resource, owner) {
  const ttlMs = await getTtlMs();

  metrics.renewals++;

  const updated = await Lock.findOneAndUpdate(
    { resource, owner },
    { expiresAt: new Date(Date.now() + ttlMs) },
    { new: true }
  );

  emitUpdate("locks:update");
  emitUpdate("metrics:update");

  return updated;
}

export async function listLocks() {
  const now = new Date();

  // delete expired locks first
  await Lock.deleteMany({
    expiresAt: { $lte: now },
  });

  emitUpdate("locks:update");
  emitUpdate("metrics:update");

  return Lock.find().sort({ createdAt: -1 });
}