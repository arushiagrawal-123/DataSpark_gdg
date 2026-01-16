import { useState, useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";

const API_URL = "http://localhost:5000";

export default function Hotspots() {
  const [hotspots, setHotspots] = useState([]);

  const fetchHotspots = async () => {
    const res = await axios.get(`${API_URL}/complaints`);
    const complaints = res.data.filter(c => c.hotspot);

    const locationMap = {};
    complaints.forEach(c => {
      const loc = c.location || "Unknown";
      if (!locationMap[loc]) locationMap[loc] = { complaints: 0, level: "Low", lastReported: "" };
      locationMap[loc].complaints += 1;
      if (c.severity >= 3) locationMap[loc].level = "High";
      else if (c.severity === 2 && locationMap[loc].level !== "High") locationMap[loc].level = "Medium";
      const cTime = c.time;
      if (!locationMap[loc].lastReported || new Date(cTime) > new Date(locationMap[loc].lastReported)) {
        locationMap[loc].lastReported = cTime;
      }
    });

    setHotspots(Object.entries(locationMap).map(([area, info], i) => ({ id: i + 1, area, ...info })));
  };

  useEffect(() => {
    fetchHotspots();
    const interval = setInterval(fetchHotspots, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Hotspots</h1>
      {hotspots.length === 0 ? <p>No hotspots found</p> :
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {hotspots.map(h => (
            <div key={h.id} className="p-4 bg-white rounded-lg shadow-md">
              <h3><FaMapMarkerAlt className="inline mr-2" />{h.area}</h3>
              <p>{h.complaints} complaints • Level: {h.level}</p>
              <p className="text-sm text-gray-500">Last reported: {h.lastReported}</p>
            </div>
          ))}
        </div>}
    </div>
  );
}
