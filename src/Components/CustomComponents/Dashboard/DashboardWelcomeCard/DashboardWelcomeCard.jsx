import React from "react";
import "./DashboardWelcomeCard.css";
import DotButtonWhite from "../../Buttons/DotButtonWhite/DotButtonWhite";

const DashboardWelcomeCard = ({ name, buttonLabel, onButtonClick }) => {
  return (
    <div className="dashboard-welcome-card">
      <div className="dashboard-welcome-left">
        <h2>Hello, {name}!</h2>
        <p>
          We’ve missed you! Check out what’s new and improved in your dashboard.
        </p>

        <DotButtonWhite label={buttonLabel} onClick={onButtonClick}/>
      </div>

      <div className="dashboard-welcome-right">
        <img src="/images/boy-sitting.png" alt="Welcome" />
      </div>
    </div>
  );
};

export default DashboardWelcomeCard;
