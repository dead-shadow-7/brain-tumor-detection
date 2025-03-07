import React, { useState, useEffect } from "react";
import "../styles/NavBar.css";
import SignInOutButton from "./SignInOut";

const NavBar = () => {
  const [activeLink, setActiveLink] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Set active link based on current path
    const path = window.location.pathname;
    setActiveLink(path);

    // Prevent body scroll when menu is open
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/technology", label: "Technology" },
    { path: "/contact", label: "Contact" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = (path) => {
    setActiveLink(path);
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="/" className="logo">
          BRAIN TUMOR DETECTION
        </a>
      </div>

      {/* Add role="button" and improve the click target */}
      <div
        className={`menu-toggle ${isMenuOpen ? "active" : ""}`}
        onClick={toggleMenu}
        role="button"
        tabIndex={0}
        aria-label="Toggle navigation menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`navbar-right ${isMenuOpen ? "active" : ""}`}>
        <ul className="nav-links">
          {navLinks.map(({ path, label }) => (
            <li key={path}>
              <a
                href={path}
                className={activeLink === path ? "active" : ""}
                onClick={() => handleLinkClick(path)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <SignInOutButton />
      </div>
    </nav>
  );
};

export default NavBar;
