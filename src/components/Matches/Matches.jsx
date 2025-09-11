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
    currentPage,
    totalPages,
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
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          {t('pagination.next')}
        </button>
      </div>
    </section>
  );
};

export default Matches;
