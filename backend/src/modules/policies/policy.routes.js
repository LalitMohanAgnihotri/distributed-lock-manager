import { Router } from 'express';
import { getPolicy, updatePolicy } from './policy.service.js';

const router = Router();
router.get('/', async (req,res,next)=>{
  try { res.json({ success:true, policy: await getPolicy() }); }
  catch(e){ next(e); }
});
router.put('/', async (req,res,next)=>{
  try { res.json({ success:true, policy: await updatePolicy(req.body) }); }
  catch(e){ next(e); }
});

export default router;