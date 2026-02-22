import { useEffect } from "react";
import "./RollingEyes.scss";

const RollingEyes = () => {

  useEffect(() => {

    const ratio = 1;
    const eyeballs = document.querySelectorAll('.rolling-eyes-eyeball');

    const handleEyesMove = (e) => {
      const card = document.querySelector('.student-support-chat-card');
      const rect = card.getBoundingClientRect();

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const x = ((e.clientX - centerX) / centerX) * ratio;
      const y = ((e.clientY - centerY) / centerY) * ratio;

      eyeballs.forEach(el => {
        el.style.translate = `${x * 100}% ${y * 100}%`;
      });
    };

    document.addEventListener('mousemove', handleEyesMove);

    return () => {
      document.removeEventListener('mousemove', handleEyesMove);
    };

  }, []);

  return (
    <div className="rolling-eyes-page">
        <div className="rolling-eyes-face">
            <div className="rolling-eyes">
                <div className="rolling-eyes-left">
                    <div className="rolling-eyes-eyeball"></div>
                </div>
                <div className="rolling-eyes-right">
                    <div className="rolling-eyes-eyeball"></div>
                </div>
            </div>
            <div className="rolling-eyes-mouth"></div>
        </div>
    </div>
  );
};

export default RollingEyes;