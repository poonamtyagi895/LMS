import React from "react";
import "./DashboardWelcomeCard.css";

const DashboardWelcomeCard = ({ role, name }) => {
  const isStudent = role === "student";

  return (
    <div className="dashboard-welcome-card">
      <div className="dashboard-welcome-left">
        <h2>Hello, {name}!</h2>
        <p>
          We’ve missed you! Check out what’s new and improved in your dashboard.
        </p>

        <button className="dashboard-welcome-btn">
          {isStudent ? "Explore More Courses" : "Explore New Students"}
        </button>
      </div>

      <div className="dashboard-welcome-right">
        <img src="/images/boy-sitting.png" alt="Welcome" />
      </div>
    </div>
  );
};

export default DashboardWelcomeCard;
