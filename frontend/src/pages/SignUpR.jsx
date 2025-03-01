import { SignUp } from "@clerk/clerk-react";
import React from "react";
import "../styles/SignUp.css";

const SignUpR = () => {
  return (
    <div className="signup-container">
      <SignUp />
    </div>
  );
};
export default SignUpR;
