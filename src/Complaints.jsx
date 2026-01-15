import React, { useState, useEffect } from "react";
import { FaUserCircle, FaClock } from "react-icons/fa";
import axios from "axios";

const complaintsData = [
  {
    id: 1,
    title: "Water leakage in Hostel A",
    category: "Infrastructure",
    priority: "High",
    reporter: "Ravi Kumar",
    time: "2 hours ago",
  },
  {
    id: 2,
    title: "Power failure in Lab 3",
    category: "Electricity",
    priority: "High",
    reporter: "Anjali Singh",
    time: "5 hours ago",
  },
  {
    id: 3,
    title: "Dirty washrooms near C block",
    category: "Cleanliness",
    priority: "Medium",
    reporter: "Suresh Patel",
    time: "Today",
  },
  {
    id: 4,
    title: "Broken classroom chair",
    category: "Infrastructure",
    priority: "Low",
    reporter: "Neha Sharma",
    time: "Yesterday",
  },
];

function Complaints() {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  // ✅ Map for sorting priority
  const priorityMap = { High: 1, Medium: 2, Low: 3 };

  const filteredComplaints = complaintsData
    .filter(
      (c) =>
        (categoryFilter === "All" || c.category === categoryFilter) &&
        (priorityFilter === "All" || c.priority === priorityFilter)
    )
    .sort((a, b) => priorityMap[a.priority] - priorityMap[b.priority]);

  // 🔁 Send filtered complaints to ML pipeline
  useEffect(() => {
    if (filteredComplaints.length === 0) return;

    const mlPayload = filteredComplaints.map((c) => ({
      description: c.title, // used by TF-IDF
      repeat_count:
        c.priority === "High" ? 2 : c.priority === "Medium" ? 1 : 0,
      unsafe_flag: c.category === "Infrastructure" ? 1 : 0,
    }));

    axios
      .post(
        "https://unpunishable-vickey-unexpansively.ngrok-free.dev/ml_input",
        mlPayload,
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        console.log("✅ ML Backend response:", res.data);
      })
      .catch((err) => {
        console.error("❌ ML Backend error:", err);
      });
  }, [filteredComplaints]);

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
        {filteredComplaints.map((c) => (
          <div className="complaint-card" key={c.id}>
            <span className={`badge ${c.priority.toLowerCase()}`}>
              {c.priority}
            </span>
            <h3>{c.title}</h3>
            <p className="meta">
              <FaUserCircle /> {c.reporter} &nbsp;|&nbsp;
              <FaClock /> {c.time} &nbsp;|&nbsp; {c.category}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Complaints;
