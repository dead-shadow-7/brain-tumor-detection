import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PredictionPage from "./pages/PredictionPage";
import Navbar from "./components/NavBar";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/predict" element={<PredictionPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
