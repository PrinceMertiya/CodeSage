import { BrowserRouter, Routes, Route } from "react-router-dom";
// import LandingPage from "./pages/Landing/LandingPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import RepositoriesPage from "./pages/Repository/RepositoryPage.tsx";
import AnalysisPage from "./pages/Repository/AnalysisPage.tsx";
import RepositoryDetailsPage from "./pages/Repository/RepositoryDetailsPage.tsx";
import LoginPage from "./pages/Auth/LoginPage.tsx"
import SignupPage from "./pages/Auth/SignupPage.tsx"
import LandingPage from "./pages/Landing/LandingPage.tsx";

function App() {
  return (
    <BrowserRouter>
    <Routes>      <Route path="/" element={<LandingPage />} />

    <Route path="/login" element={<LoginPage />} />

    <Route path="/signup" element={<SignupPage />} />

    <Route path="/dashboard" element={<DashboardPage />} />

    <Route path="/repositories" element={<RepositoriesPage />} />

<Route path="/analysis" element={<AnalysisPage />} />

<Route
  path="/repositories/:id"
  element={<RepositoryDetailsPage />}
/>

<Route
  path="/repositories/:id/files"
  element={<RepositoryDetailsPage />}
/>

<Route
  path="/repositories/:id/architecture"
  element={<RepositoryDetailsPage />}
/>

<Route
  path="/repositories/:id/assistant"
  element={<RepositoryDetailsPage />}
/>

<Route
  path="/repositories/:id/insights"
  element={<RepositoryDetailsPage />}
/>

    <Route
        path="/repositories"
        element={<RepositoriesPage />}
    />

<Route
    path="/analysis"
    element={<AnalysisPage />}
/>

{/* <Route
    path="/repositories/:id"
    element={<RepositoryDetailsPage />}
/> */}

<Route
    path="/repositories/:id"
    element={<RepositoryDetailsPage />}
/>

</Routes>

    </BrowserRouter>

    

  );
}

export default App;