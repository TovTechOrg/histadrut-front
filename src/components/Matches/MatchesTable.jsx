import React, { useState, useEffect } from "react";
import { setMatchSent } from "../../api/api";
import downloadIcon from "../../assets/icons/download.svg";
import linkIcon from "../../assets/icons/link.svg";
import checkIcon from "../../assets/icons/check.svg";
import JobDescriptionModal from "../shared/JobDescriptionModal";
import CandidateModal from "./CandidateModal";

const MatchesTable = ({ jobs: initialJobs, allJobs = [], loading, error }) => {
  const [jobs, setJobs] = useState(initialJobs);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [changingMatches, setChangingMatches] = useState(new Set());

  useEffect(() => {
    setJobs(initialJobs);
  }, [initialJobs]);

  const handleToggleMatchStatus = async (jobId, matchId, currentStatus) => {
    // Add this match to the changing set
    setChangingMatches(prev => new Set([...prev, matchId]));
    
    try {
      const newStatus = currentStatus === "pending" ? "sent" : "pending";
      await setMatchSent(matchId, newStatus);
      
      // Only update the local state after successful API response
      setJobs(prevJobs => 
        prevJobs.map((job) => {
          if (job.id === jobId) {
            const updatedCandidates = job.matchedCandidates.map((candidate) => {
              if (candidate._metadata.matchId === matchId) {
                return { ...candidate, status: newStatus };
              }
              return candidate;
            });
            return { ...job, matchedCandidates: updatedCandidates };
          }
          return job;
        })
      );
    } catch (error) {
      console.error("Failed to update match status:", error);
      alert("Failed to update match status. Please try again.");
    } finally {
      // Remove this match from the changing set
      setChangingMatches(prev => {
        const newSet = new Set(prev);
        newSet.delete(matchId);
        return newSet;
      });
    }
  };

  if (loading) {
    return (
      <div className="match-table">
        <div className="match-table__loading">Loading matches...</div>
      </div>
    );
  }

  // If there is an error, but allJobs is empty and loading is false, show no matches message instead of error
  if (error && !(Array.isArray(allJobs) && allJobs.length === 0 && !loading)) {
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
              Job ID
            </th>
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
            <th className="match-table__cell match-table__cell--header">
              Applied Status
            </th>
            <th className="match-table__cell match-table__cell--header"></th>
          </tr>
        </thead>
        <tbody>
          {jobs.length === 0 ? (
            <tr>
              <td colSpan="10" className="match-table__empty">
                {Array.isArray(allJobs) && allJobs.length === 0 && error
                  ? error
                  : Array.isArray(allJobs) && allJobs.length === 0
                  ? "No matches yet! If you've recently uploaded your CV, please check back in 1-2 days. Our algorithm is working to find the perfect job matches for you."
                  : "No jobs match the current filters."}
              </td>
            </tr>
          ) : (
            jobs.map((job, index) => (
              <tr key={`${index}_${job.id || 'NA'}_${job.company || 'unknown'}`} className="match-table__row">
                <td
                  className="match-table__cell match-table__cell--job-id"
                  title={job.job_id || ""}
                >
                  {job.job_id || ""}
                </td>
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
                    <div className="candidate-info-item" key={index}>
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
                    </div>
                  ))}
                </td>
                <td className="match-table__cell match-table__cell--cv">
                  {job.matchedCandidates.map((candidate, index) => (
                    <div className="candidate-info-item" key={index}>
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
                    </div>
                  ))}
                </td>
                <td className="match-table__cell match-table__cell--mmr">
                  {job.matchedCandidates.map((candidate, index) => (
                    <div className="candidate-info-item" key={index}>
                      <span
                        className={`mmr-badge ${
                          candidate.mmr === "YES"
                            ? "mmr-badge--yes"
                            : "mmr-badge--no"
                        }`}
                      >
                        {candidate.mmr}
                      </span>
                    </div>
                  ))}
                </td>
                <td className="match-table__cell match-table__cell--status">
                  {job.matchedCandidates.map((candidate, index) => (
                    <div className="candidate-info-item" key={index}>
                      <span
                        className={`status-badge ${
                          changingMatches.has(candidate._metadata.matchId)
                            ? "status-badge--changing"
                            : `status-badge--${candidate.status}`
                        }`}
                      >
                        {changingMatches.has(candidate._metadata.matchId)
                          ? "changing..."
                          : candidate.status}
                      </span>
                    </div>
                  ))}
                </td>
                <td className="match-table__cell match-table__cell--actions">
                  {job.matchedCandidates.map((candidate, index) => {
                    const isChanging = changingMatches.has(candidate._metadata.matchId);
                    return (
                      <div className="candidate-info-item" key={index}>
                        <button
                          className={`action-btn mark-as-sent-btn ${
                            candidate.status === "sent" ? "action-btn--revert" : ""
                          }`}
                          onClick={() =>
                            handleToggleMatchStatus(
                              job.id,
                              candidate._metadata.matchId,
                              candidate.status
                            )
                          }
                          disabled={isChanging}
                          title={
                            isChanging
                              ? "Updating status..."
                              : candidate.status === "pending"
                              ? "Mark as sent"
                              : "Revert to pending"
                          }
                        >
                          <img
                            src={checkIcon}
                            alt={
                              isChanging
                                ? "Updating status..."
                                : candidate.status === "pending"
                                ? "Mark as sent"
                                : "Revert to pending"
                            }
                            className={`action-icon ${
                              candidate.status === "sent"
                                ? "action-icon--sent"
                                : ""
                            }`}
                          />
                          <span className="action-btn-text">
                            {isChanging
                              ? "Updating..."
                              : candidate.status === "pending"
                              ? "Mark as Sent"
                              : "Revert Status"}
                          </span>
                        </button>
                      </div>
                    );
                  })}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {selectedJob && (
        <JobDescriptionModal job={selectedJob} isOpen={!!selectedJob} onClose={handleCloseJobModal} />
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
