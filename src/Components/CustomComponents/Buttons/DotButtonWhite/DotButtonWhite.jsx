import React from "react";
import "./DotButtonWhite.css";

const DotButtonWhite = ({ label = "Button", onClick, type = "button" }) => {
  return (
    <button type={type} className="dot-button-white" onClick={onClick}>
      {label}
    </button>
  );
};

export default DotButtonWhite;
