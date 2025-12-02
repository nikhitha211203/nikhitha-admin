import React, { useState } from "react";
import "./AboutPage.css";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const navigate = useNavigate();

  // Profile Image
  const [profileImg, setProfileImg] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setProfileImg(URL.createObjectURL(file));
  };

  // Skills
  const [skills, setSkills] = useState(["Swift", "Python", "UI/UX Design", "JavaScript"]);
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (!newSkill.trim()) return;
    setSkills([...skills, newSkill]);
    setNewSkill("");
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  // Education
  const [education, setEducation] = useState([
    {
      title: "B.S. in Computer Science",
      university: "University of Technology",
      year: "2018 - 2022",
    },
  ]);

  const [newEdu, setNewEdu] = useState({
    title: "",
    university: "",
    year: "",
  });

  const addEducation = () => {
    if (!newEdu.title || !newEdu.university || !newEdu.year) return;
    setEducation([...education, newEdu]);
    setNewEdu({ title: "", university: "", year: "" });
  };

  const deleteEducation = (index) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    alert("Saved!");
    navigate("/dashboard");
  };

  return (
    <div className="about-wrapper">
      <h2 className="page-title">Edit About Me</h2>

      <form className="form-container">

        {/* PROFILE SECTION */}
        <div className="profile-section">
          <img
            src={profileImg || "https://i.pravatar.cc/200"}
            alt="profile"
            className="profile-photo"
          />

          <label className="upload-btn">
            Change Photo
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </label>
        </div>

        {/* FULL NAME */}
        <label className="form-label">Full Name</label>
        <input className="input-field" placeholder="Enter full name" />

        {/* ROLE */}
        <label className="form-label">Current Role</label>
        <input className="input-field" placeholder="Enter your role" />

        {/* SUMMARY */}
        <label className="form-label">Personal Summary</label>
        <textarea className="textarea-field" placeholder="Write a summary..."></textarea>

        {/* SKILLS */}
        <label className="form-label">Key Skills</label>
        <div className="skill-list">
          {skills.map((s, i) => (
            <span key={i} className="skill-chip">
              {s}
              <button onClick={() => removeSkill(s)}>✕</button>
            </span>
          ))}
        </div>

        <div className="skill-add-box">
          <input
            className="input-field"
            placeholder="Add new skill..."
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
          />
          <button type="button" className="add-btn" onClick={addSkill}>
            +
          </button>
        </div>

        {/* EDUCATION */}
        <label className="form-label">Education</label>

        {education.map((edu, index) => (
          <div className="education-card" key={index}>
            <div>
              <p className="edu-title">{edu.title}</p>
              <p className="edu-sub">{edu.university}</p>
              <p className="edu-year">{edu.year}</p>
            </div>
            <button
              type="button"
              className="edu-delete"
              onClick={() => deleteEducation(index)}
            >
              ⋮
            </button>
          </div>
        ))}

        <div className="edu-add-fields">
          <input
            className="input-field"
            placeholder="Course Title"
            value={newEdu.title}
            onChange={(e) => setNewEdu({ ...newEdu, title: e.target.value })}
          />
          <input
            className="input-field"
            placeholder="University"
            value={newEdu.university}
            onChange={(e) => setNewEdu({ ...newEdu, university: e.target.value })}
          />
          <input
            className="input-field"
            placeholder="Year Range (ex: 2018-2022)"
            value={newEdu.year}
            onChange={(e) => setNewEdu({ ...newEdu, year: e.target.value })}
          />
        </div>

        <button type="button" className="add-edu-btn" onClick={addEducation}>
          + Add Education
        </button>

        {/* PROFESSIONAL INTERESTS */}
        <label className="form-label">Professional Interests</label>
        <textarea className="textarea-field" placeholder="Write here..."></textarea>

        {/* SAVE / CANCEL BUTTONS AT BOTTOM */}
        <div className="bottom-btns">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/dashboard")}
          >
            Cancel
          </button>

          <button type="button" className="save-btn" onClick={handleSave}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AboutPage;
