import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../shared/Modal";
import JobListingsFilters from "./JobListingsFilters";
import JobListingsTable from "./JobListingsTable";
import { useJobsData } from "../../hooks/useJobsData";
import { useAuth } from "../../hooks/useAuth";
import "./JobsListings.css";

import addIcon from "../../assets/icons/add.svg";

const JobsListings = () => {
  const { user } = useAuth();
  const {
    filteredJobs,
    loading,
    error,
    companies,
    statuses,
    searchTerm,
    selectedCompany,
    selectedStatus,
    sortField,
    sortDirection,
    handleSearchChange,
    handleCompanyChange,
    handleStatusChange,
    handleSort,
  } = useJobsData();

  const isAdmin = user?.role === "admin";
  const navigate = useNavigate();

  return (
    <section className="main-page jobs-listings">
      <div className="jobs-listings__header">
  <h1 className="page__title">Job Listings Management</h1>
        {isAdmin && (
          <button
            className="jobs-listings__add-btn"
            onClick={() => navigate("/jobs/add")}
          >
            <img src={addIcon} alt="Add" className="btn-icon" />
            Add New Job
          </button>
        )}
      </div>

      <JobListingsFilters
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        selectedCompany={selectedCompany}
        onCompanyChange={handleCompanyChange}
        selectedStatus={selectedStatus}
        onStatusChange={handleStatusChange}
        companies={companies}
        statuses={statuses}
      />

      <JobListingsTable
        key={`table-${filteredJobs.length}-${selectedCompany}-${selectedStatus}`}
        jobs={filteredJobs}
        loading={loading}
        error={error}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={handleSort}
        showActions={isAdmin}
        onJobTitleClick={(job) => {
          // Redirect to /admin/matches for admins, /user/matches for regular users
          const params = new URLSearchParams();
          if (job.company) params.set("companyName", job.company);
          if (job.title) params.set("job_title", job.title);
          const base = isAdmin ? "/admin/matches" : "/user/matches";
          const url = `${base}?${params.toString()}`;
          navigate(url);
        }}
      />
  {/* Removed modal for add job, now handled by AddJob page */}
    </section>
  );
};

export default JobsListings;
