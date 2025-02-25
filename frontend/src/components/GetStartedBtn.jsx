import React from "react";
import { Link } from "react-router-dom";
import "../styles/GetStartedBtn.css";
const GetStartedBtn = () => {
  return (
    <div className="getstarted-btn">
      <Link to="/predict"> GET STARTED</Link>
    </div>
  );
};

export default GetStartedBtn;
