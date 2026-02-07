import { useRef } from "react";
import DashboardWelcomeCard from "../../CustomComponents/DashboardWelcomeCard/DashboardWelcomeCard";
import DashboardInfoCard from "../../CustomComponents/DashboardInfoCard/DashboardInfoCard";
import DashboardAdminLatestEnrollments from "../../CustomComponents/DashboardAdminLatestEnrollments/DashboardAdminLatestEnrollments";
import "./AdminDashboard.css";
import LineGraph from "../../CustomComponents/LineGraph/LineGraph";

const AdminDashboard = () => {
  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const latestEnrollmentsRef = useRef(null);

  const handleExploreClick = () => {
    latestEnrollmentsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-header">
        <h1 className="admin-dashboard-title">Dashboard</h1>
        <p className="admin-dashboard-date">{today}</p>
      </div>

      <DashboardWelcomeCard
        name="Poonam Tyagi"
        buttonLabel="Explore New Students"
        onButtonClick={handleExploreClick}
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

      <div ref={latestEnrollmentsRef}>
        <DashboardAdminLatestEnrollments />
      </div>
    </div>
  );
};

export default AdminDashboard;
