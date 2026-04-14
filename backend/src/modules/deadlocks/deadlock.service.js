import Lock from "../locks/lock.model.js";
import { detectCycle } from "./waitGraph.js";

export async function scanDeadlocks() {
  const locks = await Lock.find();
  const graph = {};

  for (const lock of locks) {
    for (const waiter of lock.waiting) {
      graph[waiter] = graph[waiter] || [];
      graph[waiter].push(lock.owner);
    }
  }

  return {
    deadlock: detectCycle(graph),
    graph,
  };
}

export async function resolveDeadlock(victimOwner) {
  const locks = await Lock.find();

  for (const lock of locks) {
    if (lock.owner === victimOwner) {
      if (lock.waiting.length > 0) {
        lock.owner = lock.waiting.shift();
        lock.waiting = lock.waiting.filter(
          (u) => u !== victimOwner
        );
        await lock.save();
      } else {
        await Lock.deleteOne({ _id: lock._id });
      }
    } else {
      lock.waiting = lock.waiting.filter(
        (u) => u !== victimOwner
      );
      await lock.save();
    }
  }

  return true;
}