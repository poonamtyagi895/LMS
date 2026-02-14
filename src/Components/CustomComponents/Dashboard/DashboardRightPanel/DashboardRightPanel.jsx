import React, { useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import "./DashboardRightPanel.css";
import Calendar from "../../Calendar/Calendar";
import Notifications from "../../Notifications/Notifications";

const DashboardRightPanel = ({ role }) => {
  const [open, setOpen] = useState(false);

  const isStudent = role === "student";

  const name = isStudent ? "Sahil" : "Poonam Tyagi";
  const username = isStudent ? "sahil" : "tyagip895";

  const profileLottie = isStudent
    ? "https://lottie.host/f2ffc4a9-3e7d-4eee-95f7-4aeaac63e5da/y0dA0Bl62z.lottie"
    : "https://lottie.host/cd22b1f3-55fc-4d27-b91a-4bb55da64d34/4r9g7dOxUC.lottie";

  return (
    <>
      <button
        className="dashboard-right-panel-toggle"
        onClick={() => setOpen(true)}
      >
        <i className="fas fa-bell"></i>
      </button>

      <aside className={`dashboard-right-panel ${open ? "mobile-open" : ""}`}>
        {/* MOBILE HEADER */}
        <div className="dashboard-right-panel-mobile-header">
          <span className="mobile-title">Notifications</span>
          <button className="close-btn" onClick={() => setOpen(false)}>
            ✕
          </button>
        </div>

        {/* PROFILE */}
        <div className="dashboard-right-panel-profile">
          <div className="profile-avatar">
            <DotLottieReact src={profileLottie} loop autoplay />
          </div>

          <div className="profile-text">
            <h4>{name}</h4>
            <span>@{username}</span>
          </div>
        </div>

        {/* CALENDER */}
        <Calendar mode = "display"/>

        {/* NOTIFICATIONS */}
        <Notifications role={role}/>
      </aside>
    </>
  );
};

export default DashboardRightPanel;
