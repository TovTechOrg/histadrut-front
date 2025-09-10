import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { uploadCV } from "../../api/api";
import "./CVUpload.css";
import uploadIcon from "../../assets/icons/upload.svg";

const CVUpload = () => {
  const [file, setFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const location = useLocation();
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
      await uploadCV(file);
      setShowSuccess(true);
      setFile(null);
    } catch (err) {
      setError(err.message || "An error occurred while uploading your CV.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cv-upload-page">
      <div className="cv-upload-container">
        {showSuccess && (
          <div className="cv-upload-modal-overlay">
            <div className="cv-upload-modal">
              <div className="cv-upload-modal-icon">✔️</div>
              <div className="cv-upload-modal-title">CV Uploaded Successfully!</div>
              <div className="cv-upload-modal-desc">Your resume was uploaded. We'll notify you if a match is found.</div>
              <button
                className="cv-upload-modal-btn"
                onClick={() => {
                  if (location.state?.fromProfile) {
                    navigate("/profile");
                  } else {
                    // User came from signup, go to matches
                    navigate("/user/matches");
                  }
                }}
              >
                OK
              </button>
            </div>
          </div>
        )}
        <h1 className="cv-upload-title">Find Your Perfect Job Match</h1>
        <p className="cv-upload-subtitle">Upload your resume to instantly discover jobs that match your skills</p>
        <p className="cv-upload-desc">Once you upload your CV, our algorithm checks relevant job openings. If a suitable job is found, you'll receive a personalized email, every day, starting tomorrow.</p>
        <form
          onSubmit={handleSubmit}
          className="cv-upload-form"
        >
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
                  <p className="file-size">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
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
                <div className="upload-icon">
                  <img
                    src={uploadIcon}
                    alt="Upload"
                    width={48}
                    height={48}
                  />
                </div>
                <div className="drop-zone-title">Upload Your Resume</div>
                <div className="drop-zone-instructions">
                  Drag and drop your resume here or{" "}
                  <label htmlFor="cv-file" className="file-select-btn">
                    click to browse
                  </label>
                </div>
                <div className="drop-zone-help">Supported formats: PDF, DOC, DOCX</div>
              </div>
            )}
            <input
              type="file"
              id="cv-file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="file-input"
            />
          </div>
          <div className="cv-upload-actions">
            {location.state?.fromProfile ? (
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="cv-upload-back-btn"
              >
                ← Back
              </button>
            ) : (
              <button
                type="button"
                onClick={() => navigate("/matches")}
                className="cv-upload-back-btn"
              >
                Upload Later
              </button>
            )}
            <button
              type="submit"
              className="upload-button"
              disabled={!file || loading}
            >
              {loading ? "Uploading..." : "Upload Resume"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CVUpload;
