import React from "react";
import "./DotButton.css";

const DotButton = ({ label = "Button", onClick, type = "button" }) => {
  return (
    <button type={type} className="dot-button" onClick={onClick}>
      {label}
    </button>
  );
};

export default DotButton;
