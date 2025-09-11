import React from "react";
import Modal from "../shared/Modal";
import { useTranslations } from "../../utils/translations";

const JobViewModal = ({ open, onClose, job }) => {
  const { t, currentLanguage } = useTranslations('modals');
  
  if (!open || !job) return null;
  return (
    <Modal key={currentLanguage} isOpen={open} onClose={onClose}>
      <div className="job-view-modal">
        <h2 className="job-view-modal__title">{job.title}</h2>
        <h3 className="job-view-modal__company">{job.company}</h3>
        <div className="job-view-modal__desc">
          <strong>{t('jobViewModal.description')}:</strong>
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', margin: 0 }}>{job.job_description}</pre>
        </div>
      </div>
    </Modal>
  );
};

export default JobViewModal;
