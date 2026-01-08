import React from "react";
import DashboardSidebar from "../Custom_components/DashboardSidebar/DashboardSidebar";
import DashboardRightPanel from "../Custom_components/DashboardRightPanel/DashboardRightPanel";
import DashboardWelcomeCard from "../Custom_components/DashboardWelcomeCard/DashboardWelcomeCard";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const adminMenus = [
    { label: "Dashboard", icon: "fas fa-th-large", active: true },
    { label: "Students enrolled", icon: "fas fa-user-graduate" },
    { label: "Manage Courses", icon: "fas fa-book" },
    { label: "Test Management", icon: "fas fa-file-alt" }
  ];

  const today = new Date().toDateString();

  return (
    <div className="dashboard-layout">
      <DashboardSidebar menus={adminMenus} />

      <div className="dashboard-main">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <span>{today}</span>
        </div>

        <DashboardWelcomeCard role="admin" name="Poonam Tyagi" />
      </div>

      <DashboardRightPanel role="admin" />
    </div>
  );
};

export default AdminDashboard;
