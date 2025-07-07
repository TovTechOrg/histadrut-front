import React, { useState, useEffect } from "react";
import JobFilters from "./JobFilters";
import JobTable from "./JobTable";
import "./Jobs.css";

// Mock data for now - will be replaced with API call
const mockJobsData = [
  {
    id: 1,
    jobTitle: "Data Scientist Position",
    company: "Example Tech Ltd.",
    dateAdded: "2025-04-22",
    matchedCandidates: [
      { name: "Shy", score: 8.5, cv: true, mmr: "Yes" },
      { name: "Noam", score: 7.8, cv: true, mmr: "No" },
    ],
  },
  {
    id: 2,
    jobTitle: "Junior Python Developer",
    company: "Startup Innovations Inc.",
    dateAdded: "2025-04-21",
    matchedCandidates: [{ name: "Gill", score: 9.1, cv: true, mmr: "Yes" }],
  },
  {
    id: 3,
    jobTitle: "Frontend Engineer (React)",
    company: "Example Tech Ltd.",
    dateAdded: "2025-04-20",
    matchedCandidates: [
      { name: "Adi", score: 8.8, cv: true, mmr: "Yes" },
      { name: "Shy", score: 7.2, cv: true, mmr: "No" },
    ],
  },
  {
    id: 4,
    jobTitle: "DevOps Engineer",
    company: "Cloud Solutions Co.",
    dateAdded: "2025-04-19",
    matchedCandidates: [{ name: "Noam", score: 8.1, cv: true, mmr: "Yes" }],
  },
];

const Jobs = () => {
  const [jobsData, setJobsData] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    companyName: "",
    candidateName: "",
    addedSince: "",
    minRelevanceScore: 7.0,
  });

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchJobs = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        setJobsData(mockJobsData);
        setFilteredJobs(mockJobsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Apply filters whenever filters or jobsData change
  useEffect(() => {
    let filtered = [...jobsData];

    if (filters.companyName) {
      filtered = filtered.filter((job) =>
        job.company.toLowerCase().includes(filters.companyName.toLowerCase())
      );
    }

    if (filters.candidateName) {
      filtered = filtered.filter((job) =>
        job.matchedCandidates.some((candidate) =>
          candidate.name
            .toLowerCase()
            .includes(filters.candidateName.toLowerCase())
        )
      );
    }

    if (filters.addedSince) {
      filtered = filtered.filter((job) => job.dateAdded >= filters.addedSince);
    }

    // Filter by minimum relevance score
    filtered = filtered
      .map((job) => ({
        ...job,
        matchedCandidates: job.matchedCandidates.filter(
          (candidate) => candidate.score >= filters.minRelevanceScore
        ),
      }))
      .filter((job) => job.matchedCandidates.length > 0);

    setFilteredJobs(filtered);
  }, [filters, jobsData]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <section className="jobs-page">
      <div className="jobs-header">
        <h1 className="jobs-title">Admin Job Match Dashboard</h1>
        <p className="jobs-subtitle">
          Aggregated view of manually sourced jobs and matched candidates.
        </p>
      </div>

      <JobFilters filters={filters} onFiltersChange={handleFiltersChange} />

      <JobTable jobs={filteredJobs} loading={loading} error={error} />
    </section>
  );
};

export default Jobs;
