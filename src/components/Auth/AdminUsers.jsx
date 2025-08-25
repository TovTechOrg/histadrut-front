import React, { useEffect, useState } from "react";
import "./AdminUsers.css";
import deleteIcon from "../../assets/icons/delete.svg";
import { fetchUsers, deleteUser } from "../../api/api";
import Modal from "../shared/Modal";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tableError, setTableError] = useState(""); // Only for table
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(""); // Only for modal
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .catch(() => setTableError("Failed to load users."))
      .finally(() => setLoading(false));
  }, []);

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setDeleteModalOpen(true);
    setDeleteError(""); // Clear modal error
  };

  const handleDeleteConfirm = async () => {
    setDeleting(true);
    setDeleteError(""); // Clear previous modal error
    try {
      await deleteUser(userToDelete._id);
      setUsers((prev) => prev.filter((u) => u._id !== userToDelete._id));
      setDeleteModalOpen(false);
      setSuccessModalOpen(true);
      setUserToDelete(null);
    } catch (e) {
      setDeleteError(e.message || "Failed to delete user.");
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setUserToDelete(null);
    setDeleteError("");
  };

  const handleSuccessModalClose = () => {
    setSuccessModalOpen(false);
  };

  return (
    <div className="main-page admin-users-page">
      <div className="admin-users-header">
        <h1 className="page__title">All Users</h1>
      </div>
      <div className="admin-users-table-container">
        {loading ? (
          <div className="admin-users-loading">Loading users...</div>
        ) : tableError ? (
          <div className="admin-users-error">{tableError}</div>
        ) : (
          <table className="admin-users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>CV Status</th>
                <th>Signed Up</th>
                <th>Total Matches</th>
                <th></th>
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
                  <td>
                    <button
                      className="users-table__action-btn users-table__action-btn--delete"
                      title="Delete user"
                      onClick={() => handleDeleteClick(user)}
                      disabled={deleting}
                    >
                      <img
                        src={deleteIcon}
                        alt="Delete, created by Gemini"
                        className="users-table__action-icon"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={handleDeleteCancel}
        title="Confirm Deletion"
      >
        {userToDelete && (
          <div className="delete-modal__text">
            Are you sure you want to completely delete the user{" "}
            <b>{userToDelete.name}</b>
            {userToDelete.cv_status === "uploaded" ? ", their CV" : ""}
            {userToDelete.total_matches > 0
              ? ` and ${userToDelete.total_matches} matches`
              : ""}
            ?<br />
            <span style={{ color: "red" }}>This action can't be reversed!</span>
            {deleteError && (
              <div style={{ color: "#e74c3c", marginTop: "1rem", fontWeight: 500 }}>
                {deleteError}
              </div>
            )}
            <div className="delete-modal__actions">
              <button
                className="delete-modal__cancel"
                onClick={handleDeleteCancel}
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                className="delete-modal__delete"
                onClick={handleDeleteConfirm}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        )}
      </Modal>
      {/* Success Modal */}
      <Modal
        isOpen={successModalOpen}
        onClose={handleSuccessModalClose}
        title="User Deleted"
      >
        <div className="delete-modal__text">
          User was deleted successfully.
          <div className="delete-modal__actions" style={{ marginTop: "1rem" }}>
            <button
              className="delete-modal__close"
              onClick={handleSuccessModalClose}
            >
              OK
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminUsers;
