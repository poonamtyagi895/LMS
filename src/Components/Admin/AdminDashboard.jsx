import React from "react";
import DashboardSidebar from "../Custom_components/DashboardSidebar/DashboardSidebar";
import DashboardRightPanel from "../Custom_components/DashboardRightPanel/DashboardRightPanel";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const adminMenus = [
    { label: "Dashboard", icon: "fas fa-th-large", active: true },
    { label: "Students enrolled", icon: "fas fa-user-graduate" },
    { label: "Manage Courses", icon: "fas fa-book" },
    { label: "Test Management", icon: "fas fa-file-alt" }
  ];

  return (
    <div className="dashboard-layout">
      <DashboardSidebar menus={adminMenus} />

      <div className="dashboard-main">
        <h1>Admin Dashboard</h1>
      </div>

      <DashboardRightPanel role="admin" />
    </div>
  );
};

export default AdminDashboard;
