import Lock from '../modules/locks/lock.model.js';

export function startExpireLocksJob(){
  setInterval(async ()=>{
    const now = new Date();
    const expired = await Lock.find({ expiresAt: { $lte: now } });

    for (const lock of expired) {
      if (lock.waiting.length > 0) {
        lock.owner = lock.waiting.shift();
        lock.expiresAt = new Date(Date.now() + 30000);
        await lock.save();
      } else {
        await Lock.deleteOne({ _id: lock._id });
      }
    }
  }, 5000);
}