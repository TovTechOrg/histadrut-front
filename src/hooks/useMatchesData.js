import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchJobs, transformJobsData } from "../api/api";

// Custom hook for managing matches data and filtering
export const useMatchesData = () => {
  const [jobsData, setJobsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastFetch, setLastFetch] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  const [filters, setFilters] = useState({
    companyName: "",
    candidateName: "",
    addedSince: "",
    minRelevanceScore: 7.0,
  });

  const [searchParams, setSearchParams] = useSearchParams();

  const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
  const [currentPage, setCurrentPage] = useState(pageFromUrl);

  // Sync page from URL into local state
  useEffect(() => {
    const urlPage = parseInt(searchParams.get("page") || "1", 10);
    setCurrentPage(urlPage);
  }, [searchParams]);

  const loadJobs = async (page) => {
    try {
      setLoading(true);
      setError(null);

      const apiResponse = await fetchJobs(page);
      const { jobs, pagination } = transformJobsData(apiResponse);

      setJobsData(jobs);
      setTotalPages(pagination.totalPages);
      setLastFetch(new Date());
    } catch {
      setError("Failed to load jobs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs(currentPage);
  }, [currentPage]);

  const goToPage = (page) => {
    const clamped = Math.max(1, Math.min(page, totalPages));
    setSearchParams({ page: clamped.toString() }); // this triggers the URL update + effect
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) goToPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) goToPage(currentPage - 1);
  };

  const updateFilters = (newFilters) => {
    setFilters(newFilters);
  };

  // Filter logic
  const filteredJobs = useMemo(() => {
    let filtered = [...jobsData];

    if (filters.companyName.trim()) {
      filtered = filtered.filter((job) =>
        job.company
          .toLowerCase()
          .includes(filters.companyName.toLowerCase().trim())
      );
    }

    if (filters.candidateName.trim()) {
      filtered = filtered.filter((job) =>
        job.matchedCandidates.some((candidate) =>
          candidate.name
            .toLowerCase()
            .includes(filters.candidateName.toLowerCase().trim())
        )
      );
    }

    if (filters.addedSince) {
      filtered = filtered.filter((job) => job.dateAdded >= filters.addedSince);
    }

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

  return {
    jobsData,
    filteredJobs,
    loading,
    error,
    filters,
    updateFilters,
    lastFetch,
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
  };
};
