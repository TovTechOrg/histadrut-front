const API_BASE_URL = "https://cv.pythia-match.com";

const handleApiError = (response, endpoint) => {
  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${endpoint.replace("/", "")}: ${response.status} ${
        response.statusText
      }`
    );
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
export const fetchCompanies = async () => apiRequest("/companies");

export const transformJobsData = (apiResponse) => {
  const jobs = apiResponse.jobs.map((job, index) => ({
    id: job._id || `job-${index}`,
    jobTitle: job.job_title || "Unknown Position",
    company: job.company_name || "Unknown Company",
    dateAdded: job.discovered
      ? new Date(job.discovered).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    matchedCandidates: (job.matches || []).map((match, matchIndex) => ({
      name: getCandidateName(match.ID_candiate, matchIndex),
      score: match.score || 0,
      cv: Boolean(match.cv_link),
      cvLink: match.cv_link ? getAbsoluteUrl(match.cv_link) : null,
      mmr: match.mandatory_req ? "Yes" : "No",
      _metadata: {
        matchId: match._id,
        candidateId: match.ID_candiate,
        coverLetter: match.cover_letter,
        createdAt: match.created_at,
        overview: match.overall_overview,
        strengths: match.strengths || [],
        weaknesses: match.weeknesses || [],
      },
    })),
  }));

  return {
    jobs,
    pagination: {
      currentPage: apiResponse.pagination?.current_page ?? 1,
      totalPages: apiResponse.pagination?.total_pages ?? 1,
    },
  };
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
    id: index + 1, // Use index + 1 as ID since we don't have actual IDs
    name: companyName,
    jobsCount: jobsCount || 0,
    _metadata: {
      originalData: { [companyName]: jobsCount },
    },
  }));
};

const getAbsoluteUrl = (url) => {
  if (url && (url.startsWith("http://") || url.startsWith("https://")))
    return url;
  const cleanPath = url.startsWith("/") ? url : `/${url}`;
  return `${API_BASE_URL}${cleanPath}`;
};

const getCandidateName = (candidateId, matchIndex) => {
  if (candidateId && candidateId.length > 0) {
    if (/^[A-Za-z\s]+$/.test(candidateId)) return candidateId;
    return `Candidate ${candidateId.slice(-4)}`;
  }
  return `Candidate ${matchIndex + 1}`;
};
