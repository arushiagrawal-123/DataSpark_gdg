import React from "react";


import { NavLink, Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Admin</h2>
        <ul>
          <li>
            <NavLink to="/dashboard" end className="nav-link">
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/complaints" className="nav-link">
              Complaints
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/hotspots" className="nav-link">
              Hotspots
            </NavLink>
          </li>
        </ul>
      </aside>

      {/* Main content changes here */}
      <main className="main-content">
        <Outlet />
      </main>

    </div>
  );
}

export default DashboardLayout;
