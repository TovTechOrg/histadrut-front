import React from "react";
import Modal from "../shared/Modal";

const JobViewModal = ({ open, onClose, job }) => {
  if (!open || !job) return null;
  return (
    <Modal isOpen={open} onClose={onClose}>
      <div className="job-view-modal">
        <h2 className="job-view-modal__title">{job.title}</h2>
        <h3 className="job-view-modal__company">{job.company}</h3>
        <div className="job-view-modal__desc">
          <strong>Description:</strong>
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', margin: 0 }}>{job.job_description}</pre>
        </div>
      </div>
    </Modal>
  );
};

export default JobViewModal;
