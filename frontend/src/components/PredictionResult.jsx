import React from "react";

const PredictionResult = ({ prediction }) => {
  return (
    <div className="prediction-result">
      <h2>Prediction Result</h2>
      <p>{prediction}</p>
    </div>
  );
};

export default PredictionResult;
