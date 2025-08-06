const API_BASE_URL = "https://cv.pythia-match.com";

// Request password reset: POST /reset_password with x-www-form-urlencoded
export const resetPassword = async (email) => {
  const body = new URLSearchParams();
  body.append("email", email);
  const response = await fetch(`${API_BASE_URL}/reset_password`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });
  if (!response.ok) throw new Error("Failed to send reset email");
  return response.json();
};

// Set new password: POST /reset_password/<token> with x-www-form-urlencoded
export const setNewPassword = async (token, password, confirmPassword) => {
  const body = new URLSearchParams();
  body.append("password", password);
  body.append("confirm_password", confirmPassword);
  const response = await fetch(`${API_BASE_URL}/reset_password/${encodeURIComponent(token)}`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });
  if (!response.ok) throw new Error("Failed to set new password");
  return response.json();
};
// Fetch user info from backend session (cookie)
export const fetchUserFromSession = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/me`, {
      credentials: "include",
    });
    
    if (!res.ok) return null;
    const data = await res.json();
    
    // Expecting: { message, status_code, user: { ... } }
    if (data && data.user && data.user.email && data.user.role) {
      // Optionally include other fields like name, id, cv_status
      const userObject = {
        email: data.user.email,
        role: data.user.role,
        name: data.user.name,
        id: data.user.id,
        cv_status: data.user.cv_status,
      };
      return userObject;
    }
    return null;
  } catch (error) {
    return null;
  }
};

// Backend logout
export const backendLogout = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/logout`, {
      method: "GET",
      credentials: "include",
    });
    
    if (!response.ok) {
      throw new Error(`Logout failed: ${response.status}`);
    }
    
    return { success: true };
  } catch (error) {
    console.error("Backend logout error:", error);
    throw error; // Re-throw so caller can handle it
  }
};
// Upload CV as form data
export const uploadCV = async (file) => {
  const formData = new FormData();
  formData.append("cv", file);
  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || "Upload failed. Please try again.");
  }
  return await response.json().catch(() => ({}));
};

// Real login API call
export const loginUser = async (email, password) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  const data = await response.json().catch(() => ({}));
  return { status: response.status, data };
};

// Real register API call
export const registerUser = async (email, password, name) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);
  formData.append("name", name);
  
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    body: formData,
  });
  const data = await response.json().catch(() => ({}));
  return { status: response.status, data };
};

const handleApiError = (response, endpoint) => {
  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${response.status}`);
  }
  return response;
};

const apiRequest = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    credentials: "include",
    ...options,
  });
  handleApiError(response, endpoint);
  return await response.json();
};

export const fetchStats = async () => apiRequest("/stats");
export const fetchJobs = async (page = 1, minScore) => {
  let url = `/matches2?page=${page}`;
  if (typeof minScore === "number") {
    url += `&min_score=${minScore}`;
  }
  return apiRequest(url);
};
export const fetchJobListings = async () => apiRequest("/jobs");
export const fetchCompanies = async () => apiRequest("/companies");

export const transformJobsData = (apiResponse) => {
  const jobs = apiResponse.jobs.map((job, index) => {
    // Check if link is in the first match (assuming all matches have the same job link)
    const jobLink =
      job.link ||
      (job.matches && job.matches[0] && job.matches[0].link) ||
      null;

    return {
      id: job._id || `job-${index}`,
      jobTitle: job.job_title || "Unknown Position",
      company: job.company_name || "Unknown Company",
      dateAdded: job.discovered
        ? new Date(job.discovered).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      jobDescription: job.job_description || "No description available",
      link: jobLink,
      matchedCandidates: (job.matches || []).map((match, matchIndex) => ({
        name: match.name || `Candidate ${matchIndex + 1}`,
        score: match.score || 0,
        cv: !!match.cv_link,
        cvLink: match.cv_link ? getAbsoluteUrl(match.cv_link) : null,
        mmr: match.mandatory_req ? "YES" : "NO",
        _metadata: {
          matchId: match._id,
          candidateId: match.ID_candiate,
          coverLetter: match.cover_letter,
          createdAt: match.created_at,
          overview: match.overall_overview,
          strengths: match.strengths || [],
          weaknesses: match.weeknesses || match.weaknesses || [],
        },
      })),
    };
  });

  return {
    jobs,
    pagination: {
      currentPage: apiResponse.pagination?.current_page ?? 1,
      totalPages: apiResponse.pagination?.total_pages ?? 1,
    },
  };
};

// Age category thresholds (in days)
const AGE_THRESHOLDS = {
  NEW: 1,
  FRESH: 5,
  STALE: 14,
};

// Helper function to calculate age category based on days
const getAgeCategory = (daysOld) => {
  if (daysOld <= AGE_THRESHOLDS.NEW) return "1 day";
  if (daysOld <= AGE_THRESHOLDS.FRESH) return "2-5 days";
  if (daysOld <= AGE_THRESHOLDS.STALE) return "6-14 days";
  return "15+ days";
};

export const transformJobListingsData = (apiResponse) => {
  return apiResponse.map((job, index) => {
    const daysAgo = job.days_old || 0;
    const ageCategory = getAgeCategory(daysAgo);

    return {
      id: job.job_id || `job-${index}`,
      title: job.job_title || "Unknown Position",
      company: job.company_name || "Unknown Company",
      posted: job.posted || new Date().toISOString(),
      age: `${daysAgo} days`,
      ageCategory: ageCategory,
      ageDisplay: `${daysAgo} days`,
    };
  });
};

export const transformStatsData = (apiResponse) => ({
  candidates: apiResponse.Number_of_candidtes ?? 0,
  jobs: apiResponse.Number_of_jobs ?? 0,
  jobsLastDay: apiResponse.Number_of_jobs_last_day ?? 0,
  jobsLastWeek: apiResponse.Number_of_jobs_last_week ?? 0,
  matches: apiResponse.Number_of_matches ?? 0,
});

export const transformCompaniesData = (apiResponse) => {
  return Object.entries(apiResponse).map(([companyName, jobsCount], index) => ({
    id: index + 1,
    name: companyName,
    jobsCount: jobsCount || 0,
  }));
};

const getAbsoluteUrl = (url) => {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${API_BASE_URL}${url.startsWith("/") ? url : `/${url}`}`;
};
