import DashboardSidebar from "../CustomComponents/DashboardSidebar/DashboardSidebar";
import DashboardRightPanel from "../CustomComponents/DashboardRightPanel/DashboardRightPanel";
import "./StudentLayout.css";
import { Outlet, useLocation } from "react-router-dom";

const StudentLayout = () => {
  const location = useLocation();

  const menus = [
    { label: "Dashboard", icon: "fas fa-user", path: "/student/dashboard" },
    { label: "Certifications", icon: "fas fa-certificate", path: "/student/certifications" },
    { label: "Downloads", icon: "fas fa-download", path: "/student/downloads" },
    { label: "My Cart", icon: "fas fa-shopping-cart", path: "/student/cart" },
    { label: "Refer a Friend", icon: "fas fa-user-friends", path: "/student/refer" },
    { label: "Purchase History", icon: "fas fa-receipt", path: "/student/purchase-history" },
    { label: "Settings", icon: "fas fa-cog", path: "/student/settings" },
    { label: "Support", icon: "fas fa-headset", path: "/student/support" },
  ];

  const updatedMenus = menus.map(m => ({
    ...m,
    active: location.pathname === m.path,
  }));

  return (
    <div className="student-layout">
      <DashboardSidebar menus={updatedMenus} />

      <main className="student-layout-main">
        <Outlet />
      </main>

      <DashboardRightPanel
        name="Sahil"
        username="@sahil"
        role="student"
      />
    </div>
  );
};

export default StudentLayout;
