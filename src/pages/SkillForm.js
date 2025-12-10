import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ProjectForm.css"; // Reusing form styles

const SkillForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = !!id;

    const [formData, setFormData] = useState({
        name: "",
        level: 50,
        category: "Frontend"
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const categories = ["Frontend", "Backend", "Database", "Tools", "Soft Skills", "Other"];

    useEffect(() => {
        if (isEdit) {
            fetchSkill();
        }
    }, [id]);

    const fetchSkill = async () => {
        try {
            const res = await fetch(`/api/skills/${id}`);
            if (!res.ok) throw new Error("Failed to fetch skill");
            const data = await res.json();
            setFormData(data);
        } catch (err) {
            setError("Could not load skill details.");
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const url = isEdit ? `/api/skills/${id}` : "/api/skills";
            const method = isEdit ? "PUT" : "POST";

            const res = await fetch(url, {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (!res.ok) throw new Error("Failed to save skill");

            navigate("/skills");
        } catch (err) {
            setError("Error saving skill. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="project-form-container">
            <div className="form-wrapper" style={{ maxWidth: "500px" }}>
                <h2>{isEdit ? "Edit Skill" : "Add New Skill"}</h2>
                {error && <p className="error-msg">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Skill Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                background: '#0F172A',
                                border: '1px solid #334155',
                                borderRadius: '6px',
                                color: 'white',
                                fontSize: '1rem'
                            }}
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Proficiency Level ({formData.level}%)</label>
                        <input
                            type="range"
                            name="level"
                            min="1"
                            max="100"
                            value={formData.level}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="btn-group">
                        <button type="button" className="cancel-btn" onClick={() => navigate("/skills")}>
                            Cancel
                        </button>
                        <button type="submit" className="save-btn" disabled={loading}>
                            {loading ? "Saving..." : "Save Skill"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SkillForm;
