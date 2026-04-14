import dotenv from 'dotenv';
dotenv.config();

function required(name, fallback=''){
  const value = process.env[name] || fallback;
  if(value === '') throw new Error(`Missing env: ${name}`);
  return value;
}

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 5000),
  mongoUri: required('MONGO_URI', 'mongodb://127.0.0.1:27017/lockdb'),
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173'
};