import React, { useState, useEffect } from "react";
import "./ExperienceEducation.css";
import { useNavigate } from "react-router-dom";
import API_URL from "../config";

const ExperienceEducation = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("education");
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`${API_URL}/api/about`);
      const data = await res.json();
      if (data) {
        setEducation(data.education || []);
        setExperience(data.experience || []);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const deleteItem = async (type, id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      // Typically we would need a specific delete endpoint or update the whole about object
      // Since our API is /api/about for PUT/POST, we need to fetch, filter, and save.
      // Or if we added specific delete endpoints to About controller, that would be better.
      // For now, client-side filter + update is consistent with Add logic we will implement.
      const res = await fetch(`${API_URL}/api/about`);
      const data = await res.json();

      if (type === 'education') {
        data.education = data.education.filter(item => item._id !== id);
      } else {
        data.experience = data.experience.filter(item => item._id !== id);
      }

      await fetch(`${API_URL}/api/about`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      fetchData(); // Refresh local state
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  return (
    <div className="expedu-container">
      {/* Header Row */}
      <div className="nav-row">
        <span className="back" onClick={() => navigate(-1)}>
          ←
        </span>
        <h2>Manage Portfolio</h2>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={activeTab === "experience" ? "active" : ""}
          onClick={() => setActiveTab("experience")}
        >
          Experience
        </button>

        <button
          className={activeTab === "education" ? "active" : ""}
          onClick={() => setActiveTab("education")}
        >
          Education
        </button>
      </div>

      {/* List Area */}
      <div className="list-area">
        {activeTab === "education" &&
          (education.length > 0 ? (
            education.map((item) => (
              <div
                key={item._id}
                className="list-card"
                onClick={() => toggleExpand(item._id)}
                style={{ cursor: 'pointer', flexDirection: 'column', alignItems: 'flex-start' }}
              >
                <div style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                  <div className="icon-box">🎓</div>
                  <div style={{ flex: 1 }}>
                    <h4>{item.degree}</h4>
                    <p>
                      {item.institution} | {item.year}
                    </p>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteItem('education', item._id); }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
                  >
                    🗑️
                  </button>
                  <span className="arrow" style={{ transform: expandedId === item._id ? 'rotate(90deg)' : 'none' }}>›</span>
                </div>
                {expandedId === item._id && (
                  <div className="details-content" style={{ padding: '10px 0', borderTop: '1px solid #334155', marginTop: '10px', width: '100%', color: '#cbd5e1' }}>
                    <p>{item.description || "No description provided."}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="empty-msg">No education records found.</p>
          ))}

        {activeTab === "experience" &&
          (experience.length > 0 ? (
            experience.map((item) => (
              <div
                key={item._id}
                className="list-card"
                onClick={() => toggleExpand(item._id)}
                style={{ cursor: 'pointer', flexDirection: 'column', alignItems: 'flex-start' }}
              >
                <div style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                  <div className="icon-box">💼</div>
                  <div style={{ flex: 1 }}>
                    <h4>{item.role}</h4>
                    <p>
                      {item.company} | {item.duration}
                    </p>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteItem('experience', item._id); }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
                  >
                    🗑️
                  </button>
                  <span className="arrow" style={{ transform: expandedId === item._id ? 'rotate(90deg)' : 'none' }}>›</span>
                </div>
                {expandedId === item._id && (
                  <div className="details-content" style={{ padding: '10px 0', borderTop: '1px solid #334155', marginTop: '10px', width: '100%', color: '#cbd5e1' }}>
                    <p>{item.description || "No description provided."}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="empty-msg">No experience records found.</p>
          ))}
      </div>

      {/* Add Button */}
      <button
        className="add-btn"
        onClick={() =>
          navigate(
            activeTab === "education" ? "/education/add" : "/experience/add"
          )
        }
      >
        ＋ Add {activeTab === "education" ? "Education" : "Experience"}
      </button>
    </div>
  );
};

export default ExperienceEducation;
