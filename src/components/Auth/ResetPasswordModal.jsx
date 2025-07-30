import React, { useState } from "react";
import Modal from "../shared/Modal";
import "./Login.css";
import { resetPassword } from "../../api/resetPassword";

const ResetPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      await resetPassword(email);
      setSuccess(true);
    } catch (err) {
      setError(err.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="" maxWidth="500px" className="reset-modal">
      <div className="reset-password-modal">
        <h2 className="reset-password-title">Reset Password</h2>
        {success ? (
          <div className="success-message reset-password-success">Check your email for a reset link.</div>
        ) : (
          <form onSubmit={handleSubmit} className="reset-password-form">
            <label htmlFor="reset-email" className="reset-password-label">Email</label>
            <input
              id="reset-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input reset-password-input"
              placeholder="Enter your email"
            />
            {error && <div className="error-message" style={{ color: "#c00", marginBottom: 10 }}>{error}</div>}
            <button
              type="submit"
              className="login-button reset-password-btn"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        )}
      </div>
    </Modal>
  );
};

export default ResetPasswordModal;
