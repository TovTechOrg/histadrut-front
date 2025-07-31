import Profile from "./components/Profile";
import "./App.css";
import SignUp from "./components/Auth/SignUp";
import NewPasswordPage from "./components/Auth/NewPasswordPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import NavPanel from "./components/NavPanel/NavPanel";
import Overview from "./components/Overview/Overview";
import Matches from "./components/Matches/Matches";
import Companies from "./components/Companies/Companies";
import AdminUsers from "./components/Auth/AdminUsers";
import JobsListings from "./components/JobsListings/JobsListings";
import Reporting from "./components/Reporting/Reporting";
import Login from "./components/Auth/Login";
// ...existing code...
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
            <Route path="/signup" element={<SignUp />} />
            <Route path="/reset_password/:token" element={<NewPasswordPage />} />
            // ...existing code...
            {/* Protected routes */}
            <Route
              path="/cv-upload"
              element={
                <ProtectedRoute>
                  <CVUpload />
                </ProtectedRoute>
              }
            />
            {/* User protected routes */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <NavPanel />
                  <main className="main-content">
                    <Profile />
                  </main>
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/matches"
              element={
                <ProtectedRoute>
                  <NavPanel />
                  <main className="main-content">
                    <Matches />
                  </main>
                </ProtectedRoute>
              }
            />
            {/* Redirect old routes */}
            <Route
              path="/matches"
              element={<Navigate to="/user/matches" replace />}
            />
            <Route
              path="/jobs"
              element={<Navigate to="/jobs-listings" replace />}
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
              path="/jobs-listings"
              element={
                <ProtectedRoute>
                  <NavPanel />
                  <main className="main-content">
                    <JobsListings />
                  </main>
                </ProtectedRoute>
              }
            />
            <Route
              path="/companies"
              element={
                <ProtectedRoute>
                  <NavPanel />
                  <main className="main-content">
                    <Companies />
                  </main>
                </ProtectedRoute>
              }
            />
            <Route
              path="/reporting"
              element={
                <ProtectedRoute>
                  <NavPanel />
                  <main className="main-content">
                    <Reporting />
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
              path="/admin/users"
              element={
                <ProtectedRoute requireAdmin>
                  <NavPanel />
                  <main className="main-content">
                    <AdminUsers />
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
