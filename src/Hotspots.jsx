

import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const hotspotsData = [
  { id: 1, area: "Hostel A", complaints: 12, level: "High", lastReported: "1 hour ago" },
  { id: 2, area: "Lab Block", complaints: 8, level: "Medium", lastReported: "3 hours ago" },
  { id: 3, area: "Cafeteria", complaints: 5, level: "Medium", lastReported: "Today" },
  { id: 4, area: "Parking Area", complaints: 2, level: "Low", lastReported: "Yesterday" },
];

function Hotspots() {
  return (
    <div className="hotspots-page">
      <h1>Hotspots</h1>

      <div className="hotspot-grid">
        {hotspotsData.map((spot) => (
          <div key={spot.id} className="hotspot-card">
            <span className={`badge ${spot.level.toLowerCase()}`}>{spot.level}</span>
            <h3><FaMapMarkerAlt /> {spot.area}</h3>
            <p>{spot.complaints} complaints • {spot.lastReported}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hotspots;
