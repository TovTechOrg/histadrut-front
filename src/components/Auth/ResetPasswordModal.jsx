import React, { useState } from "react";
import Modal from "../shared/Modal";
import "./Login.css";
import { resetPassword } from "../../api/api";
import { useTranslations } from "../../utils/translations";
import { useLanguage } from "../../contexts/LanguageContext";

const ResetPasswordModal = ({ isOpen, onClose }) => {
  const { t } = useTranslations('resetPassword');
  const { currentLanguage } = useLanguage();
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
      setError(err.message || t('failedToSend'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="" maxWidth="500px" className="reset-modal">
      <div key={`resetPassword-${currentLanguage}`} className="reset-password-modal">
        <h2 className="reset-password-title">{t('title')}</h2>
        {success ? (
          <div className="success-message reset-password-success">{t('successMessage')}</div>
        ) : (
          <form onSubmit={handleSubmit} className="reset-password-form">
            <label htmlFor="reset-email" className="reset-password-label">{t('emailLabel')}</label>
            <input
              id="reset-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input reset-password-input"
              placeholder={t('emailPlaceholder')}
            />
            {error && <div className="error-message" style={{ color: "#c00", marginBottom: 10 }}>{error}</div>}
            <button
              type="submit"
              className="login-button reset-password-btn"
              disabled={loading}
            >
              {loading ? t('sending') : t('sendResetLink')}
            </button>
          </form>
        )}
      </div>
    </Modal>
  );
};

export default ResetPasswordModal;
