import React from "react";
import "./Btn1.css";

const Btn1 = ({ label = "Button", onClick, type = "button" }) => {
  return (
    <button type={type} className="btn1" onClick={onClick}>
      {label}
    </button>
  );
};

export default Btn1;
