import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../shared/Modal";
import JobListingsFilters from "./JobListingsFilters";
import JobListingsTable from "./JobListingsTable";
import { useJobsData } from "../../hooks/useJobsData";
import { deleteJobAndMatches } from "../../api/api";
import { useAuth } from "../../hooks/useAuth";
import "./JobsListings.css";

import addIcon from "../../assets/icons/add.svg";
import JobDescriptionModal from "../shared/JobDescriptionModal";

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
  const [viewJob, setViewJob] = useState(null);
  const [deleteJob, setDeleteJob] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");

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
        onAction={(action, job) => {
          if (action === "view") setViewJob(job);
          if (action === "delete") setDeleteJob(job);
        }}
      />
  <JobDescriptionModal isOpen={!!viewJob} job={viewJob} onClose={() => setViewJob(null)} />

  {/* Delete confirmation modal */}
  <Modal
    isOpen={!!deleteJob}
    onClose={() => {
      setDeleteJob(null);
      setDeleteError("");
    }}
    title="Delete Job and Matches"
  >
    <div style={{ padding: '2rem 2.5rem 1.5rem 2.5rem' }}>
      <p style={{ fontWeight: 500, color: '#b71c1c', marginBottom: 18 }}>
        Are you sure you want to delete this job and <b>all of its matches</b>? This action cannot be undone.
      </p>
      <div style={{ margin: '1.2rem 0 1.2rem 0', color: '#333', fontSize: '1.05rem', lineHeight: 1.7 }}>
  <b>Job ID:</b> {deleteJob?.job_id} <br />
        <b>Job:</b> {deleteJob?.title} <br />
        <b>Company:</b> {deleteJob?.company}
      </div>
      {deleteError && <div style={{ color: '#e74c3c', marginBottom: 8 }}>{deleteError}</div>}
      <div style={{ display: 'flex', gap: 16, justifyContent: 'flex-end', marginTop: 10 }}>
        <button
          onClick={() => {
            setDeleteJob(null);
            setDeleteError("");
          }}
          style={{ padding: '8px 18px', background: '#eee', border: 'none', borderRadius: 4, cursor: 'pointer' }}
          disabled={deleteLoading}
        >
          Cancel
        </button>
        <button
          onClick={async () => {
            setDeleteLoading(true);
            setDeleteError("");
            try {
              await deleteJobAndMatches(deleteJob.id);
              setDeleteJob(null);
              // Optionally, show a success message here
              window.location.reload(); // simplest way to refresh jobs
            } catch (err) {
              setDeleteError(err.message || "Failed to delete job.");
            } finally {
              setDeleteLoading(false);
            }
          }}
          style={{ padding: '8px 18px', background: '#e74c3c', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 600 }}
          disabled={deleteLoading}
        >
          {deleteLoading ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  </Modal>
    </section>
  );
};

export default JobsListings;
