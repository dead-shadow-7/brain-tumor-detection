import { processImage, generateTumorInfo } from "../services/tumorService.js";
import { extractTumorType } from "../utils/tumorUtils.js";
import Prediction from "../models/prediction.js";

export const predictTumor = async (req, res, next) => {
  try {
    // Validate request
    if (!req.file) {
      return res.status(400).json({
        error: "No image uploaded.",
        status: "error",
      });
    }

    // Get the user ID from the request
    const userId = req.body.userId;

    // Process image with Gradio
    const predictionString = await processImage(
      req.file.buffer,
      req.file.mimetype
    );
    console.log("Prediction result:", predictionString);

    // Extract tumor type for the Gemini prompt
    const tumorType = extractTumorType(predictionString);

    try {
      // Generate content using Gemini API
      const medicalInfo = await generateTumorInfo(tumorType);

      // Create response data object
      const predictionData = {
        prediction: predictionString,
        tumorType: tumorType,
        medicalInfo: medicalInfo,
        timestamp: new Date().toISOString(),
        userId: userId || null,
      };

      // Create new prediction record
      const newPrediction = new Prediction({
        prediction: predictionString,
        tumorType: tumorType,
        medicalInfo: medicalInfo,
        userId: userId || null,
        // Optional: Store image path if you're saving the image
        // imagePath: imagePath
      });

      // Save prediction to database
      const savedPrediction = await newPrediction.save();
      console.log("Prediction saved to database with ID:", savedPrediction._id);

      // Format and send response with both prediction and Gemini response
      res.json({
        status: "success",
        data: predictionData,
        _id: savedPrediction._id,
      });
    } catch (geminiError) {
      // Still return the prediction even if Gemini fails
      const predictionData = {
        prediction: predictionString,
        tumorType: tumorType,
        medicalInfo: "Failed to generate additional medical information.",
        timestamp: new Date().toISOString(),
        userId: userId || null,
      };

      // Save basic prediction to database even if Gemini fails
      const newPrediction = new Prediction({
        prediction: predictionString,
        tumorType: tumorType,
        medicalInfo: "Failed to generate additional medical information.",
        userId: userId || null,
      });

      const savedPrediction = await newPrediction.save();

      res.json({
        status: "partial_success",
        data: predictionData,
        _id: savedPrediction._id,
        error: geminiError.message,
      });
    }
  } catch (error) {
    next(error);
  }
};

// Update getPredictionHistory to filter by userId if provided
export const getPredictionHistory = async (req, res, next) => {
  try {
    // Get userId from query params or request body
    const userId = req.query.userId || req.body.userId;

    let query = {};
    if (userId) {
      query.userId = userId;
    }

    const predictions = await Prediction.find(query)
      .sort({ timestamp: -1 })
      .limit(20);

    res.json({
      status: "success",
      data: predictions,
    });
  } catch (error) {
    next(error);
  }
};
