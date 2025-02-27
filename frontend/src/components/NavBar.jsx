// NavBar.jsx
import React, { useState, useEffect } from "react";
import "../styles/NavBar.css";

const NavBar = () => {
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    // Set active link based on current path
    const path = window.location.pathname;
    setActiveLink(path);
  }, []);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/technology", label: "Technology" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="/" className="logo">
          BRAIN TUMOR DETECTION
        </a>
      </div>
      <div className="navbar-right">
        <ul className="nav-links">
          {navLinks.map(({ path, label }) => (
            <li key={path}>
              <a
                href={path}
                className={activeLink === path ? "active" : ""}
                onClick={() => setActiveLink(path)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
