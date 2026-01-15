
import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <h2>Admin</h2>
        <ul>
          <li><NavLink to="/dashboard" end>Dashboard</NavLink></li>
          <li><NavLink to="/dashboard/complaints">Complaints</NavLink></li>
          <li><NavLink to="/dashboard/hotspots">Hotspots</NavLink></li>
        </ul>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;

