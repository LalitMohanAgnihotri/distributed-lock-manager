import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { env } from './config/env.js';
import { errorHandler } from './middleware/error.middleware.js';
import { requestId } from './middleware/requestId.middleware.js';
import { audit } from './middleware/audit.middleware.js';
import { rateLimit } from './middleware/rateLimit.middleware.js';

import lockRoutes from './modules/locks/lock.routes.js';
import deadlockRoutes from './modules/deadlocks/deadlock.routes.js';
import metricsRoutes from './modules/metrics/metrics.routes.js';
import logRoutes from './modules/logs/log.routes.js';
import policyRoutes from './modules/policies/policy.routes.js';

const app = express();
app.use(helmet());
app.use(cors({ origin: env.frontendUrl, credentials:true }));
app.use(express.json({ limit:'1mb' }));
app.use(morgan(env.nodeEnv === 'production' ? 'combined':'dev'));
app.use(requestId);
app.use(rateLimit());
app.use(audit());

app.get('/api/health', (req,res)=>res.json({ status:'ok' }));
app.use('/api/locks', lockRoutes);
app.use('/api/deadlocks', deadlockRoutes);
app.use('/api/metrics', metricsRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/policies', policyRoutes);

app.use(errorHandler);
export default app;