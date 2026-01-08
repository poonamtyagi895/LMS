import React, { useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import "./DashboardSidebar.css";

const DashboardSidebar = ({ menus }) => {
  useEffect(() => {
    const toggle = document.getElementById("dashboardMobileToggle");
    const sidebar = document.getElementById("dashboardSidebar");

    const handleToggle = () => {
      sidebar.classList.toggle("active");
    };

    if (toggle) {
      toggle.addEventListener("click", handleToggle);
    }

    return () => {
      if (toggle) {
        toggle.removeEventListener("click", handleToggle);
      }
    };
  }, []);

  return (
    <>
      <button className="dashboard-mobile-toggle" id="dashboardMobileToggle">
        <i className="fas fa-bars"></i>
      </button>

      <aside className="dashboard-sidebar" id="dashboardSidebar">
        <div className="dashboard-sidebar-header">
          <i className="fas fa-chart-pie dashboard-sidebar-logo-icon"></i>
          <span className="dashboard-sidebar-logo-text">LMS</span>
        </div>

        <nav className="dashboard-sidebar-menu">
          {menus.map((item, index) => (
            <div
              key={index}
              className={`dashboard-sidebar-item ${
                item.active ? "active" : ""
              }`}
            >
              <i className={item.icon}></i>
              <span>{item.label}</span>
            </div>
          ))}
        </nav>

        {/* Premium Box */}
        <div className="dashboard-sidebar-premium">
          <div className="dashboard-sidebar-lottie">
            <DotLottieReact
              src="https://lottie.host/996d0796-a736-4a54-8d22-264531164475/4xlU8pSTLf.lottie"
              loop
              autoplay
            />
          </div>

          <h4>Premium subscription</h4>
          <p>Buy Premium and get access to new courses</p>

          <button className="dashboard-sidebar-premium-btn">
            More detailed
          </button>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
