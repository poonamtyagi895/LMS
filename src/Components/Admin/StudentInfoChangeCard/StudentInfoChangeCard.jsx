import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import DotButton from "../../CustomComponents/Buttons/DotButton/DotButton";
import "./StudentInfoChangeCard.css";

const StudentInfoChangeCard = ({
  mode, // "add" | "edit"
  data,
  onChange,
  onSave,
  onCancel,
}) => {
  return (
    <div className="student-popup-overlay">
      <div className="student-popup-card">
        <h3>{mode === "add" ? "Add New Student" : "Update Student"}</h3>

        {/* AVATAR */}
        <div className="student-popup-avatar">
          <DotLottieReact
            src="https://lottie.host/f2ffc4a9-3e7d-4eee-95f7-4aeaac63e5da/y0dA0Bl62z.lottie"
            loop
            autoplay
          />
        </div>

        {/* INPUTS */}
        <input
          className="student-input"
          type="text"
          name="name"
          placeholder="Name"
          value={data.name}
          onChange={onChange}
        />

        <input
          className="student-input"
          type="email"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={onChange}
        />

        <input
          className="student-input"
          type="text"
          name="mobile"
          placeholder="Mobile"
          value={data.mobile}
          onChange={onChange}
        />

        {/* ACTIONS */}
        <div className="student-popup-actions">
          <DotButton
            label={mode === "add" ? "Add" : "Update"}
            onClick={onSave}
            type="button"
          />

          <button className="student-cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentInfoChangeCard;
