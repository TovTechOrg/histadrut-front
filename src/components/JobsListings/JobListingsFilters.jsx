import React, { useState, useEffect } from "react";
import { fetchCompanies } from "../../api/api";

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
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    fetchCompanies().then((data) => {
      if (data && typeof data === "object") {
        setCompanyOptions(["All Companies", ...Object.keys(data)]);
      }
    });
  }, []);

  useEffect(() => {
    setLocalCompany(selectedCompany || "");
  }, [selectedCompany]);

  const handleCompanyChange = (e) => {
    setLocalCompany(e.target.value);
    onCompanyChange(e.target.value);
    setShowDropdown(true);
  };

  const handleCompanySelect = (company) => {
    setLocalCompany(company);
    onCompanyChange(company);
    setShowDropdown(false);
  };

  const handleClearCompany = () => {
    setLocalCompany("");
    onCompanyChange("");
    setShowDropdown(false);
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
            <label className="job-filters__label" htmlFor="company">
              Company
            </label>
            <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
              <input
                id="company"
                type="text"
                className="job-filters__input"
                placeholder="e.g., Example Tech"
                value={localCompany}
                onChange={handleCompanyChange}
                autoComplete="off"
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                style={{ fontWeight: 500, fontSize: '1rem', color: '#2c3e50', width: '100%' }}
              />
              {localCompany && (
                <button
                  type="button"
                  aria-label="Clear company filter"
                  onClick={handleClearCompany}
                  style={{
                    position: "absolute",
                    right: 8,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "1.1rem",
                    color: "#aaa",
                    padding: 0,
                  }}
                >
                  ×
                </button>
              )}
              {showDropdown && companyOptions.length > 0 && (
                <ul
                  className="job-filters__dropdown"
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    background: "#fff",
                    border: "1px solid #e1e8ed",
                    borderRadius: 4,
                    zIndex: 10,
                    maxHeight: 180,
                    overflowY: "auto",
                    margin: 0,
                    padding: 0,
                    listStyle: "none",
                  }}
                >
                  {companyOptions
                    .filter((c) =>
                      localCompany
                        ? c.toLowerCase().includes(localCompany.toLowerCase())
                        : true
                    )
                    .map((company) => (
                      <li
                        key={company}
                        style={{
                          padding: "0.5rem 1rem",
                          cursor: "pointer",
                          background:
                            company === localCompany ? "#e8f4fd" : "#fff",
                          color: '#2c3e50',
                          fontWeight: 500,
                          fontSize: '1rem',
                        }}
                        onMouseDown={() => handleCompanySelect(company)}
                      >
                        {company}
                      </li>
                    ))}
                </ul>
              )}
            </div>
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
