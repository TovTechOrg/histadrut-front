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

  const loadJobs = async (page, minScore, createdAt, companyName, candidateName) => {
    try {
      setLoading(true);
      setError(null);

      const apiResponse = await fetchJobs(page, minScore, createdAt, companyName, candidateName);

      // If response is empty or missing jobs key, prompt user to upload CV
      if (!apiResponse || !apiResponse.jobs) {
        setError("No jobs found. Please upload your CV to get matches.");
        setJobsData([]);
        setTotalPages(1);
        setLastFetch(new Date());
        return;
      }

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

  // Helper function to format date to MM-DD-YYYY
  const formatDateForAPI = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return null;
    
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${month}-${day}-${year}`;
  };

  useEffect(() => {
    const formattedDate = formatDateForAPI(filters.addedSince);
    loadJobs(
      currentPage, 
      filters.minRelevanceScore, 
      formattedDate, 
      filters.companyName, 
      filters.candidateName
    );
  }, [currentPage, filters.minRelevanceScore, filters.addedSince, filters.companyName, filters.candidateName]);

  const goToPage = (page) => {
    const clamped = Math.max(1, Math.min(page, totalPages));
    setSearchParams({ page: clamped.toString() });
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

  // No frontend filtering needed - all filtering is handled by the backend
  const filteredJobs = jobsData;

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
