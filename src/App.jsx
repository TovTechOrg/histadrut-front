import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import NavPanel from "./components/NavPanel/NavPanel";
import Overview from "./components/Overview/Overview";
import Matches from "./components/Matches/Matches";
import Companies from "./components/Companies/Companies";
import JobsListings from "./components/JobsListings/JobsListings";
import Reporting from "./components/Reporting/Reporting";
import Login from "./components/Auth/Login";
import AdminLogin from "./components/Auth/AdminLogin";
import CVUpload from "./components/Auth/CVUpload";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import "./components/shared/Page.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/admin-login" element={<AdminLogin />} />

            {/* Protected routes */}
            <Route
              path="/cv-upload"
              element={
                <ProtectedRoute>
                  <CVUpload />
                </ProtectedRoute>
              }
            />
            <Route
              path="/matches"
              element={
                <ProtectedRoute>
                  <Matches />
                </ProtectedRoute>
              }
            />

            {/* Admin protected routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute requireAdmin>
                  <NavPanel />
                  <main className="main-content">
                    <Overview />
                  </main>
                </ProtectedRoute>
              }
            />
            <Route
              path="/overview"
              element={
                <ProtectedRoute requireAdmin>
                  <NavPanel />
                  <main className="main-content">
                    <Overview />
                  </main>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/matches"
              element={
                <ProtectedRoute requireAdmin>
                  <NavPanel />
                  <main className="main-content">
                    <Matches />
                  </main>
                </ProtectedRoute>
              }
            />
            <Route
              path="/companies"
              element={
                <ProtectedRoute requireAdmin>
                  <NavPanel />
                  <main className="main-content">
                    <Companies />
                  </main>
                </ProtectedRoute>
              }
            />
            <Route
              path="/jobs-listings"
              element={
                <ProtectedRoute requireAdmin>
                  <NavPanel />
                  <main className="main-content">
                    <JobsListings />
                  </main>
                </ProtectedRoute>
              }
            />
            <Route
              path="/reporting"
              element={
                <ProtectedRoute requireAdmin>
                  <NavPanel />
                  <main className="main-content">
                    <Reporting />
                  </main>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
