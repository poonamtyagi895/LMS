import "./ProgressPercentBar.css";

const ProgressPercentBar = () => {
  return (
    <div class="progress-percent-container">
        <div class="progress-percent-bar"></div>
        <div class="progress-percent-text">40%</div>
        <div class="progress-percent-particles">
            <div class="progress-percent-particle"></div>
            <div class="progress-percent-particle"></div>
            <div class="progress-percent-particle"></div>
            <div class="progress-percent-particle"></div>
            <div class="progress-percent-particle"></div>
        </div>
    </div>
  );
};

export default ProgressPercentBar;
