import { scanDeadlocks } from '../modules/deadlocks/deadlock.service.js';
import { metrics } from '../config/metrics.js';

export function startDeadlockJob(){
  setInterval(async ()=>{
    metrics.deadlockScans++;
    const result = await scanDeadlocks();
    if(result.deadlock){
      console.log('⚠️ Deadlock detected');
    }
  }, 10000);
}