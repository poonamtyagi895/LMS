import "./ChangeTextButton.css";

const ChangeTextButton = ({ isActive, beforeText, afterText, onClick }) => {
  return (
    <button
      className={`change-text-button ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      <span className="text before">{beforeText}</span>
      <span className="text after">{afterText}</span>
    </button>
  );
};

export default ChangeTextButton;
