import React from "react";
import Home from "./pages/Home";
import ReactGA from "react-ga4";
const measurementId = "G-EPF21ZKEHC";
ReactGA.initialize(measurementId);
ReactGA.send("pageview");

const App = () => {
  return (
    <div className="app">
      <h1>MRI Brain Tumor Detection</h1>
      <Home />
    </div>
  );
};

export default App;
