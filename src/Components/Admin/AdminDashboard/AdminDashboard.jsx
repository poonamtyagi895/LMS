import DashboardWelcomeCard from "../../CustomComponents/DashboardWelcomeCard/DashboardWelcomeCard";
import DashboardInfoCard from "../../CustomComponents/DashboardInfoCard/DashboardInfoCard";
import DashboardAdminLatestEnrollments from "../../CustomComponents/DashboardAdminLatestEnrollments/DashboardAdminLatestEnrollments";
import "./AdminDashboard.css";
import LineGraph from "../../CustomComponents/LineGraph/LineGraph";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-header">
        <h1 className="admin-dashboard-title">Dashboard</h1>
        <p className="admin-dashboard-date">Thu Jan 08 2026</p>
      </div>

      <DashboardWelcomeCard
        name="Poonam Tyagi"
        buttonLabel="Explore New Students"
      />
      <div className="graph">
        <LineGraph
          title="Latest Enrollments"
          data={[5, 10, 15, 12, 20, 25, 30]}
          yMax={50}
          yStep={5}
          type="count"
        />
      </div>
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
