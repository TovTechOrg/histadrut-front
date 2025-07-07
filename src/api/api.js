// API base configuration
const API_BASE_URL = "https://cv.pythia-match.com";

// Generic API error handler
const handleApiError = (response, endpoint) => {
  if (!response.ok) {
    const errorMessage = `Failed to fetch ${endpoint.replace("/", "")}: ${
      response.status
    } ${response.statusText}`;
    throw new Error(errorMessage);
  }
  return response;
};

// Generic fetch wrapper with error handling
const apiRequest = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  handleApiError(response, endpoint);
  return await response.json();
};

// Specific API functions
export const fetchStats = async () => {
  return apiRequest("/stats");
};

// Jobs API functions
export const fetchJobs = async () => {
  return apiRequest("/matches2");
};

// Data transformation utilities
export const transformJobsData = (apiResponse) => {
  // Handle case where API response might not have the expected structure
  if (!apiResponse || !apiResponse.jobs || !Array.isArray(apiResponse.jobs)) {
    return [];
  }

  const transformedJobs = apiResponse.jobs.map((job, index) => {
    // Transform each job from API format to our component format
    const transformedJob = {
      // Use _id from API, but fallback to index if missing
      id: job._id || `job-${index}`,

      // Map job fields using exact API field names
      jobTitle: job.job_title || "Unknown Position",
      company: job.company_name || "Unknown Company",

      // Format the discovery date to YYYY-MM-DD for our date filter
      dateAdded: job.discovered
        ? new Date(job.discovered).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],

      // Transform matches array to our expected candidate format
      matchedCandidates: (job.matches || []).map((match, matchIndex) => ({
        // Use helper function to get candidate name
        name: getCandidateName(match.ID_candiate, matchIndex),

        // Score from API
        score: match.score || 0,

        // CV availability based on cv_link presence
        cv: Boolean(match.cv_link),

        // CV download link directly accessible (ensure it's a complete URL)
        cvLink: match.cv_link ? getAbsoluteUrl(match.cv_link) : null,

        // MMR based on mandatory_req boolean
        mmr: match.mandatory_req ? "Yes" : "No",

        // Additional data we might use later
        _metadata: {
          matchId: match._id,
          candidateId: match.ID_candiate,
          coverLetter: match.cover_letter,
          createdAt: match.created_at,
          overview: match.overall_overview,
          strengths: match.strengths || [],
          weaknesses: match.weeknesses || [], // Note: API has typo "weeknesses"
        },
      })),
    };

    return transformedJob;
  });

  return transformedJobs;
};

// Helper function to ensure URLs are absolute
const getAbsoluteUrl = (url) => {
  // If the URL is already absolute (starts with http/https), return as-is
  if (url && (url.startsWith("http://") || url.startsWith("https://"))) {
    return url;
  }
  // Otherwise, prepend the API base URL
  // Make sure we don't have double slashes
  const cleanPath = url.startsWith("/") ? url : `/${url}`;
  return `${API_BASE_URL}${cleanPath}`;
};

// Helper function to get candidate name (we might need to enhance this)
const getCandidateName = (candidateId, matchIndex) => {
  // For now, use the candidate ID as the name
  // TODO: We might need to fetch candidate details from another endpoint
  if (candidateId && candidateId.length > 0) {
    // If candidate ID looks like an actual name, use it
    if (/^[A-Za-z\s]+$/.test(candidateId)) {
      return candidateId;
    }
    // Otherwise, create a friendly name from the ID
    return `Candidate ${candidateId.slice(-4)}`;
  }
  return `Candidate ${matchIndex + 1}`;
};

// Future API functions can be added here
// export const fetchCompanies = async () => {
//   return apiRequest('/companies');
// };
