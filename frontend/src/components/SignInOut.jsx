import React from "react";
import { SignOutButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const LogOutStyle = {
  padding: "6px 12px",
  margin: "0px 24px",
};

const SignInStyle = {
  padding: "4px 12px",
  margin: "0px 24px",
  backgroundColor: "#1cacac",
  borderRadius: "5px",
};

const SignInOut = () => {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return (
      <div className="login-btn" style={SignInStyle}>
        <Link
          to="/login"
          style={{
            textDecoration: "none",
            color: "inherit",
            fontWeight: "500",
          }}
        >
          Login
        </Link>
      </div>
    );
  }

  return <SignOutButton style={LogOutStyle} />;
};

export default SignInOut;
