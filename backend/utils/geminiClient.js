import { GoogleGenerativeAI } from "@google/generative-ai";
import { CONFIG } from "../config/config.js";

const genAI = new GoogleGenerativeAI(CONFIG.GEMINI_API_KEY);
export const geminiModel = genAI.getGenerativeModel({
  model: CONFIG.GEMINI_MODEL,
});
