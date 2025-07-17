import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

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
      const result = await login(formData.email, formData.password);
      if (result.success) {
        if (result.user.role === "admin") {
          navigate("/overview");
        } else {
          setError("Access denied. Admin privileges required.");
        }
      } else {
        setError(result.error);
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
          <h1 className="login-title">Admin Login</h1>
          <p className="login-subtitle">Access the admin dashboard</p>
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
              placeholder="Enter admin email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="form-input"
              required
              placeholder="Enter admin password"
            />
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Please wait..." : "Sign In"}
          </button>
        </form>

        <div className="login-footer">
          <p className="login-link">
            <Link to="/login" className="text-button">
              Regular User Login
            </Link>
          </p>
        </div>

        <div className="demo-credentials">
          <h3>Demo Admin Credentials:</h3>
          <p>
            <strong>Admin:</strong> admin@example.com / admin123
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
