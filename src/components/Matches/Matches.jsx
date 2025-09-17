import React from "react";
import MatchesFilters from "./MatchesFilters";
import MatchesTable from "./MatchesTable";
import { useMatchesData } from "../../hooks/useMatchesData";
import { useTranslations } from "../../utils/translations";
import "./Matches.css";

const Matches = () => {
  const {
    jobsData,
    filteredJobs,
    loading,
    error,
    filters,
    updateFilters,
    handleLimitChange,
    currentPage,
    totalPages,
    totalJobs,
    goToNextPage,
    goToPreviousPage,
  } = useMatchesData();
  
  const { t, currentLanguage } = useTranslations('matches');

  return (
    <section className="main-page matches-page">
      <div className="matches-header">
        <h1 className="page__title">{t('title')}</h1>
        <p className="matches-subtitle">
          {t('subtitle')}
        </p>
      </div>

      <MatchesFilters filters={filters} onFiltersChange={updateFilters} />

      <MatchesTable jobs={filteredJobs} allJobs={jobsData} loading={loading} error={error} />

      <div className="pagination-controls">
        <div className="pagination-left">
          <div className="page-size-control">
            <span className="page-size-label">{t('pagination.showLabel')}</span>
            <div className="page-size-buttons">
              {[20, 50, 100].map((size) => (
                <button
                  key={size}
                  className={`page-size-btn ${filters?.limit === size ? 'active' : ''}`}
                  onClick={() => handleLimitChange(size)}
                >
                  {t(`pagination.pageSize${size}`)}
                </button>
              ))}
            </div>
            <span className="page-size-label">{t('pagination.jobsPerPage')}</span>
          </div>
        </div>
        <div className="pagination-right">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="pagination-button"
          >
            {t('pagination.previous')}
          </button>
          <span className="pagination-info">
            {t('pagination.pageInfo', { current: currentPage, total: totalPages })}
          </span>
          <span className="pagination-total">
            {t('pagination.totalJobs', { total: totalJobs })}
          </span>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="pagination-button"
          >
            {t('pagination.next')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Matches;
