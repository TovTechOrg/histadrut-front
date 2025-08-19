import React, { useState, useEffect } from "react";

import { fetchCompanies } from "../../api/api";
import CompanyAutocompleteInput from "../shared/CompanyAutocompleteInput";

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
  const [companyOptions, setCompanyOptions] = useState([]);
  const [localCompany, setLocalCompany] = useState(selectedCompany || "");

  useEffect(() => {
    fetchCompanies().then((data) => {
      if (data && typeof data === "object") {
        setCompanyOptions(Object.keys(data));
      }
    });
  }, []);

  useEffect(() => {
    setLocalCompany(selectedCompany || "");
  }, [selectedCompany]);

  const handleCompanyChange = (company) => {
    setLocalCompany(company);
    onCompanyChange(company);
  };
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

          <div className="job-filters__field" style={{ position: "relative" }}>
            <CompanyAutocompleteInput
              value={localCompany}
              onChange={handleCompanyChange}
              options={companyOptions}
              label="Company"
              placeholder="e.g., Example Tech"
              inputId="company"
              className="job-filters__input"
            />
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
