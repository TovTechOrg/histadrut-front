import React, { useEffect, useState } from "react";
import "./AdminUsers.css";

const fetchUsers = async () => {
  const res = await fetch("https://cv.pythia-match.com/users", { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch users");
  return await res.json();
};

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .catch(() => setError("Failed to load users."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="admin-users-page">
      <div className="admin-users-header">
        <h1 className="admin-users-title">All Users</h1>
      </div>
      <div className="admin-users-table-container">
        {loading ? (
          <div className="admin-users-loading">Loading users...</div>
        ) : error ? (
          <div className="admin-users-error">{error}</div>
        ) : (
          <table className="admin-users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>CV Status</th>
                <th>Signed Up</th>
                <th>Total Matches</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.cv_status}</td>
                  <td>{user.signed_up}</td>
                  <td>{user.total_matches}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
