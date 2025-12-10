import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (!loggedIn) navigate("/");
    fetchStats();
  }, [navigate]);

  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    messages: 0
  });

  const fetchStats = async () => {
    try {
      const [resProj, resSkills, resMsgs] = await Promise.all([
        fetch("/api/projects"),
        fetch("/api/skills"),
        fetch("/api/contact")
      ]);
      const projData = await resProj.json();
      const skillsData = await resSkills.json();
      const msgsData = await resMsgs.json();

      setStats({
        projects: projData.length || 0,
        skills: skillsData.length || 0,
        messages: msgsData.length || 0
      });
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  const contentItems = [
    {
      title: "About Me",
      desc: "Edit your personal bio & skills",
      icon: "👤",
      route: "/about",
    },
    {
      title: "Projects",
      desc: "Manage and update all your projects",
      icon: "🧩",
      route: "/projects",
      count: stats.projects
    },
    {
      title: "Experience & Education",
      desc: "Add or edit your experience and academics",
      icon: "💼",
      route: "/experience",
    },
    {
      title: "Contact Info",
      desc: "Update your public contact details",
      icon: "✉️",
      route: "/contact",
      count: stats.messages
    },
  ];

  return (
    <div className="dashboard-container">

      {/* Header */}
      <div className="dashboard-header">
        <h2>Admin Dashboard</h2>

        <button
          className="logout-btn"
          onClick={async () => {
            await fetch("/api/auth/logout", { method: "POST" });
            localStorage.removeItem("isLoggedIn");
            navigate("/");
          }}
        >
          <span className="logout-icon">🚪</span>
          Logout
        </button>
      </div>

      {/* Welcome section */}
      <div className="welcome-card">
        <div className="banner"></div>
        <h3>Welcome, Admin! 🎉</h3>
        <p>You can manage all portfolio content here.</p>

        <button
          className="view-btn"
          onClick={() =>
            window.open("https://portfolio-nikhitha-kappa.vercel.app/")
          }
        >
          View Live Portfolio
        </button>
      </div>

      {/* Manage Content */}
      <h3 className="section-title">Manage Content</h3>

      <div className="content-list">
        {contentItems.map((item, index) => (
          <div
            key={index}
            className="content-item"
            onClick={() => navigate(item.route)}
          >
            <div className="icon-circle">{item.icon}</div>

            <div className="item-info">
              <h4>{item.title} {item.count !== undefined && <span className="count-badge">({item.count})</span>}</h4>
              <p>{item.desc}</p>
            </div>

            <span className="arrow">›</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
