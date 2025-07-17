const API_BASE_URL = "https://cv.pythia-match.com";

const handleApiError = (response, endpoint) => {
  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${response.status}`);
  }
  return response;
};

const apiRequest = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });
  handleApiError(response, endpoint);
  return await response.json();
};

export const fetchStats = async () => apiRequest("/stats");
export const fetchJobs = async (page = 1) =>
  apiRequest(`/matches2?page=${page}`);
export const fetchJobListings = async () => apiRequest("/jobs");
export const fetchCompanies = async () => apiRequest("/companies");

export const transformJobsData = (apiResponse) => {
  const jobs = apiResponse.jobs.map((job, index) => {
    // Debug: log the job object to see what fields are available
    console.log(`Job ${index}:`, job);
    console.log(`Job ${index} link:`, job.link);
    console.log(`Job ${index} matches:`, job.matches);

    // Check if link is in the first match (assuming all matches have the same job link)
    const jobLink =
      job.link ||
      (job.matches && job.matches[0] && job.matches[0].link) ||
      null;
    console.log(`Job ${index} final link:`, jobLink);

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
  if (daysOld <= AGE_THRESHOLDS.NEW) return "New";
  if (daysOld <= AGE_THRESHOLDS.FRESH) return "Fresh";
  if (daysOld <= AGE_THRESHOLDS.STALE) return "Stale";
  return "Old";
};

export const transformJobListingsData = (apiResponse) => {
  return apiResponse.map((job, index) => {
    const daysAgo = job.days_old || 0;
    const ageCategory = getAgeCategory(daysAgo);

    // Debug logging
    console.log(
      `Job ${index}: days_old: ${job.days_old}, Age category: ${ageCategory}`
    );

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
