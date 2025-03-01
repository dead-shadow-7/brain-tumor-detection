import { SignIn } from "@clerk/clerk-react";
import React from "react";
import "../styles/Login.css";

const Login = () => {
  return (
    <div className="login-container">
      <SignIn />
    </div>
  );
};
export default Login;
