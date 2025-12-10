import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import API_URL from "./config";

const IconEmail = () => (
  <svg width="22" height="22" fill="#94A3B8" viewBox="0 0 24 24">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm8 7 8-5H4l8 5zm0 2-8-5v10h16V8l-8 5z" />
  </svg>
);

const IconLock = () => (
  <svg width="22" height="22" fill="#94A3B8" viewBox="0 0 24 24">
    <path d="M12 2a5 5 0 00-5 5v3H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2v-9a2 2 0 00-2-2h-2V7a5 5 0 00-5-5zm-3 8V7a3 3 0 016 0v3H9zm3 4a2 2 0 110 4 2 2 0 010-4z" />
  </svg>
);

const EyeOpen = () => (
  <svg width="24" height="24" fill="none" stroke="#94A3B8" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeClosed = () => (
  <svg width="24" height="24" fill="none" stroke="#94A3B8" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M17.94 17.94A10.94 10.94 0 0112 20C5 20 1 12 1 12a21.81 21.81 0 015.17-5.94" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const FingerprintIcon = () => (
  <svg width="24" height="24" fill="#fff" viewBox="0 0 24 24">
    <path d="M12 1a7 7 0 017 7v3a1 1 0 11-2 0V8a5 5 0 00-10 0v3a1 1 0 11-2 0V8a7 7 0 017-7zm0 7a3 3 0 013 3v3a1 1 0 11-2 0v-3a1 1 0 00-2 0v3a1 1 0 11-2 0v-3a3 3 0 013-3zm0 8a1 1 0 011 1c0 2.761 2.239 5 5 5a1 1 0 010 2c-3.859 0-7-3.141-7-7a1 1 0 011-1z" />
  </svg>
);


const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("isLoggedIn", "true");
        // We might want to store token if we weren't using httpOnly cookies, 
        // but for now relying on cookie is good for browser, 
        // however if we want to confirm validity we should check /api/auth/user
        navigate("/dashboard");
      } else {
        setError(data.msg || "Invalid email or password!");
      }
    } catch (err) {
      setError("Server Error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1 className="title">Portfolio Admin</h1>
      <p className="subtitle">Sign in to manage your content.</p>

      <div className="login-box">

        {error && <p className="error-text">{error}</p>}

        <label className="label">Email Address</label>
        <div className="input-box">
          <IconEmail />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <label className="label">Password</label>
        <div className="input-box">
          <IconLock />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="toggle-icon" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeClosed /> : <EyeOpen />}
          </span>
        </div>

        <button className="login-btn" onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </button>
      </div>
    </div>
  );
};

export default Login;
