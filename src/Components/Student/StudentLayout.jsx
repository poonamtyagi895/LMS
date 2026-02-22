import DashboardSidebar from "../CustomComponents/Dashboard/DashboardSidebar/DashboardSidebar";
import DashboardRightPanel from "../CustomComponents/Dashboard/DashboardRightPanel/DashboardRightPanel";
import "./StudentLayout.css";
import { Outlet, useLocation } from "react-router-dom";

const StudentLayout = () => {
  const location = useLocation();

  const menus = [
    { label: "Dashboard", icon: "fas fa-th-large", path: "/student/dashboard" },
    { label: "My Courses", icon: "fas fa-briefcase", path: "/student/courses" },
    { label: "Refer a Friend", icon: "fas fa-user-friends", path: "/student/refer-friend" },
    { label: "Purchase History", icon: "fas fa-receipt", path: "/student/purchase-history" },
    { label: "Support", icon: "fas fa-headset", path: "/student/student-support" },
  ];

  const updatedMenus = menus.map(m => ({
    ...m,
    active: location.pathname.startsWith(m.path),
  }));

  const hideRightPanel =
    location.pathname === "/student/courses" ||
    location.pathname.startsWith("/student/courses/");

  return (
    <div
      className={`student-layout ${
        hideRightPanel ? "student-layout--no-right-panel" : ""
      }`}
    >
      <DashboardSidebar menus={updatedMenus} />

      <main className="student-layout-main">
        <Outlet />
      </main>

      {!hideRightPanel && (
        <DashboardRightPanel
          name="Sahil"
          username="@sahil"
          role="student"
        />
      )}
    </div>
  );
};

export default StudentLayout;
