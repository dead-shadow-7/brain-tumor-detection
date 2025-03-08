import { processImage, generateTumorInfo } from "../services/tumorService.js";
import { extractTumorType } from "../utils/tumorUtils.js";

export const predictTumor = async (req, res, next) => {
  try {
    // Validate request
    if (!req.file) {
      return res.status(400).json({
        error: "No image uploaded.",
        status: "error",
      });
    }

    // Process image with Gradio
    const predictionString = await processImage(
      req.file.buffer,
      req.file.mimetype
    );
    console.log("Prediction result:", predictionString);

    // Extract tumor type for the Gemini prompt
    const tumorType = extractTumorType(predictionString);

    // Generate content using Gemini API
    try {
      const medicalInfo = await generateTumorInfo(tumorType);

      // Format and send response with both prediction and Gemini response
      res.json({
        status: "success",
        data: {
          prediction: predictionString,
          tumorType: tumorType,
          medicalInfo: medicalInfo,
          timestamp: new Date().toISOString(),
        },
      });
    } catch (geminiError) {
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
};

export const healthCheck = (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
};
