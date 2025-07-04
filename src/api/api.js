// API base configuration
const API_BASE_URL = "https://cv.pythia-match.com";

// Generic API error handler
const handleApiError = (response) => {
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} - ${response.statusText}`);
  }
  return response;
};

// Generic fetch wrapper with error handling
const apiRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    handleApiError(response);
    return await response.json();
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    throw error;
  }
};

// Specific API functions
export const fetchStats = async () => {
  return apiRequest("/stats");
};

// Future API functions can be added here
// export const fetchJobs = async () => {
//   return apiRequest('/jobs');
// };

// export const fetchCompanies = async () => {
//   return apiRequest('/companies');
// };
