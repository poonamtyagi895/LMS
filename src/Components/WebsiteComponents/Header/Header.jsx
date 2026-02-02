import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header-wrapper">
      <nav className="header-navbar">
        <div className="header-logo">Simple CSS</div>

        <div className="header-center">
          <Link to="/" className="header-link">
            Explore
          </Link>

          <input
            type="text"
            className="header-search"
            placeholder="Search courses, topics..."
          />
        </div>

        <div className="header-actions">
          <Link to="/login" className="header-btn header-btn-login">
            Login
          </Link>
          <button className="header-btn header-btn-trial">
            Start Free Trial
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
