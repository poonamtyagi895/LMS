import "./ProgressPercentBar.css";

const ProgressPercentBar = () => {
  return (
    <div className="progress-percent-container">
        <div className="progress-percent-bar"></div>
        <div className="progress-percent-text">40%</div>
        <div className="progress-percent-particles">
            <div className="progress-percent-particle"></div>
            <div className="progress-percent-particle"></div>
            <div className="progress-percent-particle"></div>
            <div className="progress-percent-particle"></div>
            <div className="progress-percent-particle"></div>
        </div>
    </div>
  );
};

export default ProgressPercentBar;
