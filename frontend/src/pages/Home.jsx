import React, { useState } from "react";
import ImageUpload from "../components/ImageUpload";
import PredictionResult from "../components/PredictionResult";

const Home = () => {
  const [prediction, setPrediction] = useState(null);

  return (
    <div className="home">
      <ImageUpload setPrediction={setPrediction} />
      {prediction && <PredictionResult prediction={prediction} />}
    </div>
  );
};

export default Home;
