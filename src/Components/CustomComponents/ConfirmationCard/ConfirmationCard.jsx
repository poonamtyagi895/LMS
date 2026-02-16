import { useEffect } from "react";
import DotButton from "../Buttons/DotButton/DotButton";
import "./ConfirmationCard.css";

const ConfirmationCard = ({ onConfirm, onCancel, message, title = "Are you sure?" }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        onConfirm();
      }

      if (e.key === "Escape") {
        onCancel();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onConfirm, onCancel]);

  return (
    <div className="confirmation-popup-overlay">
      <div className="confirmation-popup-card">
        <h3>{title}</h3>
        <p>{message}</p>

        <div className="confirmation-popup-actions">
          <DotButton label="OK" onClick={onConfirm} />
          <button
            className="confirmation-cancel-btn"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationCard;
