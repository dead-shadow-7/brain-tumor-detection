import React, { useState } from "react";
import "../styles/home.css";
import GetStartedBtn from "../components/GetStartedBtn";
import brainimage from "../assets/brain.png";
const Home = () => {
  return (
    <div className="home">
      <h1>MRI Brain Tumor Detection</h1>
      <div className="title">
        Transform Tumor Detection With <br />
        AI
      </div>
      <img src={brainimage} alt="Brain Image" />
      <div className="description">
        Revolutionize healthcare with AI -driven brain tumor detection. Fast,
        accurate, and life-saving—get started today!
      </div>
      <GetStartedBtn />
    </div>
  );
};

export default Home;
