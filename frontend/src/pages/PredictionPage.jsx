import React, { useState } from "react";
import ImageUpload from "../components/ImageUpload";
import PredictionResult from "../components/PredictionResult";

const PredictionPage = () => {
  const [prediction, setPrediction] = useState(null);

  return (
    <div className="prediction">
      <ImageUpload setPrediction={setPrediction} />
      {prediction && <PredictionResult prediction={prediction} />}
    </div>
  );
};

export default PredictionPage;
