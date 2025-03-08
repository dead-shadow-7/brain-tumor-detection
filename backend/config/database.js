import mongoose from "mongoose";
import { CONFIG } from "./config.js";

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(CONFIG.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};
