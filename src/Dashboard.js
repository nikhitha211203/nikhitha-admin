import React from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const contentItems = [
    {
      title: "About Me",
      desc: "Edit your personal bio and skills",
      icon: "👤",
      route: "/about",
    },
    {
      title: "Projects",
      desc: "Manage your projects",
      icon: "🧩",
      route: "/projects",
    },
    {
      title: "Experience & Education",
      desc: "Update career and academic history",
      icon: "💼",
      route: "/experience",
    },
    {
      title: "Contact Info",
      desc: "Set your public contact details",
      icon: "✉️",
      route: "/contact",
    },
  ];

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
          onClick={() =>
            window.open("https://portfolio-nikhitha-kappa.vercel.app/")
          }
        >
          View Live Portfolio
        </button>
      </div>

      {/* Manage Content Section */}
      <h3 className="section-title">Manage Content</h3>

      <div className="content-list">
        {contentItems.map((item, index) => (
          <div
            key={index}
            className="content-item"
            onClick={() => navigate(item.route)}
          >
            <div className="icon-circle">{item.icon}</div>
            <div>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
            <span className="arrow">›</span>
          </div>
        ))}
      </div>

      {/* Floating Add Button */}
      <button className="floating-btn">＋</button>
    </div>
  );
};

export default Dashboard;
