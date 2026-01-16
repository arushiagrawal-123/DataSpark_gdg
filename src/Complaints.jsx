import React, { useState, useEffect } from "react";
import { FaUserCircle, FaClock } from "react-icons/fa";
import axios from "axios";

function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const priorityMap = { High: 1, Medium: 2, Low: 3 };

  // ---------------- Fetch complaints ----------------
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        // Make sure your .env has VITE_BACKEND_URL=http://localhost:5000
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/complaints`);
        if (Array.isArray(res.data)) {
          setComplaints(
            res.data.map((c) => ({
              ...c,
              priority: c.priority || "Low",
              reporter: c.reporter || "Anonymous",
              time: c.time || "Unknown",
            }))
          );
        }
      } catch (err) {
        console.error("❌ Fetch error:", err);
        setComplaints([]);
      }
    };

    fetchComplaints();
  }, []);

  const filteredComplaints = complaints
    .filter(
      (c) =>
        (categoryFilter === "All" || c.category === categoryFilter) &&
        (priorityFilter === "All" || c.priority === priorityFilter)
    )
    .sort((a, b) => (priorityMap[a.priority] || 3) - (priorityMap[b.priority] || 3));

  return (
    <div className="complaints-page">
      <h1>Complaints</h1>

      <div className="filters">
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option>All</option>
          <option>Infrastructure</option>
          <option>Electricity</option>
          <option>Cleanliness</option>
        </select>

        <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
          <option>All</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </div>

      <div className="complaints-list">
        {filteredComplaints.length === 0 ? (
          <p>No complaints found.</p>
        ) : (
          filteredComplaints.map((c) => (
            <div className="complaint-card" key={c.id}>
              <span className={`badge ${c.priority.toLowerCase()}`}>{c.priority}</span>
              <h3>{c.title}</h3>
              <p className="meta">
                <FaUserCircle /> {c.reporter} &nbsp;|&nbsp;
                <FaClock /> {c.time} &nbsp;|&nbsp; {c.category}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Complaints;
