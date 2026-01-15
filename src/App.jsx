import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import Report from "./Report";
import DashboardLayout from "./DashboardLayout";
import DashboardHome from "./DashboardHome";
import Complaints from "./Complaints";
import Hotspots from "./Hotspots";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/report" element={<Report />} />

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="complaints" element={<Complaints />} />
        <Route path="hotspots" element={<Hotspots />} />
      </Route>
    </Routes>
  );
}

export default App;
