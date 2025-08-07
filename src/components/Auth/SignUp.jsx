import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (!formData.name.trim()) {
        setError("Name is required.");
        setLoading(false);
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match.");
        setLoading(false);
        return;
      }
      const result = await signUp(
        formData.email,
        formData.password,
        formData.name
      );
      
      if (result.status === 201) {
        setError("");
        navigate("/cv-upload");
      } else {
        setError(result.data?.message || "Registration failed");
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
          <h1 className="login-title">Sign Up</h1>
          <p className="login-subtitle">Create your account to get started</p>
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
              className="form-input"
              required
              placeholder="Enter your email"
              autoComplete="off"
              style={{ background: "#fff", color: "#222" }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="form-input"
              required
              placeholder="Enter your name"
              autoComplete="off"
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
                className="form-input"
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
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="form-input"
              required
              placeholder="Re-enter your password"
              autoComplete="new-password"
            style={{ background: "#fff", color: "#222" }}
            />
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Please wait..." : "Sign Up"}
          </button>
        </form>
        
        <div className="login-footer">
          <p className="login-link">
            Already have an account?{" "}
            <Link to="/login" className="text-button">
              Sign In
            </Link>
          </p>
        </div>

        {/* Cookie warning message - moved to bottom */}
        <div style={{
          textAlign: "center",
          marginTop: "16px",
          padding: "8px",
          fontSize: "0.85rem",
          color: "#666",
          lineHeight: "1.4"
        }}>
          ⚠️ This site requires third-party cookies to log in. Please enable them in your browser settings.
        </div>
      </div>
    </div>
  );
};

export default SignUp;
