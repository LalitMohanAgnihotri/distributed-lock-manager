const store = new Map();

export function rateLimit({ windowMs = 60000, limit = 120 } = {}){
  return (req,res,next) => {
    const key = req.ip;
    const now = Date.now();
    const entry = store.get(key) || { count:0, resetAt: now + windowMs };

    if(now > entry.resetAt){
      entry.count = 0;
      entry.resetAt = now + windowMs;
    }

    entry.count++;
    store.set(key, entry);

    if(entry.count > limit){
      return res.status(429).json({ success:false, message:'Too many requests' });
    }

    next();
  };
}