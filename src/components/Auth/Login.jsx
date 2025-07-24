import React, { useState } from "react";
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
  const { setUser } = useAuth();
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
      console.log("Login result:", result);
      console.log("Login result.data:", result.data);
      console.log("Login result.data.user:", result.data?.user);
      if (result.status === 200 && result.data?.user_authenticated) {
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
        // Set user in context using role from response
        setUser({
          email: result.data.email,
          role: result.data.role || "user",
          hasCV: result.data.hasCV || false,
        });
        // Redirect based on role
        if ((result.data.role || "user") === "admin") {
          navigate("/overview");
        } else {
          navigate("/user/matches");
        }
        console.log("Navigate called");
      } else {
        setError(result.data?.error || result.data?.message || "Login failed");
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
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="form-input light-input"
              required
              placeholder="Enter your password"
              autoComplete="new-password"
              style={{ background: "#fff", color: "#222" }}
            />
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
        <button
          style={{
            marginTop: 16,
            width: "100%",
            background: "#f5f5f5",
            color: "#222",
            border: "1px solid #2196f3",
            borderRadius: 4,
            padding: 10,
            cursor: "pointer",
            fontWeight: 600,
          }}
          onClick={() => {
            setUser({
              email: formData.email || "admin@dev.local",
              role: "admin",
              hasCV: true,
            });
            navigate("/overview");
          }}
        >
          Log in as admin (dev preview)
        </button>
        <div className="login-footer">
          <p className="login-link">
            Don't have an account?{" "}
            <Link to="/signup" className="text-button">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
