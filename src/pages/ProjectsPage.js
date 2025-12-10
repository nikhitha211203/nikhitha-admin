import React, { useEffect, useState } from "react";
import "./Projects.css";
import { useNavigate } from "react-router-dom";

const ProjectsPage = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "DELETE"
      });

      if (res.ok) {
        setProjects(projects.filter((p) => p._id !== id));
      } else {
        alert("Failed to delete project");
      }
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  return (
    <div className="projects-container">
      <div className="page-header">
        <h2>Manage Projects</h2>
        <button className="add-btn" onClick={() => navigate("/projects/add")}>
          + Add New Project
        </button>
      </div>

      {loading ? (
        <p>Loading projects...</p>
      ) : (
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project._id} className="project-card">
              <img
                src={project.imageUrl || "https://via.placeholder.com/150"}
                alt={project.title}
                className="project-img"
              />
              <div className="project-info">
                <h3>{project.title}</h3>
                <div className="tech-stack">
                  {project.techStack.map((tech, i) => (
                    <span key={i} className="tech-badge">{tech}</span>
                  ))}
                </div>
                <details style={{ marginTop: '0.5rem' }}>
                  <summary style={{ cursor: 'pointer', color: '#60A5FA', fontSize: '0.9rem', userSelect: 'none' }}>View Details</summary>
                  <p style={{ marginTop: '0.5rem', color: '#cbd5e1', fontSize: '0.9rem' }}>{project.description}</p>
                </details>
                <div className="actions">
                  <button className="edit-btn" onClick={() => navigate(`/projects/edit/${project._id}`)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(project._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;