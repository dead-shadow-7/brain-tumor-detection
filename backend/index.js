import express from "express";
import multer from "multer";
import cors from "cors";
import { Client } from "@gradio/client";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Load environment variables
dotenv.config();

// Constants
const CONFIG = {
  PORT: process.env.PORT || 5000,
  HF_SPACE: process.env.HF_SPACE,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB limit
  ALLOWED_MIME_TYPES: ["image/jpeg", "image/png"],
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  GEMINI_MODEL: "gemini-1.5-flash-002",
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
      cb(new Error("Invalid file type. Only JPEG and PNG are allowed."));
    }
  },
});

// Initialize Gradio client outside request handler
let gradioClient = null;

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(CONFIG.GEMINI_API_KEY);
const geminiModel = genAI.getGenerativeModel({ model: CONFIG.GEMINI_MODEL });

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

// Function to extract tumor type from prediction string
const extractTumorType = (predictionString) => {
  // Example: "Prediction: meningioma_tumor (Confidence: 1.00)"
  const match = predictionString.match(/Prediction: (\w+)_tumor/);
  return match ? match[1] : "unknown";
};

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    error: err.message || "Internal server error",
    status: "error",
  });
};

// Route to process MRI images and get Gemini response
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

    // Process image with Gradio
    const imageBlob = new Blob([req.file.buffer], { type: req.file.mimetype });
    const result = await gradioClient.predict("/predict", { image: imageBlob });

    // Extract the prediction string
    const predictionString = result.data[0];
    console.log("Prediction result:", predictionString);

    // Extract tumor type for the Gemini prompt
    const tumorType = extractTumorType(predictionString);

    // Generate content using Gemini API
    const prompt = `Provide comprehensive information about ${tumorType} brain tumors, including:
1. Common symptoms and how they present
2. Typical treatment approaches and their effectiveness
3. Long-term prognosis and survival rates
4. Risk factors and what medical professionals look for in diagnosis
5. Recent advances in treatment options

Please structure this as detailed medical information that could help a healthcare provider explain the condition to a patient and structure it in plain text format.`;

    try {
      const geminiResponse = await geminiModel.generateContent(prompt);
      const responseText = geminiResponse.response.text();

      // Format and send response with both prediction and Gemini response
      res.json({
        status: "success",
        data: {
          prediction: predictionString,
          tumorType: tumorType,
          medicalInfo: responseText,
          timestamp: new Date().toISOString(),
        },
      });
    } catch (geminiError) {
      console.error("Gemini API error:", geminiError);
      // Still return the prediction even if Gemini fails
      res.json({
        status: "partial_success",
        data: {
          prediction: predictionString,
          tumorType: tumorType,
          medicalInfo: "Failed to generate additional medical information.",
          timestamp: new Date().toISOString(),
        },
        error: geminiError.message,
      });
    }
  } catch (error) {
    next(error);
  }
});

app.get("/", (req, res) => {
  res.send("OK");
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
