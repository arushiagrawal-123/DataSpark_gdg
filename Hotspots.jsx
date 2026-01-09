import React from "react";

import { FaMapMarkerAlt } from "react-icons/fa";

const hotspotsData = [
  { id: 1, area: "Hostel A", complaints: 12, level: "High", lastReported: "1 hour ago" },
  { id: 2, area: "Lab Block", complaints: 8, level: "Medium", lastReported: "3 hours ago" },
  { id: 3, area: "Cafeteria", complaints: 5, level: "Medium", lastReported: "Today" },
  { id: 4, area: "Parking Area", complaints: 2, level: "Low", lastReported: "Yesterday" },
];

const COLORS = ["#ef4444", "#f59e0b", "#10b981", "#3b82f6"];

function Hotspots() {
  return (
    <div className="hotspots-page">
      <h1>Hotspots</h1>
      <p className="subtitle">Areas with frequent complaints based on AI prioritization</p>

      <div className="hotspot-grid">
        {hotspotsData.map((spot, idx) => (
          <div className="hotspot-card" key={spot.id}>
            <span className={`badge ${spot.level.toLowerCase()}`}>{spot.level}</span>
            <h3><FaMapMarkerAlt /> {spot.area}</h3>
            <p>{spot.complaints} complaints • Last reported: {spot.lastReported}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hotspots;

