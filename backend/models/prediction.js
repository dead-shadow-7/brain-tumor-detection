// models/prediction.js
import mongoose from "mongoose";

const predictionSchema = new mongoose.Schema({
  prediction: {
    type: String,
    required: true,
  },
  tumorType: {
    type: String,
    required: true,
  },
  medicalInfo: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  // Updated: Change to String type to match Clerk's user IDs
  userId: {
    type: String,
    required: false,
  },
  imagePath: {
    type: String,
    required: false,
  },
});

const Prediction = mongoose.model("Prediction", predictionSchema);
export default Prediction;
