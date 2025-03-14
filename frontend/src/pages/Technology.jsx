import React from "react";
import "../styles/Technology.css";

const Technology = () => {
  return (
    <div className="technology-container">
      <div className="technology-header">
        <h1>Tech Stack:</h1>
      </div>
      <div className="technology-content">
        <div className="tech-section">
          <h2>Frontend</h2>
          <ul className="tech-list">
            <li>React.js</li>
            <li>Vite</li>
            <li>HTML5</li>
            <li>CSS3</li>
            <li>JavaScript (ES6+)</li>
            <li>Framer Motion (for animations)</li>
          </ul>
        </div>
        <div className="tech-section">
          <h2>Backend</h2>
          <ul className="tech-list">
            <li>NodeJS</li>
            <li>ExpressJS</li>
            <li>TensorFlow/PyTorch (for AI models)</li>
          </ul>
        </div>
        <div className="tech-section">
          <h2>Database</h2>
          <ul className="tech-list">
            <li>MongoDB</li>
          </ul>
        </div>
        <div className="tech-section">
          <h2>Deployment</h2>
          <ul className="tech-list">
            <li>Hugging Face (Models)</li>
            <li>Vercel (Front End)</li>
            <li>Render.com (Back End)</li>
          </ul>
        </div>
        {/* <div className="description">
          <p>
            This technology stack was chosen to ensure a robust, scalable, and
            efficient application. React.js provides a dynamic and responsive
            user interface, while Python with TensorFlow/PyTorch enables
            powerful AI capabilities. Containerization with Docker and cloud
            deployment ensures the application can be easily scaled and
            deployed.
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Technology;
