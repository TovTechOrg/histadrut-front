import React from "react";
import { useNavigate } from "react-router-dom";
// TODO: Replace with real user data from context or props
const mockUser = {
  name: "John Doe",
  email: "john.doe@example.com",
};

const Profile = () => {
  const navigate = useNavigate();
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
        <div style={{ color: "#222", marginBottom: 8 }}>{mockUser.name}</div>
        <div style={{ fontWeight: 500, color: "#444" }}>Email:</div>
        <div style={{ color: "#222" }}>{mockUser.email}</div>
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
        Re-upload CV
      </button>
    </div>
  );
};

export default Profile;
