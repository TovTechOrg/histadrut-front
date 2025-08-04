import React, { useState } from "react";
import ResetPasswordModal from "./ResetPasswordModal";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const remembered = localStorage.getItem("rememberMe") === "true";
  const [rememberMe, setRememberMe] = useState(remembered);
  const [formData, setFormData] = useState({
    email: remembered ? localStorage.getItem("rememberedEmail") || "" : "",
    password: remembered
      ? localStorage.getItem("rememberedPassword") || ""
      : "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const [showResetModal, setShowResetModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await login(formData.email, formData.password);
      console.log("🔍 Login: login result:", result);
      
      if (result.status === 200 && result.data?.user_authenticated) {
        console.log("🔍 Login: Authentication successful");
        
        // Save credentials only if rememberMe is checked
        if (rememberMe) {
          localStorage.setItem("rememberMe", "true");
          localStorage.setItem("rememberedEmail", formData.email);
          localStorage.setItem("rememberedPassword", formData.password);
        } else {
          localStorage.setItem("rememberMe", "false");
          localStorage.removeItem("rememberedEmail");
          localStorage.removeItem("rememberedPassword");
        }
        
        // Redirect based on role
        if ((result.data.role || "user") === "admin") {
          console.log("🔍 Login: Admin user, navigating to overview");
          navigate("/overview");
        } else {
          console.log("🔍 Login: Regular user, navigating to user/matches");
          navigate("/user/matches");
        }
      } else {
        let msg = result.data?.error || result.data?.message || "Login failed";
        if (msg === "User authentication failed" || msg.toLowerCase().includes("authentication failed")) {
          msg = "User or password not found. Please check your credentials.";
        }
        setError(msg);
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1 className="login-title">Sign In</h1>
          <p className="login-subtitle">Access your job matches and CV</p>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-input light-input"
              required
              placeholder="Enter your email"
              autoComplete="username"
              style={{ background: "#fff", color: "#222" }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="form-input light-input"
                required
                placeholder="Enter your password"
                autoComplete="new-password"
                style={{ background: "#fff", color: "#222", paddingRight: "40px" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                  color: "#666"
                }}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>
          <div className="form-group remember-me-group">
            <label
              className="remember-me-label"
              style={{ color: "#222", fontWeight: 500 }}
            >
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={handleRememberMeChange}
                style={{ accentColor: "#2196f3", background: "#fff" }}
              />
              <span style={{ marginLeft: 8 }}>Remember me</span>
            </label>
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Please wait..." : "Sign In"}
          </button>
        </form>
        <div style={{ textAlign: "right", marginTop: 8 }}>
          <button
            type="button"
            className="text-button"
            style={{ background: "none", border: "none", color: "#2196f3", cursor: "pointer", fontWeight: 500, padding: 0 }}
            onClick={() => setShowResetModal(true)}
          >
            Forgot password?
          </button>
        </div>

        <div className="login-footer">
          <p className="login-link">
            Don't have an account?{" "}
            <Link to="/signup" className="text-button">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
      {/* Move modal outside login-container */}
      <ResetPasswordModal isOpen={showResetModal} onClose={() => setShowResetModal(false)} />
    </div>
  );
};

export default Login;
