import React, { useState, useEffect } from "react";
import "./AboutPage.css";
import { useNavigate } from "react-router-dom";
import API_URL from "../config";

const AboutPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    role: "",
    bio: "",
    profileUrl: "",
    email: "",
    phone: ""
  });

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const res = await fetch(`${API_URL}/api/about`);
      const data = await res.json();
      if (data) {
        setFormData({
          fullName: data.fullName || "",
          role: data.role || "",
          bio: data.bio || "",
          profileUrl: data.profileUrl || "",
          email: data.email || "",
          phone: data.phone || ""
        });
      }
    } catch (err) {
      console.error("Error loading about data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`${API_URL}/api/about`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile.");
      }
    } catch (err) {
      console.error("Error saving profile:", err);
    }
  };

  return (
    <div className="about-wrapper">
      <div className="page-header" style={{ width: '100%', maxWidth: '520px', display: 'flex', justifyContent: 'space-between' }}>
        <h2 className="page-title">Edit About Me</h2>
        <button className="save-btn" style={{ padding: '5px 15px' }} onClick={() => navigate("/skills")}>Manage Skills &rarr;</button>
      </div>

      {loading ? <p>Loading...</p> : (
        <form className="form-container" onSubmit={(e) => e.preventDefault()}>

          {/* Profile Image URL (Simplified for now, file upload requires backend upload logic like Multer) */}
          <label className="form-label">Profile Image URL</label>
          <input
            className="input"
            name="profileUrl"
            value={formData.profileUrl}
            onChange={handleChange}
            placeholder="https://..."
          />
          {formData.profileUrl && <img src={formData.profileUrl} alt="Profile" className="profile-img" style={{ display: 'block', margin: '0 auto 20px' }} />}

          {/* Full Name */}
          <label className="form-label">Full Name</label>
          <input
            className="input"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter full name"
          />

          {/* Role */}
          <label className="form-label">Current Role</label>
          <input
            className="input"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Your role"
          />

          {/* Bio */}
          <label className="form-label">Bio</label>
          <textarea
            className="textarea"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Your biography..."
          />

          {/* Contact Details */}
          <label className="form-label">Email</label>
          <input className="input" name="email" value={formData.email} onChange={handleChange} />

          <label className="form-label">Phone</label>
          <input className="input" name="phone" value={formData.phone} onChange={handleChange} />

          {/* Removed Education and Experience sections */}

          {/* Bottom Buttons */}
          <div className="bottom-btns">
            <button type="button" className="cancel-btn" onClick={() => navigate("/dashboard")}>Cancel</button>
            <button type="button" className="save-btn" onClick={handleSave}>Save Changes</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AboutPage;
