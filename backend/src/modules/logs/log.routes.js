import { Router } from 'express';
import { getLogs } from './log.service.js';

const router = Router();
router.get('/', async (req,res,next)=>{
  try { res.json({ success:true, logs: await getLogs() }); }
  catch(e){ next(e); }
});

export default router;