import "./ScrollDownButton.css";

const ScrollDownButton = ({ onClick }) => {
  return (
    <div className="scroll-down-container" onClick={onClick}>
      <div className="scroll-down-chevrons">
        <div className="scroll-down-chevron"></div>
        <div className="scroll-down-chevron"></div>
      </div>
    </div>
  );
};

export default ScrollDownButton;