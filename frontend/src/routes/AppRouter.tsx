import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import LandingPage from "../pages/Landing/LandingPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import RepositoryPage from "../pages/Repository/RepositoryPage";
import ChatPage from "../pages/Chat/ChatPage";
import ArchitecturePage from "../pages/Architecture/ArchitecturePage";
import SettingsPage from "../pages/Setting/SettingPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/repositories" element={<RepositoryPage />} />
        <Route path="/analysis/new" element={<DashboardPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/architecture" element={<ArchitecturePage />} />
        <Route path="/settings" element={<SettingsPage />} />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}