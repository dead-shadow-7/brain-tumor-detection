import React, { useState } from "react";
import ImageUpload from "../components/ImageUpload";
import "../styles/PredictionPage.css"; // Import the CSS file

const PredictionPage = () => {
  const [prediction, setPrediction] = useState(null);
  const [medicalInfo, setMedicalInfo] = useState(null);

  return (
    <div className="prediction-page">
      <ImageUpload
        setPrediction={setPrediction}
        setMedicalInfo={setMedicalInfo}
      />
      {prediction && (
        <div className="result">
          <h2>Prediction Result</h2>
          <p>{prediction}</p>
        </div>
      )}
      {medicalInfo && (
        <div className="medical-info">
          <h2>Medical Information</h2>
          <div dangerouslySetInnerHTML={{ __html: medicalInfo }} />
        </div>
      )}
    </div>
  );
};

export default PredictionPage;
