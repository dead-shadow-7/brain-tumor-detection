import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";
import ReactGA from "react-ga4";

const measurementId = import.meta.env.VITE_MEASUREMENT_ID;

// Initialize Google Analytics
ReactGA.initialize(measurementId);

const Root = () => {
  useEffect(() => {
    ReactGA.send("pageview"); // Track the initial page load
  }, []);

  return <App />;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
