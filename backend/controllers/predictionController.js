import { processImage, generateTumorInfo } from "../services/tumorService.js";
import { extractTumorType } from "../utils/tumorUtils.js";
import Prediction from "../models/prediction.js"; // Import the new model

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

    try {
      // Generate content using Gemini API
      const medicalInfo = await generateTumorInfo(tumorType);

      // Create response data object
      const predictionData = {
        prediction: predictionString,
        tumorType: tumorType,
        medicalInfo: medicalInfo,
        timestamp: new Date().toISOString(),
      };

      // Create new prediction record
      const newPrediction = new Prediction({
        prediction: predictionString,
        tumorType: tumorType,
        medicalInfo: medicalInfo,
        // Optional: Add userId if available
        // userId: req.user?._id,
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
        _id: savedPrediction._id, // Include the database ID in the response
      });
    } catch (geminiError) {
      // Still return the prediction even if Gemini fails
      const predictionData = {
        prediction: predictionString,
        tumorType: tumorType,
        medicalInfo: "Failed to generate additional medical information.",
        timestamp: new Date().toISOString(),
      };

      // Save basic prediction to database even if Gemini fails
      const newPrediction = new Prediction({
        prediction: predictionString,
        tumorType: tumorType,
        medicalInfo: "Failed to generate additional medical information.",
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

// New function to get prediction history
export const getPredictionHistory = async (req, res, next) => {
  try {
    // Optional: Add filtering by userId if you have user authentication
    // const userId = req.user._id;
    // const predictions = await Prediction.find({ userId });

    const predictions = await Prediction.find()
      .sort({ timestamp: -1 }) // Sort by newest first
      .limit(20); // Limit to recent predictions

    res.json({
      status: "success",
      data: predictions,
    });
  } catch (error) {
    next(error);
  }
};
