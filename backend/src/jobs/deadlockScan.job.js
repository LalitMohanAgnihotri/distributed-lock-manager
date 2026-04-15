import { scanDeadlocks } from '../modules/deadlocks/deadlock.service.js';
import { metrics } from '../config/metrics.js';
import { emitUpdate } from '../utils/socketEmit.js';

export function startDeadlockJob() {
  setInterval(async () => {
    try {
      metrics.deadlockScans++;

      const result = await scanDeadlocks();

      if (result.deadlock) {
        metrics.resolvedDeadlocks++;
        console.log("Deadlock detected and resolved");
      }

      emitUpdate("metrics:update");
      emitUpdate("locks:update");

    } catch (err) {
      console.error("Deadlock scan failed:", err.message);
    }
  }, 10000);
}