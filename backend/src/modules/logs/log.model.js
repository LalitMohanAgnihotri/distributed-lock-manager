import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  level: { type: String, default: 'info' },
  message: { type: String, required: true },
  meta: { type: Object, default: {} }
}, { timestamps: true });

export default mongoose.model('Log', logSchema);