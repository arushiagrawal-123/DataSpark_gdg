import React, { useState, useEffect } from "react";
import { FaUserCircle, FaClock } from "react-icons/fa";
import axios from "axios";

function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const priorityMap = { High: 1, Medium: 2, Low: 3 };

<<<<<<< HEAD
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

=======
  // ---------------- Fetch complaints from backend ----------------
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/complaints`)
      .then((res) => setComplaints(res.data))
      .catch((err) => console.error("❌ Fetch error:", err));
  }, []);

  // ---------------- Filter & sort complaints ----------------
>>>>>>> 4d6750ed7c951e65b3252104af2beedab70f6525
  const filteredComplaints = complaints
    .filter(
      (c) =>
        (categoryFilter === "All" || c.category === categoryFilter) &&
        (priorityFilter === "All" || c.priority === priorityFilter)
    )
<<<<<<< HEAD
    .sort((a, b) => (priorityMap[a.priority] || 3) - (priorityMap[b.priority] || 3));
=======
    .sort((a, b) => priorityMap[a.priority] - priorityMap[b.priority]);
>>>>>>> 4d6750ed7c951e65b3252104af2beedab70f6525

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
<<<<<<< HEAD
              <span className={`badge ${c.priority.toLowerCase()}`}>{c.priority}</span>
              <h3>{c.title}</h3>
              <p className="meta">
                <FaUserCircle /> {c.reporter} &nbsp;|&nbsp;
                <FaClock /> {c.time} &nbsp;|&nbsp; {c.category}
=======
              <span className={`badge ${c.priority.toLowerCase()}`}>
                {c.priority}
              </span>
              <h3>{c.title}</h3>
              <p className="meta">
                <FaUserCircle /> {c.reporter || "Anonymous"} &nbsp;|&nbsp;
                <FaClock /> {c.time || "Unknown"} &nbsp;|&nbsp; {c.category}
>>>>>>> 4d6750ed7c951e65b3252104af2beedab70f6525
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Complaints;
