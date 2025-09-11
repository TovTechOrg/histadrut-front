import React, { useState } from "react";
import ResetPasswordModal from "./ResetPasswordModal";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { useTranslations } from "../../utils/translations";
import { useLanguage } from "../../contexts/LanguageContext";
import { getTranslation } from "../../utils/translations";
import "./Login.css";

const Login = () => {
  const { t } = useTranslations('login');
  const { toggleLanguage, currentLanguage } = useLanguage();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await login(formData.email, formData.password);

      if (result.status === 200 && result.data?.user_authenticated) {
        // Redirect based on role
        if ((result.data.role || "user") === "admin") {
          navigate("/overview");
        } else {
          navigate("/user/matches");
        }
      } else {
        let msg = result.data?.error || result.data?.message || t('errors.loginFailed');
        if (msg === "User authentication failed" || msg.toLowerCase().includes("authentication failed")) {
          msg = t('errors.userNotFound');
        }
        setError(msg);
      }
    } catch {
      setError(t('errors.genericError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page" style={{ direction: currentLanguage === 'he' ? 'rtl' : 'ltr' }}>
      <div className="login-container">
        
        <div className="login-header">
          <h1 className="login-title">{t('title')}</h1>
          <p className="login-subtitle">Access your job matches and CV</p>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              {t('emailLabel')}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-input light-input"
              required
              placeholder={t('emailLabel')}
              autoComplete="username"
              style={{ 
                background: "#fff", 
                color: "#222",
                textAlign: currentLanguage === 'he' ? 'right' : 'left'
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              {t('passwordLabel')}
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
                placeholder={t('passwordLabel')}
                autoComplete="new-password"
                style={{ 
                  background: "#fff", 
                  color: "#222", 
                  paddingRight: currentLanguage === 'he' ? "10px" : "40px",
                  paddingLeft: currentLanguage === 'he' ? "40px" : "10px",
                  textAlign: currentLanguage === 'he' ? 'right' : 'left'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: currentLanguage === 'he' ? 'auto' : "10px",
                  left: currentLanguage === 'he' ? "10px" : 'auto',
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                  color: "#666"
                }}
                title={showPassword ? t('hidePassword') : t('showPassword')}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>
          
          {/* Forgot password link moved here */}
          <div style={{ textAlign: "right", marginBottom: "12px" }}>
            <button
              type="button"
              className="text-button"
              style={{ background: "none", border: "none", color: "#2196f3", cursor: "pointer", fontWeight: 500, padding: 0, fontSize: "0.9rem" }}
              onClick={() => setShowResetModal(true)}
            >
              {t('forgotPassword')}
            </button>
          </div>
          
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? getTranslation('common', 'loading', currentLanguage) : t('loginButton')}
          </button>
        </form>

        <div className="login-footer">
          <p className="login-link">
            {t('signUpPrompt')}{" "}
            <Link to="/signup" className="text-button">
              {t('signUpLink')}
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
          lineHeight: "1.4",
          direction: currentLanguage === 'he' ? 'rtl' : 'ltr'
        }}>
          {t('cookieWarning')}
        </div>
      </div>
      {/* Move modal outside login-container */}
      <ResetPasswordModal isOpen={showResetModal} onClose={() => setShowResetModal(false)} />
    </div>
  );
};

export default Login;
