import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserFromSession, unsubscribeFromEmails, resubscribeToEmails } from "../api/api";
import { capitalizeName } from "../utils/textHelpers";
import "./Profile.css";
import Modal from "./shared/Modal";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [subscribed, setSubscribed] = useState(true);
  const [subChecked, setSubChecked] = useState(false);
  const [unsubChecked, setUnsubChecked] = useState(false);
  const [subLoading, setSubLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await fetchUserFromSession();
        setUser(userData);
        setSubscribed(
          userData && typeof userData.subscribed === 'boolean' ? userData.subscribed : true
        );
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
    return <div className="profile-loading text-basic">Loading profile...</div>;
  }
  if (error || !user) {
    return <div className="profile-error">Unable to load profile.</div>;
  }

  return (
    <div className="profile-container">
      <h2 className="profile-title">
        Welcome, {capitalizeName(user.name) || "User"}
      </h2>
      <div className="profile-section">
        <div className="profile-label">Email:</div>
        <div className="profile-value">{user.email || "-"}</div>
        <div className="profile-label">Role:</div>
        <div className="profile-value">{user.role || "-"}</div>
        {user.role !== "admin" && (
          <>
            <div className="profile-label">CV Status:</div>
            <div className="profile-value">{user.cv_status || "-"}</div>
          </>
        )}
      </div>
      {/* Subscription/Unsubscribe UI (not for admin) */}
      {user.role !== "admin" && (
        <>
          <hr style={{ margin: '24px 0 18px 0', border: 0, borderTop: '1px solid #eee' }} />
          <div className={`profile-status ${subscribed ? 'profile-status-subscribed' : 'profile-status-unsubscribed'}`}
               style={{ marginBottom: 10 }}>
            You are currently <b>{subscribed ? 'subscribed' : 'unsubscribed'}</b> to receive job matches via email.
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
                  I <b>do not wish</b> to receive job matches via email
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
                      setModalMessage('You have been unsubscribed from job offer emails.');
                      setShowModal(true);
                    } catch (err) {
                      setModalMessage('Failed to unsubscribe. Please try again.');
                      setShowModal(true);
                    } finally {
                      setSubLoading(false);
                    }
                  }}
                >
                  {subLoading ? <span className="profile-btn-spinner"></span> : 'Unsubscribe'}
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
                  I <b>wish</b> to receive job matches via email
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
                      setModalMessage('You have been subscribed to job offer emails.');
                      setShowModal(true);
                    } catch (err) {
                      setModalMessage('Failed to subscribe. Please try again.');
                      setShowModal(true);
                    } finally {
                      setSubLoading(false);
                    }
                  }}
                >
                  {subLoading ? <span className="profile-btn-spinner"></span> : 'Subscribe'}
                </button>
              </>
            )}
          </div>
        </>
      )}
      {user.role !== "admin" && (
        <button
          className="profile-btn profile-btn-cv"
          onClick={() => navigate("/cv-upload", { state: { fromProfile: true } })}
        >
          {user.cv_status === "Missing" ? "Upload CV" : "Re-upload CV"}
        </button>
      )}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="">
        <div className="profile-modal-content">
          <div className="profile-modal-message">{modalMessage}</div>
          <button className="profile-modal-confirm-btn" onClick={() => setShowModal(false)}>OK</button>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;
