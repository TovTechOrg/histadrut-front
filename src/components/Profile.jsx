
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserFromSession } from "../api/api";


const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserFromSession()
      .then((userData) => {
        setUser(userData);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load user info");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ textAlign: "center", marginTop: 40 }}>Loading profile...</div>;
  }
  if (error || !user) {
    return <div style={{ textAlign: "center", marginTop: 40, color: "#c00" }}>Unable to load profile.</div>;
  }

  return (
    <div
      style={{
        maxWidth: 420,
        margin: "2.5rem auto",
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
        padding: "2.5rem 2rem",
      }}
    >
      <h2
        style={{
          fontWeight: 700,
          fontSize: "2rem",
          marginBottom: 16,
          color: "#222",
        }}
      >
        Profile
      </h2>
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontWeight: 500, color: "#444" }}>Name:</div>
        <div style={{ color: "#222", marginBottom: 8 }}>{user.name || "-"}</div>
        <div style={{ fontWeight: 500, color: "#444" }}>Email:</div>
        <div style={{ color: "#222", marginBottom: 8 }}>{user.email || "-"}</div>
        <div style={{ fontWeight: 500, color: "#444" }}>Role:</div>
        <div style={{ color: "#222", marginBottom: 8 }}>{user.role || "-"}</div>
        <div style={{ fontWeight: 500, color: "#444" }}>CV Status:</div>
        <div style={{ color: "#222" }}>{user.cv_status || "-"}</div>
      </div>
      <button
        style={{
          padding: "0.8rem 2.2rem",
          fontSize: "1.08rem",
          fontWeight: 600,
          borderRadius: 6,
          background: "#3498db",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          marginTop: 12,
        }}
        onClick={() => navigate("/cv-upload", { state: { fromProfile: true } })}
      >
        {user.cv_status === "Missing" ? "Upload CV" : "Re-upload CV"}
      </button>
    </div>
  );
};

export default Profile;
