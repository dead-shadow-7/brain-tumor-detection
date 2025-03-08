import { Client } from "@gradio/client";
import { CONFIG } from "../config/config.js";

let gradioClient = null;

export const initializeGradioClient = async () => {
  try {
    gradioClient = await Client.connect(CONFIG.HF_SPACE);
    console.log("Successfully connected to Gradio client");
    return gradioClient;
  } catch (error) {
    console.error("Failed to initialize Gradio client:", error);
    throw error;
  }
};

export const getGradioClient = async () => {
  if (!gradioClient) {
    return await initializeGradioClient();
  }
  return gradioClient;
};
