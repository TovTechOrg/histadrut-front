import React from "react";

const JobListingsFilters = ({
  searchTerm,
  onSearchChange,
  selectedCompany,
  onCompanyChange,
  selectedStatus,
  onStatusChange,
  companies,
  statuses,
}) => {
  return (
    <section className="job-filters" aria-labelledby="filters-heading">
      <h2 id="filters-heading" className="job-filters__title">
        Filters
      </h2>

      <form
        className="job-filters__form"
        role="search"
        aria-label="Filter jobs"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="job-filters__grid">
          <div className="job-filters__field">
            <label className="job-filters__label" htmlFor="search">
              Search Jobs
            </label>
            <input
              id="search"
              type="text"
              className="job-filters__input"
              placeholder="Title, Company, ID..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          <div className="job-filters__field">
            <label className="job-filters__label" htmlFor="company">
              Company
            </label>
            <select
              id="company"
              className="job-filters__input"
              value={selectedCompany}
              onChange={(e) => onCompanyChange(e.target.value)}
            >
              {companies.map((company) => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
            </select>
          </div>

          <div className="job-filters__field">
            <label className="job-filters__label" htmlFor="status">
              Status
            </label>
            <select
              id="status"
              className="job-filters__input"
              value={selectedStatus}
              onChange={(e) => onStatusChange(e.target.value)}
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>
    </section>
  );
};

export default JobListingsFilters;
