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
  const [skills, setSkills] = useState(["React", "Python", "UI/UX"]);
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
      title: "BCA Computer Science",
      university: "ABC University",
      year: "2019 - 2022",
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

  const deleteEducation = (i) => {
    setEducation(education.filter((_, index) => index !== i));
  };

  return (
    <div className="about-wrapper">
      <h2 className="page-title">Edit About Me</h2>

      <form className="form-container">
        {/* Profile Section */}
        <div className="profile-section">
          <img
            src={profileImg || "https://i.pravatar.cc/200"}
            className="profile-img"
            alt="profile"
          />
          <label className="upload-btn">
            Change Photo
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </label>
        </div>

        {/* Full Name */}
        <label className="form-label">Full Name</label>
        <input className="input" placeholder="Enter full name" />

        {/* Role */}
        <label className="form-label">Current Role</label>
        <input className="input" placeholder="Your role" />

        {/* Summary */}
        <label className="form-label">Summary</label>
        <textarea className="textarea" placeholder="Your summary..." />

        {/* Skills */}
        <label className="form-label">Skills</label>
        <div className="skill-list">
          {skills.map((s, i) => (
            <span className="skill-chip" key={i}>
              {s}
              <button onClick={() => removeSkill(s)}>✕</button>
            </span>
          ))}
        </div>

        <div className="skill-add-box">
          <input
            className="input"
            placeholder="Add skill..."
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
          />
          <button type="button" className="add-btn" onClick={addSkill}>
            +
          </button>
        </div>

        {/* Education */}
        <label className="form-label">Education</label>

        {education.map((e, i) => (
          <div className="education-card" key={i}>
            <div>
              <p className="edu-title">{e.title}</p>
              <p className="edu-sub">{e.university}</p>
              <p className="edu-year">{e.year}</p>
            </div>
            <button className="edu-delete" onClick={() => deleteEducation(i)}>
              ⋮
            </button>
          </div>
        ))}

        <div className="edu-add-box">
          <input
            className="input"
            placeholder="Course Title"
            value={newEdu.title}
            onChange={(e) => setNewEdu({ ...newEdu, title: e.target.value })}
          />
          <input
            className="input"
            placeholder="University"
            value={newEdu.university}
            onChange={(e) => setNewEdu({ ...newEdu, university: e.target.value })}
          />
          <input
            className="input"
            placeholder="Year (ex: 2019-2022)"
            value={newEdu.year}
            onChange={(e) => setNewEdu({ ...newEdu, year: e.target.value })}
          />

          <button className="add-edu-btn" onClick={addEducation}>
            + Add Education
          </button>
        </div>

        {/* Interests */}
        <label className="form-label">Professional Interests</label>
        
        <textarea className="textarea" placeholder="Write here..." />

        {/* Bottom Buttons */}
        <div className="bottom-btns">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/dashboard")}
          >
            Cancel
          </button>

          <button type="button" className="save-btn">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AboutPage;
