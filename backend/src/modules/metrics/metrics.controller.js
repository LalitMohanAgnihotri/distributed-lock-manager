import { metrics } from '../../config/metrics.js';
import Lock from '../locks/lock.model.js';

export async function getMetrics(req,res){
  const activeLocks = await Lock.countDocuments();
  res.json({ ...metrics, activeLocks, uptimeSec: Math.floor((Date.now()-metrics.startedAt)/1000) });
}