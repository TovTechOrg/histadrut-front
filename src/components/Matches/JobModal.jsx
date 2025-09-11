import React from "react";
import Modal from "../shared/Modal";
import {
  getTextDirection,
  getTextAlignment,
} from "../../utils/languageDetection";
import { useTranslations } from "../../utils/translations";
import "./JobModal.css";

const JobModal = ({ job, onClose }) => {
  const { t, currentLanguage } = useTranslations('modals');
  
  if (!job) return null;

  // Handle job description - if it's an array, use first index, otherwise use string
  const getJobDescription = (description) => {
    if (Array.isArray(description)) {
      return description[0] || t('jobModal.noDescriptionAvailable');
    }
    return description || t('jobModal.noDescriptionAvailable');
  };

  const jobDescription = getJobDescription(job.jobDescription);
  const textDirection = getTextDirection(jobDescription);
  const textAlignment = getTextAlignment(jobDescription);

  return (
    <Modal
      key={currentLanguage}
      isOpen={!!job}
      onClose={onClose}
      title={job.jobTitle}
      className="job-modal"
    >
      <div className="job-modal__info">
        <div className="job-modal__company">
          <strong>{t('jobModal.company')}:</strong> {job.company}
        </div>
        <div className="job-modal__date">
          <strong>{t('jobModal.dateAdded')}:</strong> {job.dateAdded}
        </div>
      </div>

      <div className="job-modal__description">
        <h3>{t('jobModal.jobDescription')}</h3>
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
