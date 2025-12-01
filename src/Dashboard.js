import React from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">

      {/* Header */}
      <div className="dashboard-header">
        <h2>Admin Dashboard</h2>
        <button className="logout-icon" onClick={() => navigate("/")}>
          ⇦
        </button>
      </div>

      {/* Welcome Card */}
      <div className="welcome-card">
        <div className="banner"></div>

        <h3>Welcome, Admin!</h3>
        <p>Here you can manage all the content of your portfolio.</p>

        <button
          className="view-btn"
          onClick={() => window.open("https://your-portfolio-link.com")}
        >
          View Live Portfolio
        </button>
      </div>

      {/* Manage Content Section */}
      <h3 className="section-title">Manage Content</h3>

      <div className="content-list">

        <div className="content-item" onClick={() => navigate("/about")}>
          <div className="icon-circle">👤</div>
          <div>
            <h4>About Me</h4>
            <p>Edit your personal bio and skills</p>
          </div>
          <span className="arrow">›</span>
        </div>

        <div className="content-item" onClick={() => navigate("/projects")}>
          <div className="icon-circle">🧩</div>
          <div>
            <h4>Projects</h4>
            <p>Manage your projects</p>
          </div>
          <span className="arrow">›</span>
        </div>

        <div className="content-item" onClick={() => navigate("/experience")}>
          <div className="icon-circle">💼</div>
          <div>
            <h4>Experience & Education</h4>
            <p>Update career and academic history</p>
          </div>
          <span className="arrow">›</span>
        </div>

        <div className="content-item" onClick={() => navigate("/contact")}>
          <div className="icon-circle">✉️</div>
          <div>
            <h4>Contact Info</h4>
            <p>Set your public contact details</p>
          </div>
          <span className="arrow">›</span>
        </div>

      </div>

      {/* Floating Add Button */}
      <button className="floating-btn">＋</button>
    </div>
  );
};

export default Dashboard;
