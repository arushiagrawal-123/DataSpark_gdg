// src/components/Hotspots.jsx
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Circle, Tooltip } from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";

// --------------------
// HARDCODED BASE HOTSPOTS
// --------------------
const BASE_HOTSPOTS = [
  {
    id: 1,
    name: "Main Academic Block",
    lat: 25.4921,
    lng: 81.8639,
    baseLevel: "high",
  },
  {
    id: 2,
    name: "Hostel Area",
    lat: 25.4938,
    lng: 81.8654,
    baseLevel: "medium",
  },
  {
    id: 3,
    name: "Sports Complex",
    lat: 25.4913,
    lng: 81.8618,
    baseLevel: "low",
  },
];

// --------------------
// VISUAL CONFIG
// --------------------
const levelConfig = {
  high: { color: "#ef4444", radius: 35, className: "hotspot-red", scale: 1.5 },
  medium: { color: "#f59e0b", radius: 28, className: "hotspot-yellow", scale: 1.3 },
  low: { color: "#3b82f6", radius: 22, className: "hotspot-blue", scale: 1.2 },
};

export default function Hotspots() {
  const [hotspots, setHotspots] = useState(BASE_HOTSPOTS);

  useEffect(() => {
    fetchComplaintsAndUpdateHotspots();
  }, []);

  const fetchComplaintsAndUpdateHotspots = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/complaints`);
      const complaints = res.data;

      // Count complaints near each hotspot
      const updated = BASE_HOTSPOTS.map((spot) => {
        const count = complaints.filter(
          (c) =>
            Math.abs(c.lat - spot.lat) < 0.002 &&
            Math.abs(c.lng - spot.lng) < 0.002
        ).length;

        return {
          ...spot,
          intensity: count,
        };
      });

      setHotspots(updated);
    } catch (err) {
      console.error("Failed to fetch complaints, using base hotspots only");
      setHotspots(BASE_HOTSPOTS);
    }
  };

  return (
    <div className="hotspots-page">
      <h1 className="text-2xl font-bold mb-2">Campus Hotspots</h1>
      <p className="text-gray-500 mb-4">
        Red = High | Yellow = Medium | Blue = Low
      </p>

      <MapContainer
        center={[25.4925, 81.8638]}
        zoom={16}
        style={{ height: "500px", width: "100%", borderRadius: "16px" }}
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {hotspots.map((spot) => {
          const config = levelConfig[spot.baseLevel];
          const extraRadius = (spot.intensity || 0) * 40;

          return (
            <Circle
              key={spot.id}
              center={[spot.lat, spot.lng]}
              radius={config.radius + extraRadius}
              pathOptions={{
                color: config.color,
                fillColor: config.color,
                fillOpacity: 0.35,
              }}
              className={config.className} // glow + ripple from CSS
            >
              <Tooltip>
                <strong>{spot.name}</strong>
                <br />
                Base Level: {spot.baseLevel.toUpperCase()}
                <br />
                Complaints nearby: {spot.intensity || 0}
              </Tooltip>
            </Circle>
          );
        })}
      </MapContainer>
    </div>
  );
}
