import React, { useState } from "react";
import ImageUpload from "../components/ImageUpload";
import PredictionResult from "../components/PredictionResult";

const PredictionPage = () => {
  const [prediction, setPrediction] = useState(null);

  return (
    <div className="prediction">
      <h1>MRI Brain Tumor Detection</h1>
      <ImageUpload setPrediction={setPrediction} />
      {prediction && <PredictionResult prediction={prediction} />}
    </div>
  );
};

export default PredictionPage;
