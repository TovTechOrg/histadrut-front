import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserFromSession, unsubscribeFromEmails, resubscribeToEmails, updateMaxAlerts } from "../api/api";
import { capitalizeName } from "../utils/textHelpers";
import { useTranslations } from "../utils/translations";
import { useLanguage } from "../contexts/LanguageContext";
import "./Profile.css";
import Modal from "./shared/Modal";

const Profile = () => {
  const { t } = useTranslations('profile');
  const { currentLanguage, toggleLanguage, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [subscribed, setSubscribed] = useState(true);
  const [subChecked, setSubChecked] = useState(false);
  const [unsubChecked, setUnsubChecked] = useState(false);
  const [subLoading, setSubLoading] = useState(false);

  const [maxAlerts, setMaxAlerts] = useState(5);
  const [originalMaxAlerts, setOriginalMaxAlerts] = useState(5);
  const [maxAlertsLoading, setMaxAlertsLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showCvModal, setShowCvModal] = useState(false);

  const handleDownloadCV = () => {
    const cvLink = user.cv_link;
    
    if (!cvLink) {
      setModalMessage(t('No CV available to download.'));
      setShowModal(true);
      return;
    }

    // Download the CV file
    const link = document.createElement('a');
    link.href = cvLink;
    link.download = `${user.name || 'CV'}_resume`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleMaxAlertsChange = (e) => {
    const value = e.target.value;
    // Allow empty string while typing
    if (value === '') {
      setMaxAlerts('');
      return;
    }
    // Parse as number and validate range
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue)) {
      setMaxAlerts(Math.max(0, Math.min(100, numValue)));
    }
  };

  const handleSaveMaxAlerts = async () => {
    // Don't save if empty string
    if (maxAlerts === '') return;
    
    setMaxAlertsLoading(true);
    try {
      await updateMaxAlerts(maxAlerts, user.id);
      setOriginalMaxAlerts(maxAlerts);
      setModalMessage(t('maxAlertsUpdated'));
      setShowModal(true);
    } catch (err) {
      console.error("Failed to update max alerts:", err);
      setModalMessage(t('maxAlertsUpdateFailed'));
      setShowModal(true);
    } finally {
      setMaxAlertsLoading(false);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await fetchUserFromSession();
        setUser(userData);
        setSubscribed(
          userData && typeof userData.subscribed === 'boolean' ? userData.subscribed : true
        );
        const userMaxAlerts = userData && typeof userData.max_alerts === 'number' ? userData.max_alerts : 5;
        setMaxAlerts(userMaxAlerts);
        setOriginalMaxAlerts(userMaxAlerts);
        setLoading(false);
      } catch (err) {
        setModalMessage('Failed to load user profile.');
        setShowModal(true);
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return <div className="profile-loading text-basic" style={{ direction: currentLanguage === 'he' ? 'rtl' : 'ltr' }}>Loading profile...</div>;
  }
  if (error || !user) {
    return <div className="profile-error" style={{ direction: currentLanguage === 'he' ? 'rtl' : 'ltr' }}>Unable to load profile.</div>;
  }

  return (
    <div className="profile-page-wrapper">
      <div className="profile-container" style={{ direction: currentLanguage === 'he' ? 'rtl' : 'ltr' }}>
      <h2 className="profile-title">
        {t('welcome')}, {capitalizeName(user.name) || "User"}
      </h2>
      <div className="profile-section">
        <div className="profile-label">{t('email')}:</div>
        <div className="profile-value">{user.email || "-"}</div>
        <div className="profile-label">{t('role')}:</div>
        <div className="profile-value">{user.role || "-"}</div>
        {user.role !== "admin" && (
          <>
            <div className="profile-label">{t('cvStatus')}:</div>
            <div className="profile-value">{user.cv_status || "-"}</div>
          </>
        )}
      </div>
      
      {/* Language toggle buttons - visible for all users */}
      <hr style={{ margin: '24px 0 18px 0', border: 0, borderTop: '1px solid #eee' }} />
      <div style={{ marginBottom: '16px', textAlign: currentLanguage === 'he' ? 'right' : 'left' }}>
        <span style={{ marginRight: currentLanguage === 'he' ? '0' : '8px', marginLeft: currentLanguage === 'he' ? '8px' : '0', fontSize: '14px', color: '#666' }}>
          {t('language')}:
        </span>
        <button
          onClick={() => setLanguage('en')}
          style={{
            background: currentLanguage === 'en' ? '#2196f3' : '#f5f5f5',
            border: '1px solid #ddd',
            borderRadius: '4px 0 0 4px',
            padding: '8px 12px',
            cursor: 'pointer',
            fontSize: '14px',
            color: currentLanguage === 'en' ? '#fff' : '#333',
            marginRight: '0'
          }}
        >
          English
        </button>
        <button
          onClick={() => setLanguage('he')}
          style={{
            background: currentLanguage === 'he' ? '#2196f3' : '#f5f5f5',
            border: '1px solid #ddd',
            borderRadius: '0 4px 4px 0',
            borderLeft: '0',
            padding: '8px 12px',
            cursor: 'pointer',
            fontSize: '14px',
            color: currentLanguage === 'he' ? '#fff' : '#333'
          }}
        >
          עברית
        </button>
      </div>
      
      {/* Subscription/Unsubscribe UI (not for admin) */}
      {user.role !== "admin" && (
        <>
          
          <div className={`profile-status ${subscribed ? 'profile-status-subscribed' : 'profile-status-unsubscribed'}`}
               style={{ marginBottom: 10 }}>
            {t('emailSubscriptionStatus').replace('{status}', subscribed ? t('subscribed') : t('unsubscribed'))}
          </div>
          <div className="profile-sub-block">
            {subscribed ? (
              <>
                <label className="profile-checkbox-label">
                  <input
                    type="checkbox"
                    checked={unsubChecked}
                    onChange={e => setUnsubChecked(e.target.checked)}
                    className="profile-checkbox"
                  />
                  {t('doNotWishEmails')}
                </label>
                <button
                  className={`profile-btn profile-btn-unsub${unsubChecked ? '' : ' profile-btn-disabled'}`}
                  disabled={!unsubChecked || subLoading}
                  onClick={async () => {
                    if (!unsubChecked || subLoading) return;
                    setSubLoading(true);
                    try {
                      await unsubscribeFromEmails(user.email);
                      setSubscribed(false);
                      setUnsubChecked(false);
                      setModalMessage(t('unsubscribeSuccess'));
                      setShowModal(true);
                    } catch (err) {
                      setModalMessage(t('unsubscribeFailed'));
                      setShowModal(true);
                    } finally {
                      setSubLoading(false);
                    }
                  }}
                >
                  {subLoading ? <span className="profile-btn-spinner"></span> : t('unsubscribe')}
                </button>
              </>
            ) : (
              <>
                <label className="profile-checkbox-label">
                  <input
                    type="checkbox"
                    checked={subChecked}
                    onChange={e => setSubChecked(e.target.checked)}
                    className="profile-checkbox"
                  />
                  {t('wishToReceiveEmails')}
                </label>
                <button
                  className={`profile-btn profile-btn-sub${subChecked ? '' : ' profile-btn-disabled'}`}
                  disabled={!subChecked || subLoading}
                  onClick={async () => {
                    if (!subChecked || subLoading) return;
                    setSubLoading(true);
                    try {
                      await resubscribeToEmails(user.email);
                      setSubscribed(true);
                      setSubChecked(false);
                      setModalMessage(t('subscribeSuccess'));
                      setShowModal(true);
                    } catch (err) {
                      setModalMessage(t('subscribeFailed'));
                      setShowModal(true);
                    } finally {
                      setSubLoading(false);
                    }
                  }}
                >
                  {subLoading ? <span className="profile-btn-spinner"></span> : t('subscribe')}
                </button>
              </>
            )}
          </div>

          {/* Max Alerts Setting */}
          <div className="profile-max-alerts-section">
            <div className="profile-max-alerts-line">
              <span className="profile-max-alerts-text" dangerouslySetInnerHTML={{ __html: t('maxAlerts') }}></span>
              <input
                type="number"
                min="0"
                max="100"
                value={maxAlerts}
                onChange={handleMaxAlertsChange}
                className="profile-max-alerts-input"
              />
              <span className="profile-max-alerts-text">{t('maxAlertsEachDay')}</span>
            </div>
            {maxAlerts !== originalMaxAlerts && maxAlerts !== '' && (
              <button
                className="profile-btn profile-btn-save-alerts"
                onClick={handleSaveMaxAlerts}
                disabled={maxAlertsLoading}
              >
                {maxAlertsLoading ? <span className="profile-btn-spinner"></span> : t('saveChanges')}
              </button>
            )}
          </div>
        </>
      )}
      {user.role !== "admin" && (
        <div className="profile-cv-actions">
          {user.cv_link && (
            <button
              className="profile-btn profile-btn-view-cv"
              onClick={handleDownloadCV}
            >
              {t('downloadCV')}
            </button>
          )}
          <button
            className="profile-btn profile-btn-cv"
            onClick={() => navigate("/cv-upload", { state: { fromProfile: true } })}
          >
            {user.cv_status === "Missing" ? t('uploadCV') : t('reUploadCV')}
          </button>
        </div>
      )}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="">
        <div className="profile-modal-content">
          <div className="profile-modal-message">{modalMessage}</div>
          <button className="profile-modal-confirm-btn" onClick={() => setShowModal(false)}>OK</button>
        </div>
      </Modal>
      </div>
    </div>
  );
};

export default Profile;
