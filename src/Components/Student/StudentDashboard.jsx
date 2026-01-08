import React from "react";
import DashboardSidebar from "../Custom_components/DashboardSidebar/DashboardSidebar";
import DashboardRightPanel from "../Custom_components/DashboardRightPanel/DashboardRightPanel";
import DashboardWelcomeCard from "../Custom_components/DashboardWelcomeCard/DashboardWelcomeCard";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  const studentMenus = [
    { label: "Account / Profile", icon: "fas fa-user", active: true },
    { label: "Certifications", icon: "fas fa-certificate" },
    { label: "Downloads", icon: "fas fa-download" },
    { label: "My Cart", icon: "fas fa-shopping-cart" },
    { label: "Refer a Friend", icon: "fas fa-user-friends" },
    { label: "Purchase History", icon: "fas fa-receipt" },
    { label: "Settings", icon: "fas fa-cog" },
    { label: "Support", icon: "fas fa-headset" }
  ];

  const today = new Date().toDateString();

  return (
    <div className="dashboard-layout">
      <DashboardSidebar menus={studentMenus} />

      <div className="dashboard-main">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <span>{today}</span>
        </div>

        <DashboardWelcomeCard role="student" name="Sahil" />
      </div>

      <DashboardRightPanel role="student" />
    </div>
  );
};

export default StudentDashboard;
