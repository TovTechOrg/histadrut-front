import React from "react";
import Modal from "../shared/Modal";
import { getTextDirection, getTextAlignment } from "../../utils/languageDetection";
import "./JobDescriptionModal.css";

/**
 * Unified Job Description Modal for both Matches and Job Listings
 * @param {object} props
 * @param {object} props.job - The job object (supports both Matches and JobListings shape)
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {function} props.onClose - Close handler
 */
const JobDescriptionModal = ({ job, isOpen, onClose }) => {
  if (!isOpen || !job) return null;

  // Support both jobDescription/job.job_description and jobTitle/job.title
  const description = job.jobDescription || job.job_description || "No description available";
  const title = job.jobTitle || job.title || "Job Details";
  const company = job.company || "";
  const dateAdded = job.dateAdded || job.posted || job.discovered || "";

  // Handle array or string description
  const getDescription = (desc) => {
    if (Array.isArray(desc)) return desc[0] || "No description available";
    return desc || "No description available";
  };
  const jobDescription = getDescription(description);
  const textDirection = getTextDirection(jobDescription);
  const textAlignment = getTextAlignment(jobDescription);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      className="job-modal"
    >
      <div className="job-modal__info">
        {company && (
          <div className="job-modal__company">
            <strong>Company:</strong> {company}
          </div>
        )}
        {dateAdded && (
          <div className="job-modal__date">
            <strong>Date Added:</strong> {dateAdded}
          </div>
        )}
      </div>
      <div className="job-modal__description">
        <h3>Job Description</h3>
        <div
          className="job-modal__description-content"
          dir={textDirection}
          style={{ textAlign: textAlignment }}
        >
          {jobDescription}
        </div>
      </div>
    </Modal>
  );
};

export default JobDescriptionModal;
