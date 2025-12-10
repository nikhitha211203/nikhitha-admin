import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddEducation.css";

const AddEducation = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    degree: "",
    institution: "",
    start: "",
    end: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!form.degree || !form.institution) {
      alert("Please fill in Degree and Institution");
      return;
    }

    try {
      const res = await fetch("/api/about");
      const data = await res.json();

      const newEdu = {
        degree: form.degree,
        institution: form.institution,
        year: `${form.start} - ${form.end || 'Present'}`,
        // Schema uses 'year' string, but UI uses start/end. Mapping to 'year' for consistency with backend schema.
      };

      const updatedData = {
        ...data,
        education: [...(data.education || []), newEdu]
      };

      await fetch("/api/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData)
      });

      alert("Education Saved!");
      navigate(-1);
    } catch (err) {
      console.error(err);
      alert("Failed to save education.");
    }
  };

  return (
    <div className="addedu-container">
      <span className="back-icon" onClick={() => navigate(-1)}>←</span>
      <h2>Add Education</h2>

      <label>Degree / Qualification</label>
      <input
        name="degree"
        placeholder="e.g. M.Sc. in Advanced Computer Science"
        value={form.degree}
        onChange={handleChange}
      />

      <label>Institution Name</label>
      <input
        name="institution"
        placeholder="e.g. Tech University"
        value={form.institution}
        onChange={handleChange}
      />

      <div className="date-row">
        <div>
          <label>Start Date</label>
          <input type="month" name="start" value={form.start} onChange={handleChange} />
        </div>

        <div>
          <label>End Date</label>
          <input type="month" name="end" value={form.end} onChange={handleChange} />
        </div>
      </div>

      <label>Description / Key Achievements</label>
      <textarea
        name="description"
        placeholder="Describe your modules, projects, achievements..."
        value={form.description}
        onChange={handleChange}
      />

      <div className="buttons-row">
        <button className="cancel" onClick={() => navigate(-1)}>
          Cancel
        </button>

        <button className="save" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default AddEducation;
