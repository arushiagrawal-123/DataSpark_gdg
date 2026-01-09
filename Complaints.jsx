import React from "react";

import { useState } from "react";
import { FaUserCircle, FaClock } from "react-icons/fa";

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

  const filteredComplaints = complaintsData
    .filter((c) => (categoryFilter === "All" ? true : c.category === categoryFilter))
    .filter((c) => (priorityFilter === "All" ? true : c.priority === priorityFilter))
    .sort((a, b) => {
      const order = { High: 1, Medium: 2, Low: 3 };
      return order[a.priority] - order[b.priority];
    });

  return (
    <div className="complaints-page">
      <h1>Complaints</h1>

      {/* Filters */}
      <div className="filters">
        <select onChange={(e) => setCategoryFilter(e.target.value)}>
          <option>All</option>
          <option>Infrastructure</option>
          <option>Electricity</option>
          <option>Cleanliness</option>
        </select>

        <select onChange={(e) => setPriorityFilter(e.target.value)}>
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
            <span className={`badge ${c.priority.toLowerCase()}`}>{c.priority}</span>

            <h3>{c.title}</h3>
            <p className="meta">
              <FaUserCircle /> {c.reporter} &nbsp;|&nbsp; <FaClock /> {c.time} &nbsp;|&nbsp; {c.category}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Complaints;
