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
export const fetchJobs = async (page = 1, minScore, createdAt, companyName, candidateName) => {
  let url = `/matches2?page=${page}`;
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
  return apiRequest(url);
};
export const fetchJobListings = async () => apiRequest("/jobs");
export const fetchCompanies = async () => apiRequest("/companies");

export const transformJobsData = (apiResponse) => {
  // Check if apiResponse has the expected structure
  if (!apiResponse) {
    throw new Error("No response received from server");
  }
  
  if (!apiResponse.jobs) {
    throw new Error("Invalid response format: missing jobs array");
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
      dateAdded: (() => {
        if (!job.discovered) {
          return new Date().toISOString().split("T")[0];
        }
        
        // Handle different date formats from backend
        try {
          const dateStr = job.discovered.toString().trim();
          
          // If it's already an ISO string (YYYY-MM-DD or with time)
          if (dateStr.includes('-') && (dateStr.includes('T') || dateStr.match(/^\d{4}-\d{2}-\d{2}/))) {
            return new Date(dateStr).toISOString().split("T")[0];
          }
          
          // If it's MM/DD/YYYY format like "08/10/2024"
          if (dateStr.includes('/') && dateStr.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/)) {
            const [month, day, year] = dateStr.split('/');
            const date = new Date(year, month - 1, day); // month is 0-indexed
            return date.toISOString().split("T")[0];
          }
          
          // If it's DD/MM/YYYY format like "10/08/2024" (European)
          if (dateStr.includes('/') && dateStr.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/)) {
            // Try to parse as MM/DD/YYYY first, if that creates invalid date, try DD/MM/YYYY
            const parts = dateStr.split('/');
            let date = new Date(parts[2], parts[0] - 1, parts[1]); // MM/DD/YYYY
            if (isNaN(date.getTime())) {
              date = new Date(parts[2], parts[1] - 1, parts[0]); // DD/MM/YYYY
            }
            return date.toISOString().split("T")[0];
          }
          
          // If it's YYYY/MM/DD format
          if (dateStr.includes('/') && dateStr.match(/^\d{4}\/\d{1,2}\/\d{1,2}$/)) {
            const [year, month, day] = dateStr.split('/');
            const date = new Date(year, month - 1, day);
            return date.toISOString().split("T")[0];
          }
          
          // If it's DD-MM-YYYY format
          if (dateStr.includes('-') && dateStr.match(/^\d{1,2}-\d{1,2}-\d{4}$/)) {
            const [day, month, year] = dateStr.split('-');
            const date = new Date(year, month - 1, day);
            return date.toISOString().split("T")[0];
          }
          
          // If it's a timestamp (number)
          if (!isNaN(dateStr) && dateStr.length >= 10) {
            const timestamp = parseInt(dateStr);
            // Handle both seconds and milliseconds timestamps
            const date = new Date(timestamp < 10000000000 ? timestamp * 1000 : timestamp);
            return date.toISOString().split("T")[0];
          }
          
          // Fallback: try to parse as-is (handles many other formats)
          const fallbackDate = new Date(dateStr);
          if (!isNaN(fallbackDate.getTime())) {
            return fallbackDate.toISOString().split("T")[0];
          }
          
          throw new Error(`Unrecognized date format: ${dateStr}`);
        } catch {
          return new Date().toISOString().split("T")[0];
        }
      })(),
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
          candidateId: match.ID_candiate, // Backend still has typo
          coverLetter: match.cover_letter,
          createdAt: match.created_at,
          overview: match.overall_overview,
          strengths: match.strengths || [],
          weaknesses: match.weeknesses || [], // Backend still has typo
        },
      })),
    };
    
    return transformedJob;
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
