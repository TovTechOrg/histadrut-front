import { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchJobListings, transformJobListingsData } from "../api/api";

// Custom hook for managing job listings data and filtering
export const useJobsData = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  // Get company filter from URL parameter
  const companyFromUrl = searchParams.get("company");

  // Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(
    companyFromUrl || "All Companies"
  );
  const [selectedStatus, setSelectedStatus] = useState("All Ages"); // Changed from "All Statuses"

  // Sorting state
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  // Fetch jobs from API
  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true);
        setError(null);

        const apiResponse = await fetchJobListings();
        const transformedJobs = transformJobListingsData(apiResponse);

        setJobs(transformedJobs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  // Update selected company when URL parameter changes
  useEffect(() => {
    if (companyFromUrl) {
      setSelectedCompany(companyFromUrl);
    }
  }, [companyFromUrl]);

  // Ensure selectedCompany is valid when jobs change (helps with Strict Mode)
  useEffect(() => {
    if (
      Array.isArray(jobs) &&
      jobs.length > 0 &&
      selectedCompany !== "All Companies"
    ) {
      const availableCompanies = jobs.map((job) => job.company).filter(Boolean);
      if (!availableCompanies.includes(selectedCompany)) {
        setSelectedCompany("All Companies");
      }
    }
  }, [jobs, selectedCompany]);

  // Get unique companies for filter dropdown - memoized to prevent unnecessary re-renders
  const companies = useMemo(() => {
    if (!Array.isArray(jobs) || jobs.length === 0) {
      return ["All Companies"];
    }

    const uniqueCompanies = jobs
      .map((job) => job.company)
      .filter((company) => company && company.trim()) // Filter out null/undefined/empty companies
      .filter((company, index, arr) => arr.indexOf(company) === index); // Remove duplicates manually

    const result = ["All Companies", ...uniqueCompanies];
    return result;
  }, [jobs]);

  const statuses = ["All Ages", "New", "Fresh", "Stale", "Old"];

  // Filter and sort jobs
  const filteredJobs = useMemo(() => {
    // Early return if jobs is not properly initialized
    if (!Array.isArray(jobs) || jobs.length === 0) {
      return [];
    }

    // Start with a fresh copy of jobs
    let filtered = jobs.slice();

    // Apply search filter
    if (searchTerm && searchTerm.trim().length > 0) {
      const searchLower = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(
        (job) =>
          (job.title && job.title.toLowerCase().includes(searchLower)) ||
          (job.company && job.company.toLowerCase().includes(searchLower)) ||
          (job.id && job.id.toString().includes(searchLower))
      );
    }

    // Apply company filter
    if (selectedCompany && selectedCompany !== "All Companies") {
      filtered = filtered.filter((job) => {
        const matches = job.company && job.company === selectedCompany;
        return matches;
      });
    }

    // Apply status filter
    if (selectedStatus && selectedStatus !== "All Ages") {
      filtered = filtered.filter(
        (job) => job.ageCategory && job.ageCategory === selectedStatus
      );
    }

    // Apply sorting
    if (sortField) {
      filtered = filtered.sort((a, b) => {
        let aValue = a[sortField];
        let bValue = b[sortField];

        // Handle date sorting
        if (sortField === "posted") {
          // Convert European format (DD/MM/YYYY) back to Date for sorting
          const parseEuropeanDate = (dateStr) => {
            const [day, month, year] = dateStr.split("/");
            return new Date(year, month - 1, day);
          };
          aValue = parseEuropeanDate(aValue);
          bValue = parseEuropeanDate(bValue);
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

    return filtered;
  }, [
    jobs,
    searchTerm,
    selectedCompany,
    selectedStatus,
    sortField,
    sortDirection,
  ]);

  // Event handlers
  const handleSearchChange = useCallback((term) => {
    setSearchTerm(typeof term === "string" ? term : "");
  }, []);

  const handleCompanyChange = useCallback((company) => {
    if (typeof company === "string" && company.trim()) {
      setSelectedCompany(company);
    } else {
      setSelectedCompany("All Companies");
    }
  }, []);

  const handleStatusChange = useCallback((status) => {
    if (typeof status === "string" && status.trim()) {
      setSelectedStatus(status);
    } else {
      setSelectedStatus("All Statuses");
    }
  }, []);

  const resetFilters = useCallback(() => {
    setSearchTerm("");
    setSelectedCompany("All Companies");
    setSelectedStatus("All Statuses");
    setSortField(null);
    setSortDirection("asc");
  }, []);

  const handleSort = useCallback(
    (field) => {
      if (sortField === field) {
        // Toggle direction if same field
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
      } else {
        // New field, default to ascending
        setSortField(field);
        setSortDirection("asc");
      }
    },
    [sortField, sortDirection]
  );

  return {
    // Data
    jobs,
    filteredJobs,
    loading,
    error,
    companies,
    statuses,

    // Filter state
    searchTerm,
    selectedCompany,
    selectedStatus,

    // Sorting state
    sortField,
    sortDirection,

    // Event handlers
    handleSearchChange,
    handleCompanyChange,
    handleStatusChange,
    handleSort,
    resetFilters,
  };
};
