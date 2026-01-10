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
      <div className="dashboard-header">
        <h1>Welcome, Admin 👋</h1>
        <p>Here’s what’s happening on campus today</p>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card"><h3>Total Complaints</h3><p>124</p></div>
        <div className="kpi-card high"><h3>High</h3><p>18</p></div>
        <div className="kpi-card medium"><h3>Medium</h3><p>46</p></div>
        <div className="kpi-card low"><h3>Low</h3><p>60</p></div>
      </div>

      {/* Charts */}
      <div className="charts-section">
        <h2>📊 Complaint Analytics</h2>
        <div className="charts-grid">

          <div className="chart-card">
            <h3>Priority Distribution</h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={priorityData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#7678e3ff" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h3>Hotspot Areas</h3>
            <ResponsiveContainer width="100%" height={240}>
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
      </div>
    </div>
  );
}

export default DashboardHome;
