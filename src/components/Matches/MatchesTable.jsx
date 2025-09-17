import React, { useState, useEffect } from "react";
import { setMatchSent } from "../../api/api";
import { useTranslations } from "../../utils/translations";
import downloadIcon from "../../assets/icons/download.svg";
import linkIcon from "../../assets/icons/link.svg";
import checkIcon from "../../assets/icons/check.svg";
import JobDescriptionModal from "../shared/JobDescriptionModal";
import CandidateModal from "./CandidateModal";
import TruncatedText from "../shared/TruncatedText";

const MatchesTable = ({ jobs: initialJobs, allJobs = [], loading, error }) => {
  const [jobs, setJobs] = useState(initialJobs);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [changingMatches, setChangingMatches] = useState(new Set());
  const { t, currentLanguage } = useTranslations('matches');
  const { t: tCommon } = useTranslations('common');

  // Function to get score color based on value
  const getScoreColor = (score) => {
    const numScore = parseFloat(score);
    if (isNaN(numScore)) return '#666'; // Default color for invalid scores
    
    if (numScore <= 6) return '#dc3545'; // Red for low scores
    if (numScore >= 8.5) return '#4caf50'; // Green for high scores
    return '#ff8c00'; // Orange for medium scores (6-8.5)
  };

  // Function to translate status values
  const translateStatus = (status) => {
    const statusMap = {
      'YES': t('table.statusValues.yes'),
      'NO': t('table.statusValues.no'),
      'pending': t('table.statusValues.pending'),
      'sent': t('table.statusValues.sent'),
    };
    return statusMap[status] || status;
  };

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
    <div className="match-table" key={currentLanguage}>
      <table className="match-table__table">
        <thead className="match-table__header">
          <tr>
            <th className="match-table__cell match-table__cell--header">
              {t('table.headers.jobId')}
            </th>
            <th className="match-table__cell match-table__cell--header">
              {t('table.headers.jobTitle')}
            </th>
            <th className="match-table__cell match-table__cell--header">
              {t('table.headers.company')}
            </th>
            <th className="match-table__cell match-table__cell--header">
              {t('table.headers.dateAdded')}
            </th>
            <th className="match-table__cell match-table__cell--header">
              {t('table.headers.linkToJob')}
            </th>
            <th className="match-table__cell match-table__cell--header">
              {t('table.headers.matchedCandidates')}
            </th>
            <th className="match-table__cell match-table__cell--header">{t('table.headers.cv')}</th>
            <th className="match-table__cell match-table__cell--header">{t('table.headers.mmr')}</th>
            <th className="match-table__cell match-table__cell--header">
              {t('table.headers.appliedStatus')}
            </th>
            <th className="match-table__cell match-table__cell--header">{t('table.headers.actions')}</th>
          </tr>
        </thead>
        <tbody>
          {jobs.length === 0 ? (
            <tr>
              <td colSpan="10" className="match-table__empty">
                {Array.isArray(allJobs) && allJobs.length === 0 && error
                  ? error
                  : Array.isArray(allJobs) && allJobs.length === 0
                  ? t('table.noMatches')
                  : t('table.noMatchesFiltered')}
              </td>
            </tr>
          ) : (
            jobs.map((job, index) => (
              <tr key={`${index}_${job.id || 'NA'}_${job.company || 'unknown'}`} className="match-table__row">
                <td className="match-table__cell match-table__cell--job-id">
                  <TruncatedText 
                    text={job.job_id || ""} 
                    maxWidth="100px"
                    className="job-id-truncated"
                  />
                </td>
                <td className="match-table__cell match-table__cell--match-title">
                  <span
                    className="match-table__title match-table__title--clickable"
                    onClick={() => handleJobClick(job)}
                    title={t('table.viewJob')}
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
                      title={t('table.viewJob')}
                      aria-label={t('table.viewJob')}
                    >
                      <img
                        src={linkIcon}
                        alt="Link, external link"
                        className="job-link-icon"
                      />
                      <span className="job-link-text">{t('table.linkToJob')}</span>
                    </a>
                  ) : (
                    <span
                      className="job-link-unavailable"
                      title={t('table.jobLinkNotAvailable')}
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
                        title={t('table.viewCandidate')}
                      >
                        {candidate.name}
                      </span>
                      <span 
                        className="candidate-match__score"
                        style={{ 
                          color: getScoreColor(candidate.score),
                          fontWeight: '800'
                        }}
                      >
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
                          title={t('table.downloadCVFor', { name: candidate.name })}
                          aria-label={t('table.downloadCVFor', { name: candidate.name })}
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
                          title={t('table.cvNotAvailable')}
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
                        {translateStatus(candidate.mmr)}
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
                          ? t('table.updating')
                          : translateStatus(candidate.status)}
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
                              ? tCommon('updating')
                              : candidate.status === "pending"
                              ? t('table.markAsSent')
                              : t('table.markAsPending')
                          }
                        >
                          <img
                            src={checkIcon}
                            alt={
                              isChanging
                                ? tCommon('updating')
                                : candidate.status === "pending"
                                ? t('table.markAsSent')
                                : t('table.markAsPending')
                            }
                            className={`action-icon ${
                              candidate.status === "sent"
                                ? "action-icon--sent"
                                : ""
                            }`}
                          />
                          <span className="action-btn-text">
                            {isChanging
                              ? t('table.updating')
                              : candidate.status === "pending"
                              ? t('table.markAsSent')
                              : t('table.revertStatus')}
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
