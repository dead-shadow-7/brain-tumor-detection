import React from "react";
import "../styles/Home.css";
import GetStartedBtn from "../components/GetStartedBtn";
import brainimage from "../assets/brain.png";
import TrueFocus from "../components/TrueFocus";

const Home = () => {
  return (
    <div className="home">
      <div className="title">
        <TrueFocus
          sentence="Transform Tumor"
          manualMode={false}
          blurAmount={4}
          borderColor="white"
          animationDuration={1}
          pauseBetweenAnimations={1}
        />
        <br />
        <span style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: "900" }}>
          Detection With AI
        </span>
      </div>
      <img src={brainimage} alt="Brain Image" />
      <div className="description">
        Revolutionize healthcare with AI-driven brain tumor detection.
        <br />
        Fast, accurate and life-saving—get started today!
      </div>
      <GetStartedBtn />
    </div>
  );
};

export default Home;
