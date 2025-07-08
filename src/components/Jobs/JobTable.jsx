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

  const downloadCV = (cvLink, candidateName) => {
    if (cvLink) {
      // Create a temporary anchor element to trigger download
      const link = document.createElement("a");
      link.href = cvLink;
      link.download = `${candidateName}_CV.pdf`; // Set a default filename
      link.target = "_blank"; // Open in new tab as fallback
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert(`CV not available for ${candidateName}`);
    }
  };

  return (
    <div className="job-table">
      <table className="job-table__table">
        <thead className="job-table__header">
          <tr>
            <th className="job-table__cell job-table__cell--header">
              Job Title
            </th>
            <th className="job-table__cell job-table__cell--header">Company</th>
            <th className="job-table__cell job-table__cell--header">
              Date Added
            </th>
            <th className="job-table__cell job-table__cell--header">
              Matched Candidates
            </th>
            <th className="job-table__cell job-table__cell--header">CV</th>
            <th className="job-table__cell job-table__cell--header">MMR</th>
          </tr>
        </thead>
        <tbody>
          {jobs.length === 0 ? (
            <tr>
              <td colSpan="6" className="job-table__empty">
                No jobs match the current filters.
              </td>
            </tr>
          ) : (
            jobs.map((job) => (
              <tr key={job.id} className="job-table__row">
                <td className="job-table__cell job-table__cell--job-title">
                  <span className="job-table__title">{job.jobTitle}</span>
                </td>
                <td className="job-table__cell">{job.company}</td>
                <td className="job-table__cell">{job.dateAdded}</td>
                <td className="job-table__cell job-table__cell--candidates">
                  {job.matchedCandidates.map((candidate, index) => (
                    <div key={index}>
                      <span className="candidate-match__name">
                        {candidate.name}
                      </span>
                      <span className="candidate-match__score">
                        {candidate.score}
                      </span>
                      {index < job.matchedCandidates.length - 1 && <br />}
                    </div>
                  ))}
                </td>
                <td className="job-table__cell job-table__cell--cv">
                  {job.matchedCandidates.map((candidate, index) => (
                    <div key={index}>
                      {candidate.cv && candidate.cvLink ? (
                        <button
                          className="cv-download-btn"
                          onClick={() =>
                            downloadCV(candidate.cvLink, candidate.name)
                          }
                          title={`Download CV for ${candidate.name}`}
                          aria-label={`Download CV for ${candidate.name}`}
                        >
                          ⬇
                        </button>
                      ) : (
                        <span
                          className="cv-not-available"
                          title="CV not available"
                        >
                          —
                        </span>
                      )}
                      {index < job.matchedCandidates.length - 1 && <br />}
                    </div>
                  ))}
                </td>
                <td className="job-table__cell job-table__cell--mmr">
                  {job.matchedCandidates.map((candidate, index) => (
                    <div key={index}>
                      <span
                        className={`mmr-badge ${
                          candidate.mmr === "Yes"
                            ? "mmr-badge--yes"
                            : "mmr-badge--no"
                        }`}
                      >
                        {candidate.mmr}
                      </span>
                      {index < job.matchedCandidates.length - 1 && <br />}
                    </div>
                  ))}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default JobTable;
