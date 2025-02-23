import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";
import ReactGA from "react-ga4";

// Initialize GA4 with your measurement ID
ReactGA.initialize("G-EPF21ZKEHC");

// Optional: Enable debug mode during development
if (process.env.NODE_ENV === "development") {
  ReactGA.set({
    debug: true,
  });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
