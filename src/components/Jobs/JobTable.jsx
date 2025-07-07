import React from "react";

const JobTable = ({ jobs, loading, error }) => {
  if (loading) {
    return (
      <div className="job-table">
        <div className="job-table__loading">Loading jobs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="job-table">
        <div className="job-table__error">Error loading jobs: {error}</div>
      </div>
    );
  }

  const downloadCV = (candidateName) => {
    // TODO: Implement actual CV download
    console.log(`Downloading CV for ${candidateName}`);
  };

  return (
    <div className="job-table">
      <div className="job-table__header">
        <div className="job-table__cell job-table__cell--header">Job Title</div>
        <div className="job-table__cell job-table__cell--header">Company</div>
        <div className="job-table__cell job-table__cell--header">
          Date Added
        </div>
        <div className="job-table__cell job-table__cell--header">
          Matched Candidates
        </div>
        <div className="job-table__cell job-table__cell--header">CV</div>
        <div className="job-table__cell job-table__cell--header">MMR</div>
      </div>

      {jobs.length === 0 ? (
        <div className="job-table__empty">
          No jobs match the current filters.
        </div>
      ) : (
        jobs.map((job) => (
          <div key={job.id} className="job-table__row">
            <div className="job-table__cell job-table__cell--job-title">
              <span className="job-table__link">{job.jobTitle}</span>
            </div>
            <div className="job-table__cell">{job.company}</div>
            <div className="job-table__cell">{job.dateAdded}</div>
            <div className="job-table__cell job-table__cell--candidates">
              {job.matchedCandidates.map((candidate, index) => (
                <div key={index} className="candidate-match">
                  <span className="candidate-match__name">
                    {candidate.name}
                  </span>
                  <span className="candidate-match__score">
                    {candidate.score}
                  </span>
                </div>
              ))}
            </div>
            <div className="job-table__cell job-table__cell--cv">
              {job.matchedCandidates.map((candidate, index) => (
                <div key={index} className="cv-action">
                  {candidate.cv && (
                    <button
                      className="cv-download-btn"
                      onClick={() => downloadCV(candidate.name)}
                      title={`Download CV for ${candidate.name}`}
                    >
                      ⬇
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="job-table__cell job-table__cell--mmr">
              {job.matchedCandidates.map((candidate, index) => (
                <div key={index} className="mmr-status">
                  <span
                    className={`mmr-badge ${
                      candidate.mmr === "Yes"
                        ? "mmr-badge--yes"
                        : "mmr-badge--no"
                    }`}
                  >
                    {candidate.mmr}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default JobTable;
