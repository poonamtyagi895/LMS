import React, { useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import "./DashboardRightPanel.css";

const DashboardRightPanel = ({ role }) => {
  const [open, setOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const isStudent = role === "student";

  const name = isStudent ? "Sahil" : "Poonam Tyagi";
  const username = isStudent ? "sahil" : "tyagip895";

  const profileLottie = isStudent
    ? "https://lottie.host/f2ffc4a9-3e7d-4eee-95f7-4aeaac63e5da/y0dA0Bl62z.lottie"
    : "https://lottie.host/cd22b1f3-55fc-4d27-b91a-4bb55da64d34/4r9g7dOxUC.lottie";

  const today = new Date();
  const todayDate = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

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

        {/* CALENDAR */}
        <div className="dashboard-right-panel-card">
          <div className="dashboard-right-panel-card-header">
            <span>{months[month]} {year}</span>
            <div className="calendar-nav">
              <i
                className="fas fa-chevron-left"
                onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
              />
              <i
                className="fas fa-chevron-right"
                onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
              />
            </div>
          </div>

          <div className="dashboard-right-panel-calendar">
            {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => (
              <div key={d} className="day">{d}</div>
            ))}

            {Array(firstDay).fill("").map((_, i) => (
              <div key={i} />
            ))}

            {Array(daysInMonth).fill("").map((_, i) => {
              const isToday =
                i + 1 === todayDate &&
                month === todayMonth &&
                year === todayYear;

              return (
                <div key={i} className={`date ${isToday ? "today" : ""}`}>
                  {i + 1}
                </div>
              );
            })}
          </div>
        </div>

        {/* NOTIFICATIONS */}
        <div className="dashboard-right-panel-card notifications-card">
          <h5 className="notification-title">My Notifications</h5>

          <div className="notifications-scroll">
            <div className="notification-item">
              <span className="tag">New</span>
              <div className="notification-text">
                <strong>New course available</strong>
                <small>Advanced React added</small>
              </div>
              <span className="count">3</span>
            </div>

            <div className="notification-item">
              <span className="tag">Alert</span>
              <div className="notification-text">
                <strong>Assignment due</strong>
                <small>UI task ends tomorrow</small>
              </div>
              <span className="count">3</span>
            </div>

            <div className="notification-item">
              <span className="tag">Info</span>
              <div className="notification-text">
                <strong>Profile updated</strong>
                <small>Your info was saved</small>
              </div>
              <span className="count">3</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardRightPanel;
