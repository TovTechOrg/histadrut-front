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
      
      // Navigate after successful upload based on where user came from
      setTimeout(() => {
        if (location.state?.fromProfile) {
          navigate("/profile");
        } else {
          // User came from signup, go to matches
          navigate("/user/matches");
        }
      }, 2000); // Give user 2 seconds to see the success message
    } catch (err) {
      setError(err.message || "An error occurred while uploading your CV.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="cv-upload-page"
      style={{
        minHeight: "100vh",
        background: "#f7f8fa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="cv-upload-container"
        style={{
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
          padding: "2.5rem 2.5rem 2rem 2.5rem",
          maxWidth: 520,
          width: "100%",
        }}
      >
        {showSuccess && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                background: "#fff",
                borderRadius: 12,
                padding: "2rem 2.5rem 1.5rem 2.5rem",
                boxShadow: "0 4px 24px rgba(0,0,0,0.13)",
                textAlign: "center",
                minWidth: 320,
              }}
            >
              <div style={{ fontSize: 40, color: "#27ae60", marginBottom: 12 }}>
                ✔️
              </div>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: "1.25rem",
                  color: "#222",
                  marginBottom: 8,
                }}
              >
                CV Uploaded Successfully!
              </div>
              <div style={{ color: "#444", marginBottom: 18 }}>
                Your resume was uploaded. We'll notify you if a match is found.
              </div>
              <button
                onClick={() => {
                  if (location.state?.fromProfile) {
                    navigate("/profile");
                  } else {
                    // User came from signup, go to matches
                    navigate("/user/matches");
                  }
                }}
                style={{
                  padding: "0.7rem 2.2rem",
                  fontSize: "1.05rem",
                  fontWeight: 600,
                  borderRadius: 6,
                  background: "#3498db",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                OK
              </button>
            </div>
          </div>
        )}
        <h1
          className="cv-upload-title"
          style={{
            textAlign: "center",
            fontSize: "2.3rem",
            fontWeight: 700,
            marginBottom: "0.5rem",
            color: "#222",
          }}
        >
          Find Your Perfect Job Match
        </h1>
        <p
          className="cv-upload-subtitle"
          style={{
            textAlign: "center",
            fontSize: "1.15rem",
            color: "#444",
            marginBottom: "1.5rem",
            fontWeight: 400,
          }}
        >
          Upload your resume to instantly discover jobs that match your skills
        </p>
        <p
          style={{
            textAlign: "center",
            color: "#666",
            marginBottom: "2rem",
            maxWidth: 600,
            marginLeft: "auto",
            marginRight: "auto",
            fontSize: "1rem",
          }}
        >
          Once you upload your CV, our algorithm checks relevant job openings.
          If a suitable job is found, you'll receive a personalized email.
        </p>
        <form
          onSubmit={handleSubmit}
          className="cv-upload-form"
          style={{ maxWidth: 520, margin: "0 auto" }}
        >
          {error && <div className="error-message">{error}</div>}
          <div
            className={`cv-drop-zone ${isDragOver ? "drag-over" : ""} ${
              file ? "has-file" : ""
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{
              marginBottom: "1.5rem",
              border: "1.5px dashed #b5c6d6",
              borderRadius: 10,
              background: "#fafbfc",
            }}
          >
            {file ? (
              <div className="file-selected">
                <div
                  className="file-icon"
                  style={{ fontSize: "2.5rem", color: "#3498db" }}
                >
                  📄
                </div>
                <div className="file-info">
                  <p className="file-name" style={{ color: "#222" }}>
                    {file.name}
                  </p>
                  <p className="file-size" style={{ color: "#444" }}>
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="remove-file-btn"
                  style={{
                    color: "#3498db",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    marginTop: 8,
                  }}
                >
                  Remove
                </button>
              </div>
            ) : (
              <div
                className="drop-zone-content"
                style={{ textAlign: "center" }}
              >
                <div className="upload-icon" style={{ marginBottom: 8 }}>
                  <img
                    src={uploadIcon}
                    alt="Upload"
                    width={48}
                    height={48}
                    style={{ display: "block", margin: "0 auto" }}
                  />
                </div>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: "1.13rem",
                    marginBottom: 4,
                    color: "#222",
                  }}
                >
                  Upload Your Resume
                </div>
                <div style={{ marginBottom: 8, color: "#444" }}>
                  Drag and drop your resume here or{" "}
                  <label
                    htmlFor="cv-file"
                    className="file-select-btn"
                    style={{
                      color: "#3498db",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    click to browse
                  </label>
                </div>
                <div style={{ color: "#888", fontSize: "0.97rem" }}>
                  Supported formats: PDF, DOC, DOCX
                </div>
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
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 12,
              marginTop: 8,
            }}
          >
            {location.state?.fromProfile ? (
              <button
                type="button"
                onClick={() => navigate(-1)}
                style={{
                  background: "none",
                  border: "1.5px solid #3498db",
                  color: "#3498db",
                  borderRadius: 6,
                  padding: "0.7rem 1.5rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  fontSize: "1.05rem",
                  minWidth: 100,
                }}
              >
                ← Back
              </button>
            ) : (
              <button
                type="button"
                onClick={() => navigate("/matches")}
                style={{
                  background: "none",
                  border: "1.5px solid #3498db",
                  color: "#3498db",
                  borderRadius: 6,
                  padding: "0.7rem 1.5rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  fontSize: "1.05rem",
                  minWidth: 100,
                }}
              >
                Upload Later
              </button>
            )}
            <button
              type="submit"
              className="upload-button"
              disabled={!file || loading}
              style={{
                flex: 1,
                padding: "0.9rem",
                fontSize: "1.1rem",
                fontWeight: 600,
                borderRadius: 6,
                background: file ? "#3498db" : "#e0e0e0",
                color: file ? "#fff" : "#888",
                border: "none",
              }}
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
