import React from "react";
import MatchesFilters from "./MatchesFilters";
import MatchesTable from "./MatchesTable";
import { useMatchesData } from "../../hooks/useMatchesData";
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

  return (
    <section className="matches-page">
      <div className="matches-header">
        <h1 className="matches-title">Job Match Dashboard</h1>
        <p className="matches-subtitle">
          Aggregated view of manually sourced jobs and matched candidates.
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
          ← Previous
        </button>
        <span className="pagination-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next →
        </button>
      </div>
    </section>
  );
};

export default Matches;
