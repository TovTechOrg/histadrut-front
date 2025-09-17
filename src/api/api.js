const API_BASE_URL = "https://cv.pythia-match.com";

// Fetch report matches for reporting page
export const fetchReportMatches = async () => {
  return apiRequest("/report_matches");
};
// Delete job and its matches: DELETE /delete_job with form data (job_id)
export const deleteJobAndMatches = async (job_id) => {
  const formData = new FormData();
  formData.append("job_id", job_id);
  const response = await fetch(`${API_BASE_URL}/delete_job`, {
    method: "DELETE",
    credentials: "include",
    body: formData,
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || "Failed to delete job and matches");
  }
  return await response.json();
};

// Get all user: GET /users
export const fetchUsers = async () => {
  const res = await fetch(`${API_BASE_URL}/users`, { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch users");
  return await res.json();
};

// Delete user: DELETE /delete_user with form data (_id)
export const deleteUser = async (user_id) => {
  const formData = new FormData();
  formData.append("user_id", user_id);
  const response = await fetch(`${API_BASE_URL}/delete_user`, {
    method: "DELETE",
    credentials: "include",
    body: formData,
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || "Failed to delete user");
  }
  return await response.json();
};

// Mark a match as sent or pending
export const setMatchSent = async (match_id, action = "sent") => {
  const formData = new FormData();
  formData.append("match_id", match_id);
  formData.append("action", action);
  const response = await fetch(`${API_BASE_URL}/set_match_sent`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || "Failed to mark match as sent");
  }
  return await response.json();
};

// Unsubscribe from job offer emails
export const unsubscribeFromEmails = async (email) => {
  const url = `${API_BASE_URL}/unsubscribe`;
  const formData = new FormData();
  formData.append("email", email);
  const response = await fetch(url, {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || "Failed to unsubscribe");
  }
  return await response.json();
};
// Resubscribe to job offer emails
export const resubscribeToEmails = async (email) => {
  const url = `${API_BASE_URL}/resubscribe`;
  const formData = new FormData();
  formData.append("email", email);
  const response = await fetch(url, {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || "Failed to resubscribe");
  }
  return await response.json();
};
// Delete company: DELETE /delete_company_data with form data
export const deleteCompanyData = async (companyName) => {
  const formData = new FormData();
  formData.append("company_name", companyName);
  const response = await fetch(`${API_BASE_URL}/delete_company_data`, {
    method: "DELETE",
    credentials: "include",
    body: formData,
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || "Failed to delete company");
  }
  return await response.json();
};
// Add new job: POST /upload_job_details with JSON body
export const uploadJobDetails = async (jobData) => {
  const formData = new FormData();
  Object.entries(jobData).forEach(([key, value]) => {
    formData.append(key, value ?? "");
  });
  const response = await fetch(`${API_BASE_URL}/upload_job_details`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || "Failed to upload job details");
  }
  return await response.json();
};

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
// Upload CV as form data
export const uploadCV = async (file) => {
  const formData = new FormData();
  formData.append("cv", file);

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Upload failed. Please try again.");
  }

  return data;
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

export const fetchCompaniesToday = async () => apiRequest("/get_companies_today");

export const fetchJobs = async (page = 1, limit = 20, minScore, createdAt, companyName, candidateName, job_title, job_id, match_status, locations) => {
  let url = `/matches2?page=${page}&limit=${limit}`;
  if (typeof minScore === "number") {
    url += `&min_score=${minScore}`;
  }
  if (createdAt) {
    url += `&created_at=${createdAt}`;
  }
  if (companyName && companyName.trim()) {
    url += `&company_name=${encodeURIComponent(companyName.trim())}`;
  }
  if (candidateName && candidateName.trim()) {
    url += `&candidate_name=${encodeURIComponent(candidateName.trim())}`;
  }
  if (job_title && job_title.trim()) {
    url += `&job_title=${encodeURIComponent(job_title.trim())}`;
  }
  if (job_id && job_id.trim()) {
    url += `&job_id=${encodeURIComponent(job_id.trim())}`;
  }
  if (match_status && match_status.trim()) {
    url += `&match_status=${encodeURIComponent(match_status.trim())}`;
  }
  if (locations && locations.trim()) {
    // Format locations: replace "comma space" with just "comma" but preserve other spaces
    const formattedLocations = locations.trim().replace(/,\s+/g, ',');
    url += `&locations=${encodeURIComponent(formattedLocations)}`;
  }
  return apiRequest(url);
};
export const fetchJobListings = async (page = 1, limit = 20, companyName, jobTitle, searchString, minDaysOld, maxDaysOld) => {
  let url = `/jobs2?page=${page}&limit=${limit}`;
  
  if (companyName && companyName.trim()) {
    url += `&company_name=${encodeURIComponent(companyName.trim())}`;
  }
  if (jobTitle && jobTitle.trim()) {
    url += `&job_title=${encodeURIComponent(jobTitle.trim())}`;
  }
  if (searchString && searchString.trim()) {
    url += `&search=${encodeURIComponent(searchString.trim())}`;
  }
  if (typeof minDaysOld === "number") {
    url += `&min_days_old=${minDaysOld}`;
  }
  if (typeof maxDaysOld === "number") {
    url += `&max_days_old=${maxDaysOld}`;
  }
  
  return apiRequest(url);
};
export const fetchCompanies = async () => apiRequest("/companies");
export const fetchLocations = async () => apiRequest("/locations");

export const transformJobsData = (apiResponse) => {
  // Check if apiResponse has the expected structure
  if (!apiResponse) {
    throw new Error("No response received from server");
  }
  
  if (!apiResponse.jobs) {
    throw new Error("Invalid response format: missing jobs array");
  }
  
  // Debug log for discovered date and company for first 10 jobs
  if (apiResponse && Array.isArray(apiResponse.jobs)) {
  }

  // Format discovered date as DD/MM/YYYY
  function formatDateDDMMYYYY(dateStr) {
    if (!dateStr) return '';
    let d = new Date(dateStr);
    if (isNaN(d.getTime())) {
      // Try to parse as YYYY-MM-DD or YYYY-MM-DD HH:mm:ss
      const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})/);
      if (match) {
        return `${match[3]}/${match[2]}/${match[1]}`;
      }
      return dateStr;
    }
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const jobs = apiResponse.jobs.map((job, index) => {
    
    // Check if link is in the first match (assuming all matches have the same job link)
    // Treat "No link found" as invalid/missing link
    const isValidLink = (link) => link && link !== "No link found" && link.trim() !== "";
    
    const jobLink =
      (isValidLink(job.link) ? job.link : null) ||
      (job.matches && job.matches[0] && isValidLink(job.matches[0].link) ? job.matches[0].link : null) ||
      null;

    const transformedJob = {
      id: job._id || `job-${index}`,
      jobTitle: job.job_title || "Unknown Position",
      company: job.company_name || "Unknown Company",
      dateAdded: formatDateDDMMYYYY(job.discovered),
      jobDescription: job.job_description || "No description available",
      link: jobLink,
      matchedCandidates: (job.matches || []).map((match, matchIndex) => ({
        name: match.name || `Candidate ${matchIndex + 1}`,
        score: match.score || 0,
        status: match.job_status || 'pending',
        cv: !!match.cv_link,
        cvLink: match.cv_link ? getAbsoluteUrl(match.cv_link) : null,
        mmr: match.mandatory_req ? "YES" : "NO",
        _metadata: {
          matchId: match._id,
          candidateId: match.ID_candiate, // Backend still has typo
          coverLetter: match.cover_letter,
          createdAt: match.created_at,
          overview: match.overall_overview,
          strengths: match.strengths || [],
          weaknesses: match.weeknesses || [], // Backend still has typo
        },
      })),
      job_id: job.job_id || "", // <-- Make sure this is present!
    };
    
    return transformedJob;
  });

  let totalPages = apiResponse.pagination?.total_pages ?? 1;
  if (typeof totalPages !== 'number' || isNaN(totalPages) || totalPages < 1) totalPages = 1;
  return {
    jobs,
    pagination: {
      currentPage: apiResponse.pagination?.current_page ?? 1,
      totalPages,
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
  // Check if apiResponse has the expected structure for paginated response
  if (!apiResponse) {
    throw new Error("No response received from server");
  }

  // Handle new paginated structure
  if (apiResponse.jobs && apiResponse.pagination) {
    const jobs = transformJobListingsArray(apiResponse.jobs);
    const pagination = {
      totalJobs: apiResponse.pagination.total_jobs,
      totalPages: apiResponse.pagination.total_pages,
      currentPage: apiResponse.pagination.current_page,
      pageSize: apiResponse.pagination.page_size,
    };
    return { jobs, pagination };
  }

  // Fallback for old structure (direct array)
  const jobs = transformJobListingsArray(apiResponse);
  return { jobs, pagination: { totalJobs: jobs.length, totalPages: 1, currentPage: 1, pageSize: jobs.length } };
};

const transformJobListingsArray = (jobsArray) => {
  // Helper to format date as DD/MM/YYYY
  function formatDateDDMMYYYY(dateStr) {
    if (!dateStr) return '';
    let d = new Date(dateStr);
    if (isNaN(d.getTime())) {
      // Try to parse as YYYY-MM-DD or YYYY-MM-DD HH:mm:ss
      const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})/);
      if (match) {
        return `${match[3]}/${match[2]}/${match[1]}`;
      }
      return dateStr;
    }
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }

  if (!Array.isArray(jobsArray)) {
    return [];
  }

  return jobsArray.map((job, index) => {
    const daysAgo = job.days_old || 0;
    const ageCategory = getAgeCategory(daysAgo);

    return {
      id: job.id || job.job_id || `job-${index}`,
      job_id: job.job_id || `job-${index}`,
      title: job.job_title || "Unknown Position",
      company: job.company_name || "Unknown Company",
      posted: formatDateDDMMYYYY(job.posted) || formatDateDDMMYYYY(new Date().toISOString()),
      age: `${daysAgo} days`,
      ageCategory: ageCategory,
      ageDisplay: `${daysAgo} days`,
      job_description: job.job_description || '',
      field: job.field || '',
      position_link: job.position_link || '',
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
    if (data && data.user && data.user.email && data.user.role) {
      const userObject = {
        email: data.user.email,
        role: data.user.role,
        name: data.user.name,
        id: data.user.id,
        cv_status: data.user.cv_status,
        cv_link: (data.user.cv_link && data.user.cv_link !== "NA") ? getAbsoluteUrl(data.user.cv_link) : null,
        subscribed: typeof data.user.subscribed === 'boolean' ? data.user.subscribed : true,
      };
      return userObject;
    }
    return null;
  } catch {
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
    throw error;
  }
};
