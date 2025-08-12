import React from "react";
import viewIcon from "../../assets/icons/view.svg";
import editIcon from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/delete.svg";

const JobListingsTable = ({
  jobs,
  loading,
  error,
  onAction,
  sortField,
  sortDirection,
  onSort,
  showActions = true,
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
                  colSpan={showActions ? "6" : "5"}
                  className="job-table__empty"
                >
                  No jobs found matching your criteria.
                </td>
              </tr>
            ) : (
              jobs.map((job, index) => (
                <tr key={job.job_id || job.id || index} className="job-table__row">
                  <td className="job-table__cell">{job.job_id || ""}</td>
                  <td className="job-table__cell job-table__cell--title">
                    {job.title}
                  </td>
                  <td className="job-table__cell">{job.company}</td>
                  <td className="job-table__cell">{job.posted}</td>
                  <td className="job-table__cell">
                    <span
                      className={`age-badge ${getAgeClass(job.ageCategory)}`}
                    >
                      {job.age}
                    </span>
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
