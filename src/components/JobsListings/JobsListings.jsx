import React, { useState, useCallback } from "react";
import Modal from "../shared/Modal";
import JobListingsFilters from "./JobListingsFilters";
import JobListingsTable from "./JobListingsTable";
import { useJobsData } from "../../hooks/useJobsData";
import "./JobsListings.css";

import addIcon from "../../assets/icons/add.svg";

const JobsListings = () => {
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);

  const handleAction = useCallback((action, job = null) => {
    setModalAction(action);
    setSelectedJob(job);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setModalAction("");
    setSelectedJob(null);
  }, []);

  return (
    <section className="jobs-listings">
      <div className="jobs-listings__header">
        <h1 className="jobs-listings__title">Job Listings Management</h1>
        <button
          className="jobs-listings__add-btn"
          onClick={() => handleAction("add")}
        >
          <img src={addIcon} alt="Add" className="btn-icon" />
          Add New Job
        </button>
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
        onAction={handleAction}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={handleSort}
      />

      {/* Action Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={`${
          modalAction.charAt(0).toUpperCase() + modalAction.slice(1)
        } Job`}
        className="jobs-listings__modal"
      >
        <div className="modal-content">
          <p>
            <strong>Action:</strong>{" "}
            {modalAction.charAt(0).toUpperCase() + modalAction.slice(1)}
          </p>
          {selectedJob ? (
            <div className="job-details">
              <p>
                <strong>Job ID:</strong> {selectedJob.id}
              </p>
              <p>
                <strong>Title:</strong> {selectedJob.title}
              </p>
              <p>
                <strong>Company:</strong> {selectedJob.company}
              </p>
              <p>
                <strong>Status:</strong> {selectedJob.status}
              </p>
              <p>
                <strong>Posted:</strong> {selectedJob.posted}
              </p>
            </div>
          ) : (
            <p>Creating a new job...</p>
          )}
          <div className="modal-actions">
            <button onClick={closeModal} className="btn-secondary">
              Close
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default JobsListings;
