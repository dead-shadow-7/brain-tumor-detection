import React, { useRef, useEffect } from "react";
import "../styles/About.css";
import brainImage from "../assets/brain_scan.avif";
import brainScanImage from "../assets/OIP.jpeg";
import BlurText from "../components/BlurText";
import { motion, useInView, useAnimation } from "framer-motion";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const animation = useAnimation();

  const howItWorksRef = useRef(null);
  const howItWorksInView = useInView(howItWorksRef, { once: true });

  useEffect(() => {
    if (isInView) {
      animation.start({
        x: 0,
        opacity: 1,
        transition: { duration: 1 },
      });
    }
    if (!isInView) {
      animation.start({
        x: -100,
        opacity: 0,
      });
    }
  }, [isInView, animation]);

  return (
    <motion.div className="about">
      <div className="about-header">
        <BlurText
          text="About Brain Tumor Detection"
          delay={100}
          animateBy="words"
          direction="top"
          className="about-title"
        />
      </div>

      <div className="about-content">
        <motion.div
          ref={ref}
          animate={animation}
          className="about-section"
        >
          <img src={brainImage} alt="Brain" className="about-image" />
          <div className="about-text">
            <h2>Our Mission</h2>
            <p>
              Our mission is to revolutionize brain tumor detection through
              advanced AI technology. We aim to provide healthcare professionals
              with a reliable and efficient tool for early and accurate
              diagnosis.
            </p>
            <p>
              By leveraging deep learning models, we strive to enhance patient
              outcomes and contribute to the advancement of medical diagnostics.
            </p>
          </div>
        </motion.div>

        {/* Increased Gap Here */}
        <div style={{ height: "70px" }}></div>

        <motion.div
          ref={howItWorksRef}
          animate={howItWorksInView
            ? { x: 0, opacity: 1, transition: { duration: 1 } }
            : { x: 100, opacity: 0 }}
          className="about-section reverse"
        >
          <img src={brainScanImage} alt="Brain Scan" className="about-image" />
          <div className="about-text">
            <h2>How It Works</h2>
            <p>
              Our web application utilizes a sophisticated deep learning model
              trained on extensive MRI datasets.
            </p>
            <p>
              Users can upload MRI scans, and our AI analyzes the images to
              detect potential tumors, providing detailed reports and
              visualizations.
            </p>
          </div>
        </motion.div>

        <div style={{ height: "70px" }}></div>

        <div className="about-section">
          <div className="about-text">
            <h2>Why Choose Us?</h2>
            <p>
              We prioritize accuracy and speed, ensuring healthcare providers
              receive timely and reliable results.
            </p>
            <p>
              Our user-friendly interface and comprehensive reporting make
              diagnostics more accessible and efficient.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;