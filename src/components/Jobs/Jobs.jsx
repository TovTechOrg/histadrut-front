import React from "react";
import JobFilters from "./JobFilters";
import JobTable from "./JobTable";
import { useJobsData } from "../../hooks/useJobsData";
import "./Jobs.css";

const Jobs = () => {
  const { filteredJobs, loading, error, filters, updateFilters } =
    useJobsData();

  return (
    <section className="jobs-page">
      <div className="jobs-header">
        <h1 className="jobs-title">Admin Job Match Dashboard</h1>
        <p className="jobs-subtitle">
          Aggregated view of manually sourced jobs and matched candidates.
        </p>
      </div>

      <JobFilters filters={filters} onFiltersChange={updateFilters} />

      <JobTable jobs={filteredJobs} loading={loading} error={error} />
    </section>
  );
};

export default Jobs;
