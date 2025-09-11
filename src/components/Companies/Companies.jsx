import React from "react";
import { useNavigate } from "react-router-dom";
import { useCompaniesData } from "../../hooks/useCompaniesData";
import { useAuth } from "../../hooks/useAuth";
import { useTranslations } from "../../utils/translations";
import { useLanguage } from "../../contexts/LanguageContext";
import addIcon from "../../assets/icons/add.svg";
import viewJobsIcon from "../../assets/icons/viewJobs.svg";
import editIcon from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import Modal from "../shared/Modal";
import { deleteCompanyData } from "../../api/api";
import "./Companies.css";

const Companies = () => {
  const { user } = useAuth();
  const { companiesData, loading, error } = useCompaniesData();
  const navigate = useNavigate();
  const { t } = useTranslations('companies');
  const { currentLanguage } = useLanguage();

  const isAdmin = user?.role === "admin";

  const handleAddCompany = () => {
    alert("Add new company");
  };

  const handleViewCompany = (companyName) => {
    // Navigate to job listings page with company filter
    navigate(`/jobs-listings?company=${encodeURIComponent(companyName)}`);
  };

  const handleEditCompany = (companyName) => {
    alert(`Edit ${companyName}`);
  };

  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [companyToDelete, setCompanyToDelete] = React.useState(null);
  const [resultModalOpen, setResultModalOpen] = React.useState(false);
  const [resultMessage, setResultMessage] = React.useState("");

  const handleDeleteCompany = (companyName, jobsCount) => {
    setCompanyToDelete({ name: companyName, jobsCount });
    setDeleteModalOpen(true);
  };

  const confirmDeleteCompany = async () => {
    try {
      const response = await deleteCompanyData(companyToDelete.name);
      setResultMessage(response.message || "Company deleted successfully.");
    } catch (error) {
      setResultMessage(error.message || "Failed to delete company.");
    }
    setDeleteModalOpen(false);
    setResultModalOpen(true);
  };

  const closeResultModal = () => {
    setResultModalOpen(false);
    setCompanyToDelete(null);
    // Optionally refresh companies list here
    window.location.reload();
  };

  if (loading) {
    return (
      <section 
        className="main-page companies-page"
        style={{ direction: currentLanguage === 'he' ? 'rtl' : 'ltr' }}
      >
        <div className="companies-header">
          <h1 className="page__title">{t('title')}</h1>
        </div>
        <div className="companies-table">
          <div className="companies-table__loading">{t('loading')}</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section 
        className="main-page companies-page"
        style={{ direction: currentLanguage === 'he' ? 'rtl' : 'ltr' }}
      >
        <div className="companies-header">
          <h1 className="page__title">{t('title')}</h1>
        </div>
        <div className="companies-table">
          <div className="companies-table__error">{t('error')}: {error}</div>
        </div>
      </section>
    );
  }
  return (
    <section className="main-page companies-page">
      <div className="companies-header">
        <h1 className="page__title">{t('title')}</h1>
      </div>

      <div className="companies-table" style={{ direction: 'ltr' }}>
        <table className="companies-table__table">
          <thead className="companies-table__header">
            <tr>
              <th className="companies-table__cell companies-table__cell--header">{t('table.headers.id')}</th>
              <th className="companies-table__cell companies-table__cell--header">{t('table.headers.companyName')}</th>
              <th className="companies-table__cell companies-table__cell--header">{t('table.headers.jobsCount')}</th>
              <th className="companies-table__cell companies-table__cell--header">{t('table.headers.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {companiesData.length === 0 ? (
              <tr>
                <td colSpan="4" className="companies-table__empty">{t('noCompanies')}</td>
              </tr>
            ) : (
              companiesData.map((company) => (
                <tr key={company.id} className="companies-table__row">
                  <td className="companies-table__cell companies-table__cell--id">{company.id}</td>
                  <td
                    className="companies-table__cell companies-table__cell--name companies-table__cell--name-clickable"
                    onClick={() => handleViewCompany(company.name)}
                    style={{ cursor: "pointer", textDecoration: "underline", color: '#3498db' }}
                    title={t('actions.viewJobs', { company: company.name })}
                  >
                    {company.name}
                  </td>
                  <td className="companies-table__cell companies-table__cell--jobs-count">{company.jobsCount}</td>
                  <td className="companies-table__cell companies-table__cell--actions">
                    <div className="companies-table__actions">
                      <button
                        className="companies-table__action-btn companies-table__action-btn--view"
                        onClick={() => handleViewCompany(company.name)}
                        title={t('actions.viewJobs', { company: company.name })}
                        aria-label={t('actions.viewJobs', { company: company.name })}
                      >
                        <img
                          src={viewJobsIcon}
                          alt="View Jobs, created by Gemini"
                          className="companies-table__action-icon"
                        />
                      </button>
                      {isAdmin && (
                        <button
                          className="companies-table__action-btn companies-table__action-btn--delete"
                          onClick={() => handleDeleteCompany(company.name, company.jobsCount)}
                          title={t('actions.deleteCompany', { company: company.name })}
                          aria-label={t('actions.deleteCompany', { company: company.name })}
                        >
                          <img
                            src={deleteIcon}
                            alt="Delete, created by Gemini"
                            className="companies-table__action-icon"
                          />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title={t('modal.deleteTitle')}
      >
        {companyToDelete && (
          <div className="delete-modal__text" style={{ direction: currentLanguage === 'he' ? 'rtl' : 'ltr' }}>
            {t('modal.deleteMessage', { 
              company: companyToDelete.name.toUpperCase(), 
              jobsCount: companyToDelete.jobsCount 
            })}<br /><br />
            {t('modal.deleteConfirm')}
            <div className="delete-modal__actions">
              <button className="delete-modal__cancel" onClick={() => setDeleteModalOpen(false)}>
                {t('modal.cancel')}
              </button>
              <button className="delete-modal__delete" onClick={confirmDeleteCompany}>
                {t('modal.delete')}
              </button>
            </div>
          </div>
        )}
      </Modal>
      <Modal
        isOpen={resultModalOpen}
        onClose={closeResultModal}
        title={resultMessage.toLowerCase().includes("fail") ? t('modal.errorTitle') : t('modal.successTitle')}
      >
        <div className="delete-modal__result-text" style={{ direction: currentLanguage === 'he' ? 'rtl' : 'ltr' }}>
          {resultMessage}
        </div>
        <div className="delete-modal__actions" style={{ justifyContent: "center", marginTop: "1.5rem" }}>
          <button className="delete-modal__cancel" onClick={closeResultModal}>OK</button>
        </div>
      </Modal>
    </section>
  );
};

export default Companies;
