import React from "react";
import viewIcon from "../../assets/icons/view.svg";
import editIcon from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import linkIcon from "../../assets/icons/link.svg";

const JobListingsTable = ({
  jobs,
  loading,
  error,
  onAction,
  sortField,
  sortDirection,
  onSort,
  showActions = true,
  onJobTitleClick,
}) => {
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

  const getAgeClass = (age) => {
    switch (age) {
      case "New":
        return "age-new";
      case "Fresh":
        return "age-fresh";
      case "Stale":
        return "age-stale";
      case "Old":
        return "age-old";
      default:
        return "";
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) {
      return "↕";
    }
    return sortDirection === "asc" ? "↑" : "↓";
  };

  const SortableHeader = ({ field, children, sortable = true }) => {
    const handleClick = () => {
      if (sortable && onSort) {
        onSort(field);
      }
    };

    return (
      <th
        className={`job-table__cell job-table__cell--header ${
          sortable ? "job-table__cell--sortable" : ""
        } ${sortField === field ? "job-table__cell--sorted" : ""}`}
        onClick={handleClick}
      >
        <div className="job-table__header-content">
          <span>{children}</span>
          {sortable && (
            <span className="job-table__sort-icon">{getSortIcon(field)}</span>
          )}
        </div>
      </th>
    );
  };

  return (
    <div className="job-table">
      <div className="job-table__container">
        <table className="job-table__table">
          <thead className="job-table__header">
            <tr>
              <SortableHeader field="job_id" sortable={false}>
                ID
              </SortableHeader>
              <SortableHeader field="title">Title</SortableHeader>
              <SortableHeader field="company">Company</SortableHeader>
              <SortableHeader field="posted">Posted</SortableHeader>
              <SortableHeader field="age">Age</SortableHeader>
              <SortableHeader field="link" sortable={false}>
                Link to Job
              </SortableHeader>
              {showActions && (
                <SortableHeader field="actions" sortable={false}>
                  Actions
                </SortableHeader>
              )}
            </tr>
          </thead>
          <tbody>
            {!jobs || jobs.length === 0 ? (
              <tr>
                <td
                  colSpan={showActions ? "7" : "6"}
                  className="job-table__empty"
                >
                  No jobs found matching your criteria.
                </td>
              </tr>
            ) : (
              jobs.map((job, index) => (
                <tr key={`${index}_${job.job_id || job.id || 'NA'}_${job.company || 'unknown'}`} className="job-table__row">
                  <td className="job-table__cell">{job.job_id || ""}</td>
                  <td className="job-table__cell job-table__cell--title">
                    <span
                      className="job-table__link-title"
                      style={{ color: '#3498db', cursor: 'pointer', textDecoration: 'underline' }}
                      onClick={() => onJobTitleClick && onJobTitleClick(job)}
                      title="Find matches for this job"
                    >
                      {job.title}
                    </span>
                  </td>
                  <td className="job-table__cell">{job.company}</td>
                  <td className="job-table__cell">{job.posted}</td>
                  <td className="job-table__cell">
                    <span className={`age-badge ${getAgeClass(job.ageCategory)}`}>{job.age}</span>
                  </td>
                  <td className="job-table__cell job-table__cell--link">
                    {job.position_link ? (
                      <a
                        href={job.position_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="job-link-btn"
                        title="View job posting"
                        aria-label="View job posting"
                        style={{ margin: 0 }}
                      >
                        <img
                          src={linkIcon}
                          alt="Link, external link"
                          className="job-link-icon"
                        />
                        <span className="job-link-text">Link to Job</span>
                      </a>
                    ) : (
                      <span className="job-link-unavailable" title="Job link not available">
                        —
                      </span>
                    )}
                  </td>
                  {showActions && (
                    <td className="job-table__cell job-table__cell--actions">
                      <div className="action-buttons">
                        <button
                          className="action-btn view-btn"
                          onClick={() => onAction("view", job)}
                          title="View Job"
                        >
                          <img src={viewIcon} alt="View" />
                        </button>
                        <button
                          className="action-btn edit-btn"
                          onClick={() => onAction("edit", job)}
                          title="Edit Job"
                        >
                          <img src={editIcon} alt="Edit" />
                        </button>
                        <button
                          className="action-btn delete-btn"
                          onClick={() => onAction("delete", job)}
                          title="Delete Job"
                        >
                          <img src={deleteIcon} alt="Delete" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobListingsTable;
