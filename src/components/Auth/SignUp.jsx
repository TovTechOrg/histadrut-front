import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { useTranslations } from "../../utils/translations";
import { useLanguage } from "../../contexts/LanguageContext";
import "./Login.css";

const SignUp = () => {
  const { t } = useTranslations('signUp');
  const { currentLanguage } = useLanguage();
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
        setError(t('errors.nameRequired'));
        setLoading(false);
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError(t('errors.passwordsMismatch'));
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
        setError(result.data?.message || t('errors.registrationFailed'));
      }
    } catch {
      setError(t('errors.genericError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div key={`signUp-${currentLanguage}`} className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1 className="login-title">{t('title')}</h1>
          <p className="login-subtitle">{t('subtitle')}</p>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              {t('form.email')}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-input"
              required
              placeholder={t('form.emailPlaceholder')}
              autoComplete="off"
              style={{ background: "#fff", color: "#222" }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              {t('form.name')}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="form-input"
              required
              placeholder={t('form.namePlaceholder')}
              autoComplete="off"
            style={{ background: "#fff", color: "#222" }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              {t('form.password')}
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
                placeholder={t('form.passwordPlaceholder')}
                autoComplete="new-password"
                style={{ background: "#fff", color: "#222", paddingRight: "40px" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? t('form.hidePassword') : t('form.showPassword')}
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
              {t('form.confirmPassword')}
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="form-input"
              required
              placeholder={t('form.confirmPasswordPlaceholder')}
              autoComplete="new-password"
            style={{ background: "#fff", color: "#222" }}
            />
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? t('actions.loading') : t('actions.signUp')}
          </button>
        </form>
        
        <div className="login-footer">
          <p className="login-link">
            {t('footer.alreadyHaveAccount')}{" "}
            <Link to="/login" className="text-button">
              {t('actions.signIn')}
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
          {t('footer.cookieWarning')}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
