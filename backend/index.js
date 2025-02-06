import express from "express";
import multer from "multer";
import cors from "cors";
import axios from "axios";
import { Client } from "@gradio/client";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const HF_SPACE = process.env.HF_SPACE; // Your Hugging Face Space

// Enable CORS for frontend requests
app.use(cors());
app.use(express.json());

// Multer setup for handling image uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to send MRI images to Hugging Face API
app.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded." });
    }

    // Convert buffer to Blob format
    const imageBuffer = req.file.buffer;
    const blob = new Blob([imageBuffer], { type: req.file.mimetype });

    // Connect to Gradio API
    const client = await Client.connect(HF_SPACE);
    const result = await client.predict("/predict", { image: blob });

    res.json({ segmentation_result: result.data });
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).json({ error: "Failed to process the image." });
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
