import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ProjectForm.css";

const ProjectForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = !!id;

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        techStack: "",
        githubLink: "",
        liveLink: "",
        imageUrl: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (isEdit) {
            fetchProject();
        }
    }, [id]);

    const fetchProject = async () => {
        try {
            const res = await fetch(`/api/projects/${id}`);
            if (!res.ok) throw new Error("Failed to fetch project");
            const data = await res.json();
            setFormData({
                ...data,
                techStack: data.techStack.join(", ")
            });
        } catch (err) {
            setError("Could not load project details.");
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const payload = {
            ...formData,
            techStack: formData.techStack.split(",").map(item => item.trim()).filter(i => i)
        };

        try {
            const url = isEdit ? `/api/projects/${id}` : "/api/projects";
            const method = isEdit ? "PUT" : "POST";

            const res = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    // Add auth token header if using localStorage for token, 
                    // but we are using httpOnly cookies so we just need credentials include if cross-origin, 
                    // but here we are using relative path so proxy handles it.
                },
                body: JSON.stringify(payload)
            });

            if (!res.ok) throw new Error("Failed to save project");

            navigate("/projects");
        } catch (err) {
            setError("Error saving project. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="project-form-container">
            <div className="form-wrapper">
                <h2>{isEdit ? "Edit Project" : "Add New Project"}</h2>
                {error && <p className="error-msg">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Project Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            name="description"
                            rows="4"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label>Tech Stack (comma separated)</label>
                        <input
                            type="text"
                            name="techStack"
                            placeholder="React, Node.js, MongoDB"
                            value={formData.techStack}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>GitHub Link</label>
                            <input
                                type="url"
                                name="githubLink"
                                value={formData.githubLink}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Live Demo Link</label>
                            <input
                                type="url"
                                name="liveLink"
                                value={formData.liveLink}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Image URL</label>
                        <input
                            type="url"
                            name="imageUrl"
                            placeholder="https://..."
                            value={formData.imageUrl}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="btn-group">
                        <button type="button" className="cancel-btn" onClick={() => navigate("/projects")}>
                            Cancel
                        </button>
                        <button type="submit" className="save-btn" disabled={loading}>
                            {loading ? "Saving..." : "Save Project"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProjectForm;
