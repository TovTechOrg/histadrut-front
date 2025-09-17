import React, { useState, useEffect } from "react";
import { fetchCompanies } from "../../api/api";
import { useTranslations } from "../../utils/translations";
import CompanyAutocompleteInput from "../shared/CompanyAutocompleteInput";

const JobListingsFilters = ({
  jobTitleTerm,
  onJobTitleChange,
  jobDescriptionTerm,
  onJobDescriptionChange,
  selectedCompany,
  onCompanyChange,
  selectedStatus,
  onStatusChange,
  companies,
  statuses,
}) => {
  const { t, currentLanguage } = useTranslations('jobListings');
  const [companyOptions, setCompanyOptions] = useState([]);
  const [localCompany, setLocalCompany] = useState(selectedCompany || "");

  useEffect(() => {
    fetchCompanies().then((data) => {
      if (data && typeof data === "object") {
        setCompanyOptions(Object.keys(data));
      }
    });
  }, []);

  useEffect(() => {
    setLocalCompany(selectedCompany || "");
  }, [selectedCompany]);

  const handleCompanyChange = (company) => {
    setLocalCompany(company);
    onCompanyChange(company);
  };
  return (
    <section className="job-filters" aria-labelledby="filters-heading" key={currentLanguage}>
      <h2 id="filters-heading" className="job-filters__title">
        {t('filters.title')}
      </h2>

      <form
        className="job-filters__form"
        role="search"
        aria-label="Filter jobs"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="job-filters__grid">
          <div className="job-filters__field">
            <label className="job-filters__label" htmlFor="job-title-search">
              {t('filters.searchJobTitle')}
            </label>
            <input
              id="job-title-search"
              type="text"
              className="job-filters__input"
              placeholder={t('filters.jobTitlePlaceholder')}
              value={jobTitleTerm}
              onChange={(e) => onJobTitleChange(e.target.value)}
            />
          </div>

          <div className="job-filters__field">
            <label className="job-filters__label" htmlFor="job-description-search">
              {t('filters.searchJobDescription')}
            </label>
            <input
              id="job-description-search"
              type="text"
              className="job-filters__input"
              placeholder={t('filters.jobDescriptionPlaceholder')}
              value={jobDescriptionTerm}
              onChange={(e) => onJobDescriptionChange(e.target.value)}
            />
          </div>

          <div className="job-filters__field" style={{ position: "relative" }}>
            <CompanyAutocompleteInput
              value={localCompany}
              onChange={handleCompanyChange}
              options={companyOptions}
              label={t('filters.companyFilter')}
              placeholder={t('filters.companyPlaceholder')}
              inputId="company"
              className="job-filters__input"
            />
          </div>

          <div className="job-filters__field">
            <label className="job-filters__label" htmlFor="status">
              {t('filters.statusFilter')}
            </label>
            <select
              id="status"
              className="job-filters__input"
              value={selectedStatus}
              onChange={(e) => onStatusChange(e.target.value)}
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>
    </section>
  );
};

export default JobListingsFilters;
