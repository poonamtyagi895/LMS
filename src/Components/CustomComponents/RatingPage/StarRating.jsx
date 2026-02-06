import { useState } from "react";
import "./StarRating.scss";

const StarRating = ({ value = 0, onChange, readOnly = false }) => {
  const [hovered, setHovered] = useState(null);

  const displayValue = hovered ?? value;

  return (
    <div className={`star-rating ${readOnly ? "read-only" : ""}`}>
      {[5, 4, 3, 2, 1].map((star) => (
        <label key={star}>
          <input
            type="radio"
            name="star-rating"
            value={star}
            checked={value === star}
            onChange={() => !readOnly && onChange(star)}
            disabled={readOnly}
          />
          <span
            className={`star ${
              displayValue >= star ? "filled" : ""
            }`}
            onMouseEnter={() => !readOnly && setHovered(star)}
            onMouseLeave={() => !readOnly && setHovered(null)}
          />
        </label>
      ))}
    </div>
  );
};

export default StarRating;
