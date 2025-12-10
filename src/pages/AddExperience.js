import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddExperience.css";

const AddExperience = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    company: "",
    role: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    window.history.back();
  };

  const handleSave = async () => {
    if (!form.company || !form.role) {
      alert("Please fill in Company and Role");
      return;
    }

    try {
      // Fetch existing about data
      const res = await fetch("/api/about");
      const data = await res.json();

      const newExp = {
        company: form.company,
        role: form.role,
        duration: `${form.startDate} - ${form.endDate || 'Present'}`,
        description: form.description
      };

      const updatedData = {
        ...data,
        experience: [...(data.experience || []), newExp]
      };

      await fetch("/api/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData)
      });

      alert("Experience Saved!");
      navigate(-1);
    } catch (err) {
      console.error(err);
      alert("Failed to save experience.");
    }
  };

  return (
    <div className="addexp-container">

      {/* Back Row */}
      <div className="nav-row">
        <span className="back-icon" onClick={handleCancel}>⬅️</span>
        <h2>Add Experience</h2>
      </div>

      <label>Company Name</label>
      <input
        type="text"
        name="company"
        placeholder="Enter company name"
        value={form.company}
        onChange={handleChange}
      />

      <label>Role / Position</label>
      <input
        type="text"
        name="role"
        placeholder="Enter your role"
        value={form.role}
        onChange={handleChange}
      />

      <div className="date-row">
        <div className="date-field">
          <label>Start Date</label>
          <input
            type="month"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
          />
        </div>

        <div className="date-field">
          <label>End Date</label>
          <input
            type="month"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
          />
        </div>
      </div>

      <label>Description</label>
      <textarea
        name="description"
        placeholder="Describe your work (optional)"
        value={form.description}
        onChange={handleChange}
      />

      <div className="buttons-row">
        <button className="cancel" onClick={handleCancel}>Cancel</button>
        <button className="save" onClick={handleSave}>Save</button>
      </div>

    </div>
  );
};

export default AddExperience;
