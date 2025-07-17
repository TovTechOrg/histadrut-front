import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isClaimProfile, setIsClaimProfile] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { login, signUp, claimProfile } = useAuth();
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
      if (isClaimProfile) {
        const result = await claimProfile(formData.email);
        if (result.success) {
          setMessage(
            "Verification email sent! Check your email to set a password."
          );
        } else {
          setError(result.error);
        }
      } else if (isSignUp) {
        if (!formData.name.trim()) {
          setError("Name is required");
          return;
        }
        const result = await signUp(
          formData.email,
          formData.password,
          formData.name
        );
        if (result.success) {
          navigate("/cv-upload");
        } else {
          setError(result.error);
        }
      } else {
        const result = await login(formData.email, formData.password);
        if (result.success) {
          if (result.user.hasCV) {
            // Navigate based on user role
            if (result.user.role === "admin") {
              navigate("/admin/matches");
            } else {
              navigate("/user/matches");
            }
          } else {
            navigate("/cv-upload");
          }
        } else {
          setError(result.error);
        }
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ email: "", password: "", name: "" });
    setError("");
    setMessage("");
  };

  const switchToSignUp = () => {
    setIsSignUp(true);
    setIsClaimProfile(false);
    resetForm();
  };

  const switchToLogin = () => {
    setIsSignUp(false);
    setIsClaimProfile(false);
    resetForm();
  };

  const switchToClaimProfile = () => {
    setIsClaimProfile(true);
    setIsSignUp(false);
    resetForm();
  };

  const handleDemoUserLogin = async () => {
    setLoading(true);
    setError("");

    // Clear form data to prevent interference
    setFormData({ email: "", password: "", name: "" });

    try {
      const result = await login("user@example.com", "password123");

      if (result.success) {
        if (result.user.hasCV) {
          // Navigate based on user role
          if (result.user.role === "admin") {
            navigate("/admin/matches");
          } else {
            navigate("/user/matches");
          }
        } else {
          navigate("/cv-upload");
        }
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1 className="login-title">
            {isClaimProfile
              ? "Claim Your Profile"
              : isSignUp
              ? "Sign Up"
              : "Sign In"}
          </h1>
          <p className="login-subtitle">
            {isClaimProfile
              ? "Enter your email to claim your existing CV and results"
              : isSignUp
              ? "Create your account to get started"
              : "Access your job matches and CV"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}
          {message && <div className="success-message">{message}</div>}

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
            />
          </div>

          {!isClaimProfile && (
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
                placeholder="Enter your password"
              />
            </div>
          )}

          {isSignUp && (
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-input"
                required
                placeholder="Enter your full name"
              />
            </div>
          )}

          <button type="submit" className="login-button" disabled={loading}>
            {loading
              ? "Please wait..."
              : isClaimProfile
              ? "Send Verification Email"
              : isSignUp
              ? "Sign Up"
              : "Sign In"}
          </button>
        </form>

        {!isClaimProfile && !isSignUp && (
          <div className="demo-section">
            <button
              onClick={handleDemoUserLogin}
              className="demo-login-button"
              disabled={loading}
            >
              {loading ? "Please wait..." : "Quick Demo User Login"}
            </button>
          </div>
        )}

        <div className="login-footer">
          {!isClaimProfile && !isSignUp && (
            <>
              <p className="login-link">
                Don't have an account?{" "}
                <button onClick={switchToSignUp} className="text-button">
                  Sign Up
                </button>
              </p>
              <p className="login-link">
                <button onClick={switchToClaimProfile} className="text-button">
                  Already uploaded a CV? Claim your results
                </button>
              </p>
            </>
          )}

          {isSignUp && (
            <p className="login-link">
              Already have an account?{" "}
              <button onClick={switchToLogin} className="text-button">
                Sign In
              </button>
            </p>
          )}

          {isClaimProfile && (
            <p className="login-link">
              <button onClick={switchToLogin} className="text-button">
                Back to Sign In
              </button>
            </p>
          )}
        </div>

        <div className="demo-credentials">
          <h3>Demo Credentials:</h3>
          <p>
            <strong>User:</strong> user@example.com / password123
          </p>
          <p>
            <strong>Admin:</strong> <Link to="/admin-login">Admin Login</Link>
          </p>
          <button
            onClick={() => {
              setFormData({
                email: "user@example.com",
                password: "password123",
                name: "",
              });
              setError("");
            }}
            className="text-button"
            type="button"
          >
            Fill Demo User Credentials
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
