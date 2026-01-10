import DashboardSidebar from "../Custom_components/DashboardSidebar/DashboardSidebar";
import DashboardWelcomeCard from "../Custom_components/DashboardWelcomeCard/DashboardWelcomeCard";
import DashboardInfoCard from "../Custom_components/DashboardInfoCard/DashboardInfoCard";
import DashboardRightPanel from "../Custom_components/DashboardRightPanel/DashboardRightPanel";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  const menus = [
    {
      label: "Account / Profile",
      icon: "fas fa-user",
      path: "/student/dashboard",
    },
    {
      label: "Certifications",
      icon: "fas fa-certificate",
      path: "/student/certifications",
    },
    {
      label: "Downloads",
      icon: "fas fa-download",
      path: "/student/downloads",
    },
    {
      label: "My Cart",
      icon: "fas fa-shopping-cart",
      path: "/student/cart",
    },
    {
      label: "Refer a Friend",
      icon: "fas fa-user-friends",
      path: "/student/refer",
    },
    {
      label: "Purchase History",
      icon: "fas fa-receipt",
      path: "/student/purchase-history",
    },
    {
      label: "Settings",
      icon: "fas fa-cog",
      path: "/student/settings",
    },
    {
      label: "Support",
      icon: "fas fa-headset",
      path: "/student/support",
    },
  ];

  return (
    <div className="student-dashboard-layout">
      <DashboardSidebar menus={menus} />

      <main className="student-dashboard-main">
        <div className="student-dashboard-header">
          <h1 className="student-dashboard-title">Dashboard</h1>
          <p className="student-dashboard-date">Thu Jan 08 2026</p>
        </div>

        <DashboardWelcomeCard
          name="Sahil"
          buttonText="Explore More Courses"
        />

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
      </main>

      <DashboardRightPanel
        name="Sahil"
        username="@sahil"
        role="student"
      />
    </div>
  );
};

export default StudentDashboard;
