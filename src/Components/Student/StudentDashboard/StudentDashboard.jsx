import { useNavigate } from "react-router-dom";
import DashboardWelcomeCard from "../../CustomComponents/DashboardWelcomeCard/DashboardWelcomeCard";
import DashboardInfoCard from "../../CustomComponents/DashboardInfoCard/DashboardInfoCard";
import LineGraph from "../../CustomComponents/LineGraph/LineGraph";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="student-dashboard-header">
        <h1 className="student-dashboard-title">Dashboard</h1>
        <p className="student-dashboard-date">Thu Jan 08 2026</p>
      </div>
      <DashboardWelcomeCard
        name="Sahil"
        buttonLabel="My Profile"
        onButtonClick={() => navigate("/student/profile")}
      />
      <div className="graph">
        <LineGraph
          title="Hours Spent on LMS"
          data={[
            1 + 20 / 60,
            2 + 0 / 60,
            1 + 45 / 60,
            3 + 10 / 60,
            2 + 30 / 60,
            4 + 0 / 60,
            3 + 50 / 60,
          ]}
          yMax={10}
          yStep={1}
          unit="h"
          type="hours"
        />
      </div>
      <div className="student-dashboard-info-grid">
        <DashboardInfoCard
          icon="fas fa-book-open"
          heading="Number of total courses"
          subheading="9 courses"
        />
        <DashboardInfoCard
          icon="fas fa-check-circle"
          heading="Completed courses"
          subheading="3 courses"
        />
      </div>
    </>
  );
};

export default StudentDashboard;
