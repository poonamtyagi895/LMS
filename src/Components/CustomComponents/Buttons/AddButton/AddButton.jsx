import React from "react";
import "./AddButton.css";

const AddButton = ({ onClick }) => {
  return (
    <button className="add-button" onClick={onClick}>
      + Add New
    </button>
  );
};

export default AddButton;
