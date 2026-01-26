import { useEffect, useState } from "react";
import "./ProgressBar.css";

const ProgressBar = ({ duration = 400 }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start = 0;
    const intervalTime = 20;
    const increment = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      start += increment;
      if (start >= 100) {
        start = 100;
        clearInterval(timer);
      }
      setProgress(start);
    }, intervalTime);

    return () => clearInterval(timer);
  }, [duration]);

  return (
    <div className="progress-bar-container">
      <div
        className="progress-bar-fill"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
