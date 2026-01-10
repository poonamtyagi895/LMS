import DashboardWelcomeCard from "../../Custom_components/DashboardWelcomeCard/DashboardWelcomeCard";
import DashboardInfoCard from "../../Custom_components/DashboardInfoCard/DashboardInfoCard";
import DashboardAdminLatestEnrollments from "../../Custom_components/DashboardAdminLatestEnrollments/DashboardAdminLatestEnrollments";

import "./AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-header">
        <h1 className="admin-dashboard-title">Dashboard</h1>
        <p className="admin-dashboard-date">Thu Jan 08 2026</p>
      </div>

      <DashboardWelcomeCard
        name="Poonam Tyagi"
        buttonText="Explore New Students"
      />

      <div className="admin-dashboard-info-grid">
        <DashboardInfoCard
          icon="fas fa-school"
          heading="Number of total enrollments"
          subheading="30 enrollments"
        />
        <DashboardInfoCard
          icon="fas fa-graduation-cap"
          heading="Number of total courses"
          subheading="50 courses"
        />
      </div>
      <DashboardAdminLatestEnrollments />
    </div>
  );
};

export default AdminDashboard;
