import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Modal from "../shared/Modal";
import JobListingsFilters from "./JobListingsFilters";
import JobListingsTable from "./JobListingsTable";
import "./JobsListings.css";

// Icons
import addIcon from "../../assets/icons/add.svg";

const JobsListings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("All Companies");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sorting state
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://cv.pythia-match.com/jobs");
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const data = await response.json();

        // Transform API data to match our table structure
        const transformedJobs = data.map((job, index) => ({
          id: job.job_id,
          title: job.job_title,
          company: job.company_name,
          // DUMMY DATA: Posted date and status are dummy values as requested
          posted: getDummyPostedDate(index),
          status: getDummyStatus(index),
        }));

        setJobs(transformedJobs);
        setFilteredJobs(transformedJobs);

        // Set company filter from URL after jobs are loaded
        const companyFromUrl = searchParams.get("company");
        if (companyFromUrl) {
          // Check if the company exists in the jobs data
          const companyExists = transformedJobs.some(
            (job) => job.company === companyFromUrl
          );
          if (companyExists) {
            setSelectedCompany(companyFromUrl);
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [searchParams]);

  // DUMMY DATA FUNCTIONS: These generate dummy posted dates and statuses
  const getDummyPostedDate = (index) => {
    const dates = [
      "2025-07-14",
      "2025-05-24",
      "2025-06-24",
      "2025-06-06",
      "2025-07-10",
    ];
    return dates[index % dates.length];
  };

  const getDummyStatus = (index) => {
    const statuses = ["Expired", "Draft", "Live", "Pending Approval"];
    return statuses[index % statuses.length];
  };

  // Filter jobs based on search and filters
  useEffect(() => {
    let filtered = jobs;

    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.id.toString().includes(searchTerm)
      );
    }

    if (selectedCompany !== "All Companies") {
      filtered = filtered.filter((job) => job.company === selectedCompany);
    }

    if (selectedStatus !== "All Statuses") {
      filtered = filtered.filter((job) => job.status === selectedStatus);
    }

    // Apply sorting
    if (sortField) {
      filtered = filtered.sort((a, b) => {
        let aValue = a[sortField];
        let bValue = b[sortField];

        // Handle date sorting
        if (sortField === "posted") {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }
        // Handle string sorting
        else if (typeof aValue === "string") {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        if (sortDirection === "asc") {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    }

    setFilteredJobs(filtered);
  }, [
    searchTerm,
    selectedCompany,
    selectedStatus,
    jobs,
    sortField,
    sortDirection,
  ]);

  // Sorting handler
  const handleSort = (field) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // New field, default to ascending
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Handle company filter change and update URL
  const handleCompanyChange = (company) => {
    setSelectedCompany(company);

    // Update URL parameters
    const newSearchParams = new URLSearchParams(searchParams);
    if (company === "All Companies") {
      newSearchParams.delete("company");
    } else {
      newSearchParams.set("company", company);
    }
    setSearchParams(newSearchParams);
  };

  // Get unique companies for filter dropdown
  const companies = [
    "All Companies",
    ...new Set(jobs.map((job) => job.company)),
  ];
  const statuses = [
    "All Statuses",
    "Live",
    "Draft",
    "Expired",
    "Pending Approval",
  ];

  // Modal handlers
  const handleAction = (action, job = null) => {
    setModalAction(action);
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalAction("");
    setSelectedJob(null);
  };

  // Handle URL parameter changes
  useEffect(() => {
    const companyFromUrl = searchParams.get("company");
    if (companyFromUrl) {
      // Check if the company exists in the jobs data
      const companyExists = jobs.some((job) => job.company === companyFromUrl);
      if (companyExists && selectedCompany !== companyFromUrl) {
        setSelectedCompany(companyFromUrl);
      }
    } else if (selectedCompany !== "All Companies") {
      // If no company parameter in URL, reset to "All Companies"
      setSelectedCompany("All Companies");
    }
  }, [searchParams, jobs, selectedCompany]);

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
        onSearchChange={setSearchTerm}
        selectedCompany={selectedCompany}
        onCompanyChange={handleCompanyChange}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        companies={companies}
        statuses={statuses}
      />

      <JobListingsTable
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
