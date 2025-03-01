import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Technology from "./pages/Technology";
import Contact from "./pages/Contact";
import PredictionPage from "./pages/PredictionPage";
import Navbar from "./components/NavBar";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import SignUpR from "./pages/SignUpR";

const App = () => {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/predict" element={<PredictionPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUpR />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
