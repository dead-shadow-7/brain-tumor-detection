import dotenv from "dotenv";
dotenv.config();

export const CONFIG = {
  PORT: process.env.PORT || 5000,
  HF_SPACE: process.env.HF_SPACE,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB limit
  ALLOWED_MIME_TYPES: ["image/jpeg", "image/png"],
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  GEMINI_MODEL: "gemini-2.0-flash",
};
