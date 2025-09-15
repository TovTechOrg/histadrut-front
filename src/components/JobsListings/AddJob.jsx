import React from "react";
import { useNavigate } from "react-router-dom";
import JobForm from "./JobForm";
import ConfirmationModal from "../shared/ConfirmationModal";
import "../shared/ConfirmationModal.css";
import { uploadJobDetails } from "../../api/api";
import { useTranslations } from '../../utils/translations';
import { useLanguage } from '../../contexts/LanguageContext';

export default function AddJob() {
  const { t } = useTranslations('addJob');
  const { currentLanguage } = useLanguage();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalMessage, setModalMessage] = React.useState("");

  const handleCancel = () => {
    navigate("/jobs");
  };

  const handleSubmit = async (formData) => {
    try {
      const response = await uploadJobDetails(formData);
      setModalMessage(response.message || t('successModal.message'));
      setModalOpen(true);
    } catch (error) {
      alert(error.message || t('errors.failedToAdd'));
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    navigate("/jobs");
  };

  return (
    <div key={`addJob-${currentLanguage}`} className="add-job-page">
      <h1 className="page__title">{t('title')}</h1>
      <JobForm onSubmit={handleSubmit} onCancel={handleCancel} submitLabel={t('actions.submit')} pageTitle={null} />
      <ConfirmationModal
        isOpen={modalOpen}
        onClose={handleModalClose}
        title={t('successModal.title')}
        message={modalMessage}
        buttonText="OK"
      />
    </div>
  );
}
