import React, { useState } from "react";
import downloadIcon from "../../assets/icons/download.svg";
import linkIcon from "../../assets/icons/link.svg";
import JobModal from "./JobModal";
import CandidateModal from "./CandidateModal";

const MatchesTable = ({ jobs, loading, error }) => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  // Debug: log jobs to see if link field is present
  console.log("Jobs in MatchesTable:", jobs);
  jobs.forEach((job, index) => {
    console.log(`Job ${index} link:`, job.link);
  });

  if (loading) {
    return (
      <div className="match-table">
        <div className="match-table__loading">Loading matches...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="match-table">
        <div className="match-table__error">Error loading matches: {error}</div>
      </div>
    );
  }

  const downloadCV = (cvLink, candidateName) => {
    if (cvLink) {
      // Create a temporary anchor element to trigger download
      const link = document.createElement("a");
      link.href = cvLink;
      link.download = `${candidateName}_CV.pdf`;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert(`CV not available for ${candidateName}`);
    }
  };

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  const handleCandidateClick = (candidate) => {
    setSelectedCandidate(candidate);
  };

  const handleCloseJobModal = () => {
    setSelectedJob(null);
  };

  const handleCloseCandidateModal = () => {
    setSelectedCandidate(null);
  };

  return (
    <div className="match-table">
      <table className="match-table__table">
        <thead className="match-table__header">
          <tr>
            <th className="match-table__cell match-table__cell--header">
              Job Title
            </th>
            <th className="match-table__cell match-table__cell--header">
              Company
            </th>
            <th className="match-table__cell match-table__cell--header">
              Date Added
            </th>
            <th className="match-table__cell match-table__cell--header">
              Link to Job
            </th>
            <th className="match-table__cell match-table__cell--header">
              Matched Candidates
            </th>
            <th className="match-table__cell match-table__cell--header">CV</th>
            <th className="match-table__cell match-table__cell--header">MMR</th>
          </tr>
        </thead>
        <tbody>
          {jobs.length === 0 ? (
            <tr>
              <td colSpan="7" className="match-table__empty">
                No jobs match the current filters.
              </td>
            </tr>
          ) : (
            jobs.map((job) => (
              <tr key={job.id} className="match-table__row">
                <td className="match-table__cell match-table__cell--match-title">
                  <span
                    className="match-table__title match-table__title--clickable"
                    onClick={() => handleJobClick(job)}
                    title="Click to view job description"
                  >
                    {job.jobTitle}
                  </span>
                </td>
                <td className="match-table__cell">{job.company}</td>
                <td className="match-table__cell">{job.dateAdded}</td>
                <td className="match-table__cell match-table__cell--link">
                  {job.link ? (
                    <a
                      href={job.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="job-link-btn"
                      title="View job posting"
                      aria-label="View job posting"
                    >
                      <img
                        src={linkIcon}
                        alt="Link, external link"
                        className="job-link-icon"
                      />
                      <span className="job-link-text">Link to Job</span>
                    </a>
                  ) : (
                    <span
                      className="job-link-unavailable"
                      title="Job link not available"
                    >
                      —
                    </span>
                  )}
                </td>
                <td className="match-table__cell match-table__cell--candidates">
                  {job.matchedCandidates.map((candidate, index) => (
                    <div
                      className="candidate-match__container"
                      key={index}
                      dir="ltr"
                    >
                      <span
                        className="candidate-match__name candidate-match__name--clickable"
                        onClick={() => handleCandidateClick(candidate)}
                        title="Click to view candidate details"
                      >
                        {candidate.name}
                      </span>
                      <span className="candidate-match__score">
                        {candidate.score}
                      </span>
                      {index < job.matchedCandidates.length - 1 && <br />}
                    </div>
                  ))}
                </td>
                <td className="match-table__cell match-table__cell--cv">
                  {job.matchedCandidates.map((candidate, index) => (
                    <div key={index}>
                      {candidate.cv && candidate.cvLink ? (
                        <button
                          className="cv-download-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            downloadCV(candidate.cvLink, candidate.name);
                          }}
                          title={`Download CV for ${candidate.name}`}
                          aria-label={`Download CV for ${candidate.name}`}
                        >
                          <img
                            src={downloadIcon}
                            alt="Download, created by Gemini"
                            className="cv-download-icon"
                          />
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
                <td className="match-table__cell match-table__cell--mmr">
                  {job.matchedCandidates.map((candidate, index) => (
                    <div className="mmr-badge__container" key={index}>
                      <span
                        className={`mmr-badge ${
                          candidate.mmr === "YES"
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

      {selectedJob && (
        <JobModal job={selectedJob} onClose={handleCloseJobModal} />
      )}

      {selectedCandidate && (
        <CandidateModal
          candidate={selectedCandidate}
          onClose={handleCloseCandidateModal}
        />
      )}
    </div>
  );
};

export default MatchesTable;
