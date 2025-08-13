import React, { useRef } from "react";
import { useSearchParams } from "react-router-dom";


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
  const [searchParams, setSearchParams] = useSearchParams();
  const companyName = searchParams.get("companyName") || "";
  const jobTitle = searchParams.get("job_title") || "";
  const candidateName = searchParams.get("candidateName") || "";
  const addedSince = searchParams.get("addedSince") || "";
  const minRelevanceScore = searchParams.get("minRelevanceScore") ? parseFloat(searchParams.get("minRelevanceScore")) : 7.0;

  // General debounce hook
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

  const handleInputChange = (field, value) => {
    debouncedSetParam(field, value);
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
          <div className="match-filters__field">
            <label className="match-filters__label" htmlFor="companyName">
              Company Name
            </label>
            <input
              id="companyName"
              type="text"
              className="match-filters__input"
              placeholder="e.g., Example Tech"
              value={companyName}
              onChange={e => handleInputChange("companyName", e.target.value)}
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
              value={jobTitle}
              onChange={e => handleInputChange("job_title", e.target.value)}
            />
          </div>

          <div className="match-filters__field">
            <label className="match-filters__label" htmlFor="candidateName">
              Candidate Name
            </label>
            <input
              id="candidateName"
              type="text"
              className="match-filters__input"
              placeholder="e.g., Shy"
              value={candidateName}
              onChange={e => handleInputChange("candidateName", e.target.value)}
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
