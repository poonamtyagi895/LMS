import { useEffect, useState } from "react";
import "./ProgressBarLoader.css";

const ProgressBarLoader = ({ duration = 400 }) => {
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
    <div className="progress-bar-loader-container">
      <div
        className="progress-bar-loader-fill"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBarLoader;
