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
  // Optional: link to user if you want to associate predictions with users
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  // Optional: store the original image reference or path
  imagePath: {
    type: String,
    required: false,
  },
});

const Prediction = mongoose.model("Prediction", predictionSchema);
export default Prediction;
