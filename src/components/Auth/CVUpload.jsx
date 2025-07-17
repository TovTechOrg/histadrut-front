import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./CVUpload.css";

const CVUpload = () => {
  const [file, setFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { uploadCV, user } = useAuth();
  const navigate = useNavigate();

  const handleFileSelect = (selectedFile) => {
    if (selectedFile) {
      if (
        selectedFile.type === "application/pdf" ||
        selectedFile.type === "application/msword" ||
        selectedFile.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        setFile(selectedFile);
        setError("");
      } else {
        setError("Please upload a PDF or Word document.");
      }
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    handleFileSelect(selectedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFileSelect(droppedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await uploadCV(file);
      if (result.success) {
        navigate("/matches");
      } else {
        setError(result.error);
      }
    } catch {
      setError("An error occurred while uploading your CV.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cv-upload-page">
      <div className="cv-upload-container">
        <div className="cv-upload-header">
          <h1 className="cv-upload-title">
            {user?.hasCV ? "Update Your CV" : "Upload Your CV"}
          </h1>
          <p className="cv-upload-subtitle">
            Hi {user?.name}!{" "}
            {user?.hasCV
              ? "Upload a new CV to update your profile"
              : "Upload your CV to start getting matched with relevant job opportunities"}
            .
          </p>
          {user?.hasCV && (
            <div className="current-cv-info">
              <p className="current-cv-text">
                <strong>Current CV uploaded:</strong>{" "}
                {new Date(user.cvUploadedAt).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="cv-upload-form">
          {error && <div className="error-message">{error}</div>}

          <div
            className={`cv-drop-zone ${isDragOver ? "drag-over" : ""} ${
              file ? "has-file" : ""
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {file ? (
              <div className="file-selected">
                <div className="file-icon">📄</div>
                <div className="file-info">
                  <p className="file-name">{file.name}</p>
                  <p className="file-size">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="remove-file-btn"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="drop-zone-content">
                <div className="upload-icon">📤</div>
                <p className="drop-zone-text">
                  Drag and drop your CV here, or{" "}
                  <label htmlFor="cv-file" className="file-select-btn">
                    browse files
                  </label>
                </p>
                <p className="drop-zone-help">
                  Supported formats: PDF, DOC, DOCX (Max 10MB)
                </p>
              </div>
            )}

            <input
              type="file"
              id="cv-file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="file-input"
              style={{ display: "none" }}
            />
          </div>

          <button
            type="submit"
            className="upload-button"
            disabled={!file || loading}
          >
            {loading ? "Uploading..." : user?.hasCV ? "Update CV" : "Upload CV"}
          </button>
        </form>

        <div className="cv-upload-footer">
          <p className="privacy-note">
            <strong>Privacy Notice:</strong> Your CV will be securely stored and
            only used for job matching purposes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CVUpload;
