import mongoose from 'mongoose';

const lockSchema = new mongoose.Schema({
  resource: { type: String, required: true, unique: true },
  owner: { type: String, required: true },
  waiting: { type: [String], default: [] },
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Lock', lockSchema);