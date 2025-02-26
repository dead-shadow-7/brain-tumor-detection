import React from "react";
import "../styles/About.css";
const About = () => {
  return (
    <div className="about">
      <h1>About Brain Tumor Detection</h1>
      <div className="description">
        MRI Brain Tumor Detection is a web application that uses AI to detect
        brain tumors in MRI scans. The application uses a deep learning model
        that has been trained on a dataset of brain MRI images. The model is
        able to accurately detect the presence of a tumor in an MRI scan and
        provide information about the type of tumor detected. This application
        aims to assist healthcare professionals in the diagnosis of brain tumors
        and provide a fast and accurate tool for tumor detection.
      </div>
    </div>
  );
};
export default About;
