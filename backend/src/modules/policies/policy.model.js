import mongoose from 'mongoose';

const policySchema = new mongoose.Schema({
  ttlSeconds: { type: Number, default: 30 },
  retryCount: { type: Number, default: 3 },
  deadlockStrategy: { type: String, default: 'manual' }
}, { timestamps: true });

export default mongoose.model('Policy', policySchema);