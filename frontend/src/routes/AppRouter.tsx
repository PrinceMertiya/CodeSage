import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "../pages/Landing/LandingPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}