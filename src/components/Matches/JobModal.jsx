import React from "react";
import Modal from "../shared/Modal";
import {
  getTextDirection,
  getTextAlignment,
} from "../../utils/languageDetection";
import "./JobModal.css";

const JobModal = ({ job, onClose }) => {
  if (!job) return null;

  // Handle job description - if it's an array, use first index, otherwise use string
  const getJobDescription = (description) => {
    if (Array.isArray(description)) {
      return description[0] || "No description available";
    }
    return description || "No description available";
  };

  const jobDescription = getJobDescription(job.jobDescription);
  const textDirection = getTextDirection(jobDescription);
  const textAlignment = getTextAlignment(jobDescription);

  return (
    <Modal
      isOpen={!!job}
      onClose={onClose}
      title={job.jobTitle}
      className="job-modal"
    >
      <div className="job-modal__info">
        <div className="job-modal__company">
          <strong>Company:</strong> {job.company}
        </div>
        <div className="job-modal__date">
          <strong>Date Added:</strong> {job.dateAdded}
        </div>
      </div>

      <div className="job-modal__description">
        <h3>Job Description</h3>
        <div
          className="job-modal__description-content"
          dir={textDirection}
          style={{
            textAlign: textAlignment,
          }}
        >
          {jobDescription}
        </div>
      </div>
    </Modal>
  );
};

export default JobModal;
