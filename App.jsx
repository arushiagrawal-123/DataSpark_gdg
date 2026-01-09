import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Report from "./pages/Report";
import DashboardLayout from "./pages/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import Complaints from "./pages/Complaints";
import Hotspots from "./pages/Hotspots";


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
