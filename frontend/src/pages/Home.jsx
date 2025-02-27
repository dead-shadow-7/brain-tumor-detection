import React, { useState } from "react";
import "../styles/Home.css";
import GetStartedBtn from "../components/GetStartedBtn";
import brainimage from "../assets/brain.png";
import HorizontalLine from "../components/HorizontalLine";

const Home = () => {
  return (
    <div className="home">
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
      <HorizontalLine color="white" />
    </div>
  );
};

export default Home;
