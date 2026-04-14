import {
  acquireWithRetry,
  releaseLock,
  renewLock,
  listLocks,
} from "./lock.service.js";

export async function acquire(req, res, next) {
  try {
    const result = await acquireWithRetry(req.body.resource, req.body.owner);
    if (!result.success) return res.status(result.status).json(result);
    res.json(result);
  } catch (e) {
    next(e);
  }
}

export async function release(req, res, next) {
  try {
    res.json({ success: await releaseLock(req.body.resource, req.body.owner) });
  } catch (e) {
    next(e);
  }
}

export async function renew(req, res, next) {
  try {
    const lock = await renewLock(req.body.resource, req.body.owner);
    res.json({ success: !!lock, lock });
  } catch (e) {
    next(e);
  }
}

export async function getAll(req, res, next) {
  try {
    res.json({ success: true, locks: await listLocks() });
  } catch (e) {
    next(e);
  }
}
