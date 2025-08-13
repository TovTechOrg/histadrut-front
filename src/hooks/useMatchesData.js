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

  const [searchParams, setSearchParams] = useSearchParams();

  // Always derive filters from searchParams
  const filters = useMemo(() => {
    const params = Object.fromEntries([...searchParams]);
    return {
      companyName: params.companyName || "",
      job_title: params.job_title || "",
      candidateName: params.candidateName || "",
      addedSince: params.addedSince || "",
      minRelevanceScore: params.minRelevanceScore ? parseFloat(params.minRelevanceScore) : 7.0,
    };
  }, [searchParams]);

  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const loadJobs = async (page, minScore, createdAt, companyName, candidateName, job_title) => {
    try {
      setLoading(true);
      setError(null);

      const apiResponse = await fetchJobs(page, minScore, createdAt, companyName, candidateName, job_title);

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
      filters.candidateName,
      filters.job_title
    );
  }, [currentPage, filters.minRelevanceScore, filters.addedSince, filters.companyName, filters.candidateName, filters.job_title]);

  const goToPage = (page) => {
    const clamped = Math.max(1, Math.min(page, totalPages));
    setSearchParams({ ...Object.fromEntries([...searchParams]), page: clamped.toString() });
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) goToPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) goToPage(currentPage - 1);
  };

  // Update filters by updating the URL search params
  const updateFilters = (newFilters) => {
    setSearchParams({ ...Object.fromEntries([...searchParams]), ...newFilters, page: "1" });
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

