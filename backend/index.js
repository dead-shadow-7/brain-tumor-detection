import express from "express";
import multer from "multer";
import cors from "cors";
import { Client } from "@gradio/client";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Constants
const CONFIG = {
  PORT: process.env.PORT || 5000,
  HF_SPACE: process.env.HF_SPACE,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB limit
  ALLOWED_MIME_TYPES: ["image/jpeg", "image/png"],
};

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: CONFIG.MAX_FILE_SIZE,
  },
  fileFilter: (req, file, cb) => {
    if (CONFIG.ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPEG, PNG and GIF are allowed."));
    }
  },
});

// Initialize Gradio client outside request handler
let gradioClient = null;

// Initialize Gradio client connection
const initializeGradioClient = async () => {
  try {
    gradioClient = await Client.connect(CONFIG.HF_SPACE);
    console.log("Successfully connected to Gradio client");
  } catch (error) {
    console.error("Failed to initialize Gradio client:", error);
    throw error;
  }
};

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    error: err.message || "Internal server error",
    status: "error",
  });
};

// Route to process MRI images
app.post("/predict", upload.single("image"), async (req, res, next) => {
  try {
    // Validate request
    if (!req.file) {
      return res.status(400).json({
        error: "No image uploaded.",
        status: "error",
      });
    }

    // Ensure Gradio client is initialized
    if (!gradioClient) {
      await initializeGradioClient();
    }

    // Process image
    const imageBlob = new Blob([req.file.buffer], { type: req.file.mimetype });
    const result = await gradioClient.predict("/predict", { image: imageBlob });
    console.log("Prediction result:", result);
    // Format and send response
    res.json({
      status: "success",
      data: {
        prediction: result.data[0],
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    next(error);
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

// Apply error handling middleware
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    await initializeGradioClient();
    app.listen(CONFIG.PORT, () => {
      console.log(`Server running at http://localhost:${CONFIG.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
