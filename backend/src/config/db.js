import mongoose from "mongoose";
import { env } from "./env.js";

async function connectDB() {
  try {
    await mongoose.connect(env.mongoUri);
    console.log("Mongo connected");
  } catch (error) {
    console.error("Mongo connection failed:", error.message);
    process.exit(1);
  }
}

export default connectDB;