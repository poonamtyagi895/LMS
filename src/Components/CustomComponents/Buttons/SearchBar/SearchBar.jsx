import React from "react";
import "./SearchBar.css";

const SearchBar = ({ value, onChange }) => {
  return (
    <input
      type="text"
      className="search-bar"
      placeholder="Search here..."
      value={value}
      onChange={onChange}
    />
  );
};

export default SearchBar;
