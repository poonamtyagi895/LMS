import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import "./DashboardSidebar.css";
import LogoutButton from "../Buttons/LogoutButton/LogoutButton";
import TooltipButton from "../Buttons/TooltipButton/TooltipButton";

const DashboardSidebar = ({ menus }) => {
  useEffect(() => {
    const toggle = document.getElementById("dashboardMobileToggle");
    const sidebar = document.getElementById("dashboardSidebar");

    const handleToggle = () => {
      sidebar.classList.toggle("active");
    };

    if (toggle) toggle.addEventListener("click", handleToggle);

    return () => {
      if (toggle) toggle.removeEventListener("click", handleToggle);
    };
  }, []);

  return (
    <>
      {/* MOBILE TOGGLE */}
      <button className="dashboard-mobile-toggle" id="dashboardMobileToggle">
        <i className="fas fa-bars"></i>
      </button>

      <aside className="dashboard-sidebar" id="dashboardSidebar">
        {/* LOGO */}
        <div className="dashboard-sidebar-header">
          <i className="fas fa-chart-pie dashboard-sidebar-logo-icon"></i>
          <span className="dashboard-sidebar-logo-text">LMS</span>
        </div>

        {/* MENU */}
        <nav className="dashboard-sidebar-menu">
          {menus.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              end
              className={({ isActive }) =>
                `dashboard-sidebar-item ${isActive ? "active" : ""}`
              }
            >
              <i className={item.icon}></i>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* LOGOUT */}
        <div className="dashboard-sidebar-logout">
          <LogoutButton/>
        </div>

        {/* PREMIUM */}
        <div className="dashboard-sidebar-premium">
          <div className="dashboard-sidebar-lottie">
            <DotLottieReact
              src="https://lottie.host/996d0796-a736-4a54-8d22-264531164475/4xlU8pSTLf.lottie"
              loop
              autoplay
            />
          </div>

          <h4>Learn Without Limits</h4>
          <p>Access all premium courses and exclusive content</p>
          <TooltipButton label = "More Detailed" tooltipText = "An investment in knowledge pays the best interest."/>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
