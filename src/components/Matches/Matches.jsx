import React from "react";
import MatchesFilters from "./MatchesFilters";
import MatchesTable from "./MatchesTable";
import { useJobsData } from "../../hooks/useJobsData";
import "./Matches.css";

const Matches = () => {
  const { filteredJobs, loading, error, filters, updateFilters } =
    useJobsData();

  return (
    <section className="matches-page">
      <div className="matches-header">
        <h1 className="matches-title">Admin Job Match Dashboard</h1>
        <p className="matches-subtitle">
          Aggregated view of manually sourced jobs and matched candidates.
        </p>
      </div>

      <MatchesFilters filters={filters} onFiltersChange={updateFilters} />

      <MatchesTable jobs={filteredJobs} loading={loading} error={error} />
    </section>
  );
};

export default Matches;
