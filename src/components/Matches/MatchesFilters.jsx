
import React, { useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";
import { fetchCompanies } from "../../api/api";



const DEBOUNCE_TIMEOUT = 500;

// General debounce hook
function useDebounce(callback, delay) {
  const timeoutRef = useRef();
  return (...args) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

const MatchesFilters = () => {
  const { isAdmin } = useAuth();
  const isAdminUser = typeof isAdmin === 'function' ? isAdmin() : isAdmin;
  const [searchParams, setSearchParams] = useSearchParams();
  const [localCompanyName, setLocalCompanyName] = React.useState(searchParams.get("companyName") || "");
  const [companyOptions, setCompanyOptions] = React.useState([]);
  const [showCompanyDropdown, setShowCompanyDropdown] = React.useState(false);
  const [localJobTitle, setLocalJobTitle] = React.useState(searchParams.get("job_title") || "");
  const [localCandidateName, setLocalCandidateName] = React.useState(searchParams.get("candidateName") || "");
  const addedSince = searchParams.get("addedSince") || "";
  const minRelevanceScore = searchParams.get("minRelevanceScore") ? parseFloat(searchParams.get("minRelevanceScore")) : 7.0;

  // Sync local state with URL params if they change externally
  React.useEffect(() => {
    setLocalCompanyName(searchParams.get("companyName") || "");
  }, [searchParams.get("companyName")]);

  // Fetch company options on mount
  React.useEffect(() => {
    fetchCompanies().then((data) => {
      if (data && typeof data === "object") {
        setCompanyOptions(Object.keys(data));
      }
    });
  }, []);
  React.useEffect(() => {
    setLocalJobTitle(searchParams.get("job_title") || "");
  }, [searchParams.get("job_title")]);
  React.useEffect(() => {
    setLocalCandidateName(searchParams.get("candidateName") || "");
  }, [searchParams.get("candidateName")]);

  // Debounced update for each input
  const debouncedSetParam = useDebounce((field, value) => {
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);
      if (value && value !== "") {
        params.set(field, value);
      } else {
        params.delete(field);
      }
      // Remove all empty params
      for (const key of Array.from(params.keys())) {
        if (!params.get(key)) {
          params.delete(key);
        }
      }
      // Always reset page to 1 on filter change
      params.set("page", "1");
      return params;
    });
  }, DEBOUNCE_TIMEOUT);

  const handleCompanyNameChange = (e) => {
    setLocalCompanyName(e.target.value);
    debouncedSetParam("companyName", e.target.value);
    setShowCompanyDropdown(true);
  };

  const handleCompanySelect = (company) => {
    setLocalCompanyName(company);
    debouncedSetParam("companyName", company);
    setShowCompanyDropdown(false);
  };

  const handleClearCompany = () => {
    setLocalCompanyName("");
    debouncedSetParam("companyName", "");
    setShowCompanyDropdown(false);
  };
  const handleJobTitleChange = (e) => {
    setLocalJobTitle(e.target.value);
    debouncedSetParam("job_title", e.target.value);
  };
  const handleCandidateNameChange = (e) => {
    setLocalCandidateName(e.target.value);
    debouncedSetParam("candidateName", e.target.value);
  };
  // Handle date and slider changes for addedSince and minRelevanceScore
  const handleInputChange = (field, value) => {
    if (field === "addedSince" || field === "minRelevanceScore") {
      setSearchParams(prev => {
        const params = new URLSearchParams(prev);
        if (value && value !== "") {
          params.set(field, value);
        } else {
          params.delete(field);
        }
        // Remove all empty params
        for (const key of Array.from(params.keys())) {
          if (!params.get(key)) {
            params.delete(key);
          }
        }
        params.set("page", "1");
        return params;
      });
    }
  };
  return (
    <section className="match-filters" aria-labelledby="filters-heading">
      <h2 id="filters-heading" className="match-filters__title">
        Filters
      </h2>

      <form
        className="match-filters__form"
        role="search"
        aria-label="Filter jobs"
        onSubmit={(e) => e.preventDefault()}
      >

        <div className="match-filters__grid">
          <div className="match-filters__field" style={{ position: "relative" }}>
            <label className="match-filters__label" htmlFor="companyName">
              Company Name
            </label>
            <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
              <input
                id="companyName"
                type="text"
                className="match-filters__input"
                placeholder="e.g., Example Tech"
                value={localCompanyName}
                onChange={handleCompanyNameChange}
                autoComplete="off"
                onFocus={() => setShowCompanyDropdown(true)}
                onBlur={() => setTimeout(() => setShowCompanyDropdown(false), 150)}
                style={{ fontWeight: 500, fontSize: '1rem', color: '#2c3e50', width: '100%' }}
              />
              {localCompanyName && (
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
              {showCompanyDropdown && companyOptions.length > 0 && (
                <ul
                  className="match-filters__dropdown"
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
                      localCompanyName
                        ? c.toLowerCase().includes(localCompanyName.toLowerCase())
                        : true
                    )
                    .map((company) => (
                      <li
                        key={company}
                        style={{
                          padding: "0.5rem 1rem",
                          cursor: "pointer",
                          background:
                            company === localCompanyName ? "#e8f4fd" : "#fff",
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

          <div className="match-filters__field">
            <label className="match-filters__label" htmlFor="jobTitle">
              Job Title
            </label>
            <input
              id="jobTitle"
              type="text"
              className="match-filters__input"
              placeholder="e.g., Backend Developer"
              value={localJobTitle}
              onChange={handleJobTitleChange}
            />
          </div>

          <div
            className="match-filters__field"
            style={!isAdminUser ? { visibility: "hidden", height: 0, margin: 0, padding: 0 } : {}}
          >
            <label className="match-filters__label" htmlFor="candidateName">
              Candidate Name
            </label>
            <input
              id="candidateName"
              type="text"
              className="match-filters__input"
              placeholder="e.g., Shy"
              value={localCandidateName}
              onChange={handleCandidateNameChange}
            />
          </div>

          <div className="match-filters__field">
            <label className="match-filters__label" htmlFor="addedSince">
              Posted after
            </label>
            <input
              id="addedSince"
              type="date"
              className="match-filters__input match-filters__input--date"
              value={addedSince}
              onChange={e => handleInputChange("addedSince", e.target.value)}
              aria-describedby="addedSince-help"
            />
            <small id="addedSince-help" className="match-filters__help-text">
              Show jobs posted after this date
            </small>
          </div>

          <div className="match-filters__field">
            <label className="match-filters__label">
              Min. Relevance Score ({minRelevanceScore.toFixed(1)})
            </label>
            <div className="match-filters__slider-container">
              <input
                type="range"
                className="match-filters__slider"
                min="0"
                max="10"
                step="0.1"
                value={minRelevanceScore}
                onChange={e => handleInputChange("minRelevanceScore", e.target.value)}
              />
              <div className="match-filters__slider-track">
                <span>0</span>
                <span>10</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default MatchesFilters;
