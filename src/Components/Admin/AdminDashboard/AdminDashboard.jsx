import { useRef } from "react";
import DashboardWelcomeCard from "../../CustomComponents/Dashboard/DashboardWelcomeCard/DashboardWelcomeCard";
import InfoCard from "../../CustomComponents/InfoCard/InfoCard";
import "./AdminDashboard.css";
import LineGraph from "../../CustomComponents/LineGraph/LineGraph";
import Table from "../../CustomComponents/TableComponents/Table/Table";

const AdminDashboard = () => {
  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const enrollments = [
    { id: 1, name: "Sahil", course: "React", date: "08 Jan 2026" },
    { id: 2, name: "Priya Sharma", course: "Node.js", date: "07 Jan 2026" },
    { id: 3, name: "Rahul Singh", course: "MongoDB", date: "07 Jan 2026" },
    { id: 4, name: "Ananya Gupta", course: "JavaScript", date: "06 Jan 2026" },
    { id: 5, name: "Vikram Reddy", course: "HTML & CSS", date: "06 Jan 2026" },
  ];

  const columns = [
    { key: "id", label: "Order ID" },
    { key: "name", label: "Student Name" },
    { key: "course", label: "Course" },
    { key: "date", label: "Enrollment Date" },
  ];

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
        buttonLabel="New Students"
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
        <InfoCard
          icon="fas fa-school"
          heading="Number of total enrollments"
          subheading="30 enrollments"
        />
        <InfoCard
          icon="fas fa-graduation-cap"
          heading="Number of total courses"
          subheading="50 courses"
        />
      </div>

      <div ref={latestEnrollmentsRef}>
        <Table title="Latest enrollments" columns={columns} data={enrollments} />
      </div>
    </div>
  );
};

export default AdminDashboard;
