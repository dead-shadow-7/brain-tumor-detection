export const extractTumorType = (predictionString) => {
  // Example: "Prediction: meningioma_tumor (Confidence: 1.00)"
  const match = predictionString.match(/Prediction: (\w+)_tumor/);
  return match ? match[1] : "unknown";
};
