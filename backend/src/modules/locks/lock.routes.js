import { Router } from 'express';
import { acquire, release, renew, getAll } from './lock.controller.js';
import { requireFields } from '../../middleware/validate.middleware.js';

const router = Router();
router.get('/', getAll);
router.post('/acquire', requireFields(['resource','owner']), acquire);
router.post('/release', requireFields(['resource','owner']), release);
router.post('/renew', requireFields(['resource','owner']), renew);

export default router;