import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PredictionPage from "./pages/PredictionPage";
import Navbar from "./components/NavBar";
const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/predict" element={<PredictionPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
