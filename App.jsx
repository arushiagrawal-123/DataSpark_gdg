import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./Landing";
import Report from "./Report";
import DashboardLayout from "./DashboardLayout";
import DashboardHome from "./DashboardHome";
import Complaints from "./Complaints";
import Hotspots from "./Hotspots";



function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/report" element={<Report />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          {/* 👇 THIS LINE IS MUST */}
          <Route index element={<DashboardHome />} />

          <Route path="complaints" element={<Complaints />} />
          <Route path="hotspots" element={<Hotspots />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
