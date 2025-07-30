import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { setNewPassword } from "../../api/resetPassword";
import { useAuth } from "../../contexts/AuthContext";
import "./Login.css";

const NewPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  // Assume email is passed via location.state
  const email = location.state?.email || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      await setNewPassword(email, password);
      // Log in with new password
      await login(email, password);
      navigate("/matches");
    } catch (err) {
      setError(err.message || "Failed to set new password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-title">Set New Password</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="new-password">New Password</label>
          <input
            id="new-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            required
            placeholder="Enter new password"
            style={{ background: "#fff", color: "#222" }}
          />
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="form-input"
            required
            placeholder="Confirm new password"
            style={{ background: "#fff", color: "#222", marginBottom: "1.2rem" }}
          />
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Setting..." : "Set Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPasswordPage;
