import "./TooltipButton.css";

const TooltipButton = ({
  label = "Label",
  tooltipText = "Tooltip Text",
  onClick,
}) => {
  return (
    <div className="tooltip-button-wrapper">
      <button
        className="tooltip-button-trigger"
        onClick={onClick}
      >
        {label}
      </button>

      <div className="tooltip-button-tooltip">
        {tooltipText}
      </div>
    </div>
  );
};

export default TooltipButton;
