import DashboardSidebar from "../CustomComponents/DashboardSidebar/DashboardSidebar";
import DashboardRightPanel from "../CustomComponents/DashboardRightPanel/DashboardRightPanel";
import "./AdminLayout.css";
import { Outlet, useLocation } from "react-router-dom";

const AdminLayout = () => {
  const location = useLocation();

  const menus = [
    { label: "Dashboard", icon: "fas fa-th-large", path: "/admin/dashboard" },
    { label: "Students enrolled", icon: "fas fa-user-graduate", path: "/admin/students" },
    { label: "Manage Courses", icon: "fas fa-book", path: "/admin/manage-courses" },
    { label: "Test Management", icon: "fas fa-file-alt", path: "/admin/test-management" },
  ];

  const updatedMenus = menus.map(m => ({
    ...m,
    active: location.pathname === m.path,
  }));

  const hideRightPanel =
    location.pathname.includes("/admin/manage-courses/new") ||
    location.pathname.includes("/admin/manage-courses/edit") ||
    location.pathname.includes("/admin/manage-courses/") &&
    location.pathname.includes("/chapters/");

  return (
    <div className={`admin-layout ${hideRightPanel ? "admin-layout--no-right-panel" : ""}`}>
      <DashboardSidebar menus={updatedMenus} />

      <main className="admin-layout-main">
        <Outlet />
      </main>

      {!hideRightPanel && (
        <DashboardRightPanel
          name="Poonam Tyagi"
          username="@tyagip895"
          role="admin"
        />
      )}
    </div>
  );
};

export default AdminLayout;
