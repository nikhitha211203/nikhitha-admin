import React, { useEffect, useState } from "react";
import "./Skills.css";
import { useNavigate } from "react-router-dom";
import API_URL from "../config";

const SkillsPage = () => {
    const navigate = useNavigate();
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            const res = await fetch(`${API_URL}/api/skills`);
            const data = await res.json();
            setSkills(data);
        } catch (err) {
            console.error("Error fetching skills:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this skill?")) return;

        try {
            const res = await fetch(`${API_URL}/api/skills/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setSkills(skills.filter((s) => s._id !== id));
            } else {
                alert("Failed to delete skill");
            }
        } catch (err) {
            console.error("Error deleting skill:", err);
        }
    };

    // Group skills by category
    const groupedSkills = skills.reduce((acc, skill) => {
        (acc[skill.category] = acc[skill.category] || []).push(skill);
        return acc;
    }, {});

    return (
        <div className="skills-container">
            <div className="page-header">
                <h2>Manage Skills</h2>
                <button className="add-btn" onClick={() => navigate("/skills/add")}>
                    + Add New Skill
                </button>
            </div>

            {loading ? (
                <p>Loading skills...</p>
            ) : (
                <div className="skills-content">
                    {Object.keys(groupedSkills).length === 0 && <p>No skills found.</p>}

                    {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                        <div key={category} className="skill-category">
                            <h3>{category}</h3>
                            <div className="skills-grid">
                                {categorySkills.map((skill) => (
                                    <div key={skill._id} className="skill-card">
                                        <div className="skill-info">
                                            <h4>{skill.name}</h4>
                                            <div className="skill-level-bar">
                                                <div
                                                    className="skill-level-fill"
                                                    style={{ width: `${skill.level}%` }}
                                                ></div>
                                            </div>
                                            <span className="skill-level-text">{skill.level}%</span>
                                        </div>
                                        <div className="actions">
                                            <button className="edit-icon-btn" onClick={() => navigate(`/skills/edit/${skill._id}`)}>✎</button>
                                            <button className="delete-icon-btn" onClick={() => handleDelete(skill._id)}>🗑</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SkillsPage;
