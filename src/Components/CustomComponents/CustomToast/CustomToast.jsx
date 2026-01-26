import { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import "./CustomToast.css";

let addToastExternal = null;

/* LOTTIE FILES */
const LOTTIES = {
  success:
    "https://lottie.host/585be460-cf9c-42be-96ec-e054496ab546/vtJFelaACV.lottie",
  warning:
    "https://lottie.host/d96cafb2-2c70-4e6d-ac6c-f894195cf0f1/dXaUdt45cz.lottie",
  error:
    "https://lottie.host/43154fe7-4f0a-49ce-9997-aa254b14264d/jjQAEBRS2p.lottie",
  info:
    "https://lottie.host/ba264e6a-5bc0-4899-8788-ce5be5e23916/ONcIgzh5vZ.lottie",
};

const TITLES = {
  success: "Success",
  info: "Info",
  warning: "Warning",
  error: "Error",
};
const ICON_SCALES = {
  success: 1.8,
  info: 1.1,
  warning: 1.7,
  error: 1.9,
};
/* PUBLIC API */
export const showToast = (type, message, duration = 7000) => {
  if (addToastExternal) {
    addToastExternal(type, message, duration);
  }
};

const CustomToast = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    addToastExternal = (type, message, duration) => {
      setToasts((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          type,
          message,
          duration,
        },
      ]);
    };

    return () => {
      addToastExternal = null;
    };
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <>
      {toasts.map((toast, index) => (
        <ToastItem
          key={toast.id}
          {...toast}
          index={index}
          onRemove={removeToast}
        />
      ))}
    </>
  );
};

const ToastItem = ({
  id,
  type,
  message,
  duration,
  index,
  onRemove,
}) => {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLeaving(true);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration]);

  useEffect(() => {
    if (leaving) {
      const cleanup = setTimeout(() => {
        onRemove(id);
      }, 400);
      return () => clearTimeout(cleanup);
    }
  }, [leaving, id, onRemove]);

  return (
    <div
      className={`custom-toast-wrapper ${
        leaving ? "custom-toast-hide" : "custom-toast-show"
      }`}
      style={{ bottom: 20 + index * 80 }}
    >
      <div className={`custom-toast custom-toast-${type}`}>
        {/* ICON (CLIPPED & CLEAN) */}
        <div className="custom-toast-icon-wrapper">
          <DotLottieReact
            src={LOTTIES[type]}
            autoplay
            loop
            style={{
              width: 64,
              height: 64,
              transform: `scale(${ICON_SCALES[type] || 1})`,
            }}
          />
        </div>

        <div className="custom-toast-content">
          <span className="custom-toast-title">{TITLES[type]}</span>
          <p className="custom-toast-message">{message}</p>
        </div>

        <button
          className="custom-toast-close"
          onClick={() => setLeaving(true)}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default CustomToast;