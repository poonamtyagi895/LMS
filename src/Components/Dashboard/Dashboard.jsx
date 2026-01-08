import React, { useEffect } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  useEffect(() => {
    const mobileToggle = document.getElementById("mobileToggle");
    const sidebar = document.getElementById("sidebar");

    const toggleSidebar = () => {
      sidebar.classList.toggle("active");
    };

    mobileToggle.addEventListener("click", toggleSidebar);

    return () => {
      mobileToggle.removeEventListener("click", toggleSidebar);
    };
  }, []);

  return (
    <>
      <button className="mobile-toggle" id="mobileToggle">
        <i className="fas fa-bars"></i>
      </button>

      <div className="sidebar" id="sidebar">
        <div className="logo">
          <i className="fas fa-chart-pie"></i>
          <h1>AdminPanel</h1>
        </div>

        <div className="nav-links">
          <a className="active"><i className="fas fa-home"></i>Dashboard</a>
          <a><i className="fas fa-users"></i>Students enrolled</a>
          <a><i className="fas fa-inbox"></i>Manage Courses</a>
          <a><i className="fas fa-newspaper"></i>Test Management</a>
        </div>

        <div className="user-info">
          <div className="user-avatar">PT</div>
          <div>
            <div className="user-name">Poonam Tyagi</div>
            <div className="user-role">Administrator</div>
          </div>
        </div>
      </div>

      <div className="main-content" id="mainContent">
        <div className="header">
          <div className="search-bar">
            <i className="fas fa-search"></i>
            <input type="text" placeholder="Search..." />
          </div>

          <div className="user-actions">
            <div className="notification">
              <i className="far fa-bell"></i>
            </div>

            <div className="user-profile">
              <div className="user-avatar">PT</div>
              <span>Poonam Tyagi</span>
            </div>
          </div>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-header">
              <h3>Number of total enrollments</h3>
              <div className="stat-icon">
                <i className="fas fa-school"></i>
              </div>
            </div>
            <div className="stat-value">10</div>
            <div className="stat-label">Last 30 days</div>
            <div className="stat-change positive">
              <i className="fas fa-arrow-up"></i>
              <span>12% increase</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <h3>Number of total courses</h3>
              <div className="stat-icon">
                <i className="fas fa-graduation-cap"></i>
              </div>
            </div>
            <div className="stat-value">50</div>
            <div className="stat-label">Last 30 days</div>
            <div className="stat-change positive">
              <i className="fas fa-arrow-up"></i>
              <span>8% increase</span>
            </div>
          </div>
        </div>

        <div className="content-row">
          <div className="table-container">
            <div className="section-header">
              <div className="section-title">Latest enrollments</div>
              <a className="view-all">View All</a>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Student Name</th>
                  <th>Course Title</th>
                  <th>Enrollment Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Priya Sharma</td>
                  <td>A</td>
                  <td>date</td>
                  <td><span className="status active">Completed</span></td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Rahul Singh</td>
                  <td>B</td>
                  <td>date</td>
                  <td><span className="status pending">Pending</span></td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Ananya Gupta</td>
                  <td>C</td>
                  <td>date</td>
                  <td><span className="status active">Completed</span></td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Vikram Reddy</td>
                  <td>D</td>
                  <td>date</td>
                  <td><span className="status active">Completed</span></td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Neha Joshi</td>
                  <td>E</td>
                  <td>date</td>
                  <td><span className="status pending">Pending</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="activity-container">
          <div className="section-header">
            <div className="section-title">Recent Activity</div>
            <a className="view-all">View All</a>
          </div>

          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon"><i className="fas fa-user-plus"></i></div>
              <div>
                <div className="activity-title">New user registered</div>
                <div className="activity-desc">Aditya Kumar created a new account</div>
                <div className="activity-time">10 minutes ago</div>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon"><i className="fas fa-shopping-cart"></i></div>
              <div>
                <div className="activity-title">New order received</div>
                <div className="activity-desc">Order #ORD-7842 from Meera Iyer for ₹15,600</div>
                <div className="activity-time">45 minutes ago</div>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon"><i className="fas fa-chart-line"></i></div>
              <div>
                <div className="activity-title">Monthly report generated</div>
                <div className="activity-desc">August 2023 revenue report is ready</div>
                <div className="activity-time">2 hours ago</div>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon"><i className="fas fa-cog"></i></div>
              <div>
                <div className="activity-title">System updated</div>
                <div className="activity-desc">Security patches applied successfully</div>
                <div className="activity-time">5 hours ago</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default Dashboard;
