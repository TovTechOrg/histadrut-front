import { useState, useEffect } from "react";
import { fetchCompanies, transformCompaniesData } from "../api/api";

// Custom hook for managing companies data
export const useCompaniesData = () => {
  const [companiesData, setCompaniesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastFetch, setLastFetch] = useState(null);

  const loadCompanies = async () => {
    try {
      setLoading(true);
      setError(null);

      const apiResponse = await fetchCompanies();
      const companies = transformCompaniesData(apiResponse);

      setCompaniesData(companies);
      setLastFetch(new Date());
    } catch (err) {
      console.error("Error loading companies:", err);
      setError("Failed to load companies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  return {
    companiesData,
    loading,
    error,
    lastFetch,
    refetch: loadCompanies,
  };
};
