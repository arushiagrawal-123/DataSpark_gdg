import React, { useState, useEffect } from "react";
import { FaUserCircle, FaClock } from "react-icons/fa";
import axios from "axios";

function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  // ✅ Map for sorting priority
  const priorityMap = { High: 1, Medium: 2, Low: 3 };

  // ---------------- Fetch complaints from backend ----------------
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/complaints`)
      .then((res) => setComplaints(res.data))
      .catch((err) => console.error("❌ Fetch error:", err));
  }, []);

  // ---------------- Filter & sort complaints ----------------
  const filteredComplaints = complaints
    .filter(
      (c) =>
        (categoryFilter === "All" || c.category === categoryFilter) &&
        (priorityFilter === "All" || c.priority === priorityFilter)
    )
    .sort((a, b) => priorityMap[a.priority] - priorityMap[b.priority]);

  return (
    <div className="complaints-page">
      <h1>Complaints</h1>

      {/* Filters */}
      <div className="filters">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option>All</option>
          <option>Infrastructure</option>
          <option>Electricity</option>
          <option>Cleanliness</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option>All</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </div>

      {/* Complaint Cards */}
      <div className="complaints-list">
        {filteredComplaints.length === 0 ? (
          <p>No complaints found.</p>
        ) : (
          filteredComplaints.map((c) => (
            <div className="complaint-card" key={c.id}>
              <span className={`badge ${c.priority.toLowerCase()}`}>
                {c.priority}
              </span>
              <h3>{c.title}</h3>
              <p className="meta">
                <FaUserCircle /> {c.reporter || "Anonymous"} &nbsp;|&nbsp;
                <FaClock /> {c.time || "Unknown"} &nbsp;|&nbsp; {c.category}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Complaints;
