import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="wave-header">
      <nav className="navbar">
        <div className="logo">Simple CSS</div>

        <div className="nav-center">
          <a href="/" className="nav-link">
            Explore
          </a>

          <input
            type="text"
            className="search-input"
            placeholder="Search courses, topics..."
          />
        </div>

        <div className="nav-actions">
          <button className="btn-login">Login</button>
          <button className="btn-trial">Start Free Trial</button>
        </div>
      </nav>

      
    </header>
  );
};

export default Header;
