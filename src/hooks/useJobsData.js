import { useState, useEffect, useMemo } from "react";
import { fetchJobs, transformJobsData } from "../api/api";

// Custom hook for managing jobs data and filtering
export const useJobsData = () => {
  const [jobsData, setJobsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastFetch, setLastFetch] = useState(null);
  const [filters, setFilters] = useState({
    companyName: "",
    candidateName: "",
    addedSince: "",
    minRelevanceScore: 7.0,
  });

  // Load jobs data from API
  const loadJobs = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch from API
      const apiResponse = await fetchJobs();
      const transformedData = transformJobsData(apiResponse);

      // Update state
      setJobsData(transformedData);
      setLastFetch(new Date());
    } catch {
      setError("Failed to load jobs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  // Memoized filtered jobs to prevent unnecessary recalculations
  const filteredJobs = useMemo(() => {
    let filtered = [...jobsData];

    // Apply company name filter
    if (filters.companyName.trim()) {
      filtered = filtered.filter((job) =>
        job.company
          .toLowerCase()
          .includes(filters.companyName.toLowerCase().trim())
      );
    }

    // Apply candidate name filter
    if (filters.candidateName.trim()) {
      filtered = filtered.filter((job) =>
        job.matchedCandidates.some((candidate) =>
          candidate.name
            .toLowerCase()
            .includes(filters.candidateName.toLowerCase().trim())
        )
      );
    }

    // Apply date filter
    if (filters.addedSince) {
      filtered = filtered.filter((job) => job.dateAdded >= filters.addedSince);
    }

    // Apply minimum relevance score filter
    filtered = filtered
      .map((job) => ({
        ...job,
        matchedCandidates: job.matchedCandidates.filter(
          (candidate) => candidate.score >= filters.minRelevanceScore
        ),
      }))
      .filter((job) => job.matchedCandidates.length > 0);

    return filtered;
  }, [jobsData, filters]);

  const updateFilters = (newFilters) => {
    setFilters(newFilters);
  };

  return {
    jobsData,
    filteredJobs,
    loading,
    error,
    filters,
    updateFilters,
    lastFetch,
  };
};
