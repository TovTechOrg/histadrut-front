import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchJobListings, transformJobListingsData } from "../api/api";
import { useDebounce } from "./useDebounce";

// Debounce timeout for search filters
const DEBOUNCE_TIMEOUT = 500;

// Custom hook for managing job listings data with server-side filtering and pagination
export const useJobsData = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();

  // Local state for input values (for immediate UI updates)
  const [localJobTitle, setLocalJobTitle] = useState(searchParams.get("jobTitleTerm") || "");
  const [localJobDescription, setLocalJobDescription] = useState(searchParams.get("jobDescriptionTerm") || "");
  const [localLimit, setLocalLimit] = useState(parseInt(searchParams.get("limit")) || 20);

  // Get company filter from URL parameter for backwards compatibility
  const companyFromUrl = searchParams.get("company");

  // Always derive filters from searchParams
  const filters = useMemo(() => {
    const params = Object.fromEntries([...searchParams]);
    return {
      jobTitleTerm: params.jobTitleTerm || "",
      jobDescriptionTerm: params.jobDescriptionTerm || "",
      selectedCompany: params.selectedCompany || companyFromUrl || "",
      selectedStatus: params.selectedStatus || "All Ages",
      limit: parseInt(params.limit) || 20,
    };
  }, [searchParams, companyFromUrl]);

  // Ensure filters is always defined before using it
  const safeFilters = filters || {
    jobTitleTerm: "",
    jobDescriptionTerm: "",
    selectedCompany: "",
    selectedStatus: "All Ages",
    limit: 20,
  };

  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  // Debounced function to update URL parameters
  const debouncedSetParam = useDebounce((field, value) => {
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);
      if (value && value !== "") {
        params.set(field, value);
      } else {
        params.delete(field);
      }
      // Remove all empty params
      for (const key of Array.from(params.keys())) {
        if (!params.get(key)) {
          params.delete(key);
        }
      }
      // Always reset page to 1 on filter change
      params.set("page", "1");
      return params;
    });
  }, DEBOUNCE_TIMEOUT);

  // Helper function to parse age category into min/max days
  const parseAgeCategory = (ageCategory) => {
    if (!ageCategory || ageCategory === "All Ages") {
      return { minDaysOld: null, maxDaysOld: null };
    }
    
    // Parse different age formats
    if (ageCategory === "1 day") {
      return { minDaysOld: 0, maxDaysOld: 1 };
    } else if (ageCategory === "2-5 days") {
      return { minDaysOld: 2, maxDaysOld: 5 };
    } else if (ageCategory === "6-14 days") {
      return { minDaysOld: 6, maxDaysOld: 14 };
    } else if (ageCategory === "15+ days") {
      return { minDaysOld: 15, maxDaysOld: null };
    }
    
    return { minDaysOld: null, maxDaysOld: null };
  };

  const loadJobs = async (page, limit, companyName, jobTitle, searchString, selectedStatus) => {
    try {
      setLoading(true);
      setError(null);

      const { minDaysOld, maxDaysOld } = parseAgeCategory(selectedStatus);
      
      const apiResponse = await fetchJobListings(
        page, 
        limit, 
        companyName, 
        jobTitle, 
        searchString, 
        minDaysOld, 
        maxDaysOld
      );

      if (!apiResponse) {
        setError("No response received from server");
        setJobs([]);
        setTotalPages(1);
        setTotalJobs(0);
        return;
      }

      const { jobs: jobsData, pagination } = transformJobListingsData(apiResponse);
      setJobs(jobsData);
      setTotalPages(pagination.totalPages);
      setTotalJobs(pagination.totalJobs);
    } catch (err) {
      setError(err.message || "Failed to load jobs. Please try again later.");
      setJobs([]);
      setTotalPages(1);
      setTotalJobs(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs(
      currentPage,
      safeFilters.limit,
      safeFilters.selectedCompany,
      safeFilters.jobTitleTerm,
      safeFilters.jobDescriptionTerm,
      safeFilters.selectedStatus
    );
  }, [
    currentPage,
    safeFilters.limit,
    safeFilters.selectedCompany,
    safeFilters.jobTitleTerm,
    safeFilters.jobDescriptionTerm,
    safeFilters.selectedStatus,
  ]);

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

  // Sync local state with URL params if they change externally
  useEffect(() => {
    setLocalJobTitle(searchParams.get("jobTitleTerm") || "");
    setLocalJobDescription(searchParams.get("jobDescriptionTerm") || "");
    setLocalLimit(parseInt(searchParams.get("limit")) || 20);
  }, [searchParams]);

  // Get unique companies and statuses for filter dropdowns from current data
  const companies = useMemo(() => {
    if (!Array.isArray(jobs) || jobs.length === 0) {
      return [];
    }

    const uniqueCompanies = jobs
      .map((job) => job.company)
      .filter((company) => company && company.trim())
      .filter((company, index, arr) => arr.indexOf(company) === index);

    return uniqueCompanies;
  }, [jobs]);

  const statuses = useMemo(() => {
    const ageCategories = ["All Ages", "1 day", "2-5 days", "6-14 days", "15+ days"];
    return ageCategories;
  }, []);

  // Event handlers for backwards compatibility
  const handleJobTitleChange = (term) => {
    setLocalJobTitle(term);
    debouncedSetParam("jobTitleTerm", term);
  };

  const handleJobDescriptionChange = (term) => {
    setLocalJobDescription(term);
    debouncedSetParam("jobDescriptionTerm", term);
  };

  const handleCompanyChange = (company) => {
    updateFilters({ selectedCompany: company });
  };

  const handleStatusChange = (status) => {
    updateFilters({ selectedStatus: status });
  };

  const handleLimitChange = (limit) => {
    setLocalLimit(limit);
    updateFilters({ limit: limit });
  };

  const handleSort = (field) => {
    // For now, sorting will be handled by the backend in future updates
    // This is kept for backwards compatibility
    console.log("Sorting by", field);
  };

  const resetFilters = () => {
    setSearchParams({ page: "1" });
  };

  // All filtering is now handled by the backend
  const filteredJobs = jobs;

  return {
    // Data
    jobs,
    filteredJobs,
    loading,
    error,
    companies,
    statuses,

    // Pagination
    currentPage,
    totalPages,
    totalJobs,
    goToPage,
    goToNextPage,
    goToPreviousPage,

    // Filter state (for backwards compatibility)
    jobTitleTerm: localJobTitle,
    jobDescriptionTerm: localJobDescription,
    selectedCompany: safeFilters.selectedCompany,
    selectedStatus: safeFilters.selectedStatus,

    // Sorting state (kept for backwards compatibility)
    sortField: null,
    sortDirection: "asc",

    // Event handlers
    handleJobTitleChange,
    handleJobDescriptionChange,
    handleCompanyChange,
    handleStatusChange,
    handleLimitChange,
    handleSort,
    resetFilters,
    updateFilters,
    
    // Filters object for direct access
    filters: {
      ...safeFilters,
      limit: localLimit
    },
  };
};
