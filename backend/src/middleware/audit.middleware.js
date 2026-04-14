import { writeLog } from '../modules/logs/log.service.js';

export function audit(){
  return (req,res,next) => {
    const start = Date.now();

    res.on('finish', async () => {
      try {
        await writeLog(`${req.method} ${req.originalUrl}`, 'info', {
          requestId: req.requestId,
          status: res.statusCode,
          durationMs: Date.now() - start
        });
      } catch {}
    });

    next();
  };
}