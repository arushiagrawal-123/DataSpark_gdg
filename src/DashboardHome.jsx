

import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";

const priorityData = [
  { name: "High", value: 18 },
  { name: "Medium", value: 46 },
  { name: "Low", value: 60 },
];

const hotspotData = [
  { name: "Hostel A", value: 12 },
  { name: "Lab Block", value: 8 },
  { name: "Cafeteria", value: 5 },
  { name: "Parking", value: 2 },
];

const COLORS = ["#ef4444", "#f59e0b", "#10b981", "#3b82f6"];

function DashboardHome() {
  return (
    <div className="dashboard-home">
      <h1>Welcome, Admin 👋</h1>

      <div className="kpi-grid">
        <div className="kpi-card"><h3>Total Complaints</h3><p>124</p></div>
        <div className="kpi-card high"><h3>High</h3><p>18</p></div>
        <div className="kpi-card medium"><h3>Medium</h3><p>46</p></div>
        <div className="kpi-card low"><h3>Low</h3><p>60</p></div>
      </div>

      <div className="charts-grid">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={priorityData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={hotspotData} dataKey="value" nameKey="name" outerRadius={90} label>
              {hotspotData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default DashboardHome;
