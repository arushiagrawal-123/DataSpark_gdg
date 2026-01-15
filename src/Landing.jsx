import React from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <div className="hero-card">
        <h1>Smart Campus Issue Prioritization</h1>
        <p className="subtitle">
          AI-powered platform to report and resolve campus issues faster
        </p>

        <ul className="features">
          <li>⚡ Faster issue resolution</li>
          <li>🧠 AI-based priority assignment</li>
          <li>📊 Real-time admin analytics</li>
        </ul>

        <div className="btn-group">
          <button className="primary" onClick={() => navigate("/report")}>
            Report Issue
          </button>
          <button className="secondary" onClick={() => navigate("/dashboard")}>
            Admin Dashboard
          </button>
        </div>

        <p className="footer-text">Making campus management smarter</p>
      </div>
    </div>
  );
}

export default Landing;