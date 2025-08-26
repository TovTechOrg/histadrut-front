import React, { useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";

import { fetchCompanies } from "../../api/api";
import CompanyAutocompleteInput from "../shared/CompanyAutocompleteInput";



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
  // No longer need showCompanyDropdown, handled by shared component
  const [localJobTitle, setLocalJobTitle] = React.useState(searchParams.get("job_title") || "");
  const [localCandidateName, setLocalCandidateName] = React.useState(searchParams.get("candidateName") || "");
  const [localJobId, setLocalJobId] = React.useState(searchParams.get("job_id") || "");
  const addedSince = searchParams.get("addedSince") || "";
  const minRelevanceScore = searchParams.get("minRelevanceScore") ? parseFloat(searchParams.get("minRelevanceScore")) : 7.0;
  const [localMinScore, setLocalMinScore] = React.useState(minRelevanceScore);

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
  React.useEffect(() => {
    setLocalJobId(searchParams.get("job_id") || "");
  }, [searchParams.get("job_id")]);

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

  const handleCompanyNameChange = (company) => {
    setLocalCompanyName(company);
    debouncedSetParam("companyName", company);
  };
  const handleJobTitleChange = (e) => {
    setLocalJobTitle(e.target.value);
    debouncedSetParam("job_title", e.target.value);
  };
  const handleCandidateNameChange = (e) => {
    setLocalCandidateName(e.target.value);
    debouncedSetParam("candidateName", e.target.value);
  };
  const handleJobIdChange = (e) => {
    setLocalJobId(e.target.value);
    debouncedSetParam("job_id", e.target.value);
  };
  // Handle date and slider changes for addedSince and minRelevanceScore
  const handleInputChange = (field, value) => {
    if (field === "addedSince") {
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
    if (field === "minRelevanceScore") {
      setLocalMinScore(parseFloat(value));
    }
  };

  // Debounce updating the URL param for minRelevanceScore
  React.useEffect(() => {
    const handler = setTimeout(() => {
      if (localMinScore !== minRelevanceScore) {
        setSearchParams(prev => {
          const params = new URLSearchParams(prev);
          if (localMinScore !== "" && localMinScore !== null) {
            params.set("minRelevanceScore", localMinScore);
          } else {
            params.delete("minRelevanceScore");
          }
          params.set("page", "1");
          return params;
        });
      }
    }, 300);
    return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localMinScore]);

  // Keep localMinScore in sync with URL param if it changes externally
  React.useEffect(() => {
    setLocalMinScore(minRelevanceScore);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minRelevanceScore]);
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
            <CompanyAutocompleteInput
              value={localCompanyName}
              onChange={handleCompanyNameChange}
              options={companyOptions}
              label="Company Name"
              placeholder="e.g., Example Tech"
              inputId="companyName"
              className="match-filters__input"
            />
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
            <label className="match-filters__label" htmlFor="jobId">
              Job ID
            </label>
            <input
              id="jobId"
              type="text"
              className="match-filters__input"
              placeholder="e.g., 12345"
              value={localJobId}
              onChange={handleJobIdChange}
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
                value={localMinScore}
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
