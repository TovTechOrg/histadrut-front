import React, { useRef, useState } from "react";

function useDebouncedCallback(callback, delay) {
  const timeoutRef = useRef();
  return (...args) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

const MatchesFilters = ({ filters, onFiltersChange }) => {
  const [localMinScore, setLocalMinScore] = useState(filters.minRelevanceScore);

  const handleInputChange = (field, value) => {
    onFiltersChange({
      ...filters,
      [field]: value,
    });
  };

  const debouncedSliderChange = useDebouncedCallback((value) => {
    handleInputChange("minRelevanceScore", value);
  }, 300);

  const handleSliderChange = (e) => {
    const value = parseFloat(e.target.value);
    setLocalMinScore(value);
    debouncedSliderChange(value);
  };

  // Keep localMinScore in sync if filters.minRelevanceScore changes from outside
  React.useEffect(() => {
    setLocalMinScore(filters.minRelevanceScore);
  }, [filters.minRelevanceScore]);
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
              value={filters.companyName}
              onChange={(e) => handleInputChange("companyName", e.target.value)}
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
              value={filters.candidateName}
              onChange={(e) =>
                handleInputChange("candidateName", e.target.value)
              }
            />
          </div>

          <div className="match-filters__field">
            <label className="match-filters__label" htmlFor="addedSince">
              Added Since
            </label>
            <input
              id="addedSince"
              type="date"
              className="match-filters__input match-filters__input--date"
              value={filters.addedSince}
              onChange={(e) => handleInputChange("addedSince", e.target.value)}
              aria-describedby="addedSince-help"
            />
            <small id="addedSince-help" className="match-filters__help-text">
              Show jobs added on or after this date
            </small>
          </div>

          <div className="match-filters__field">
            <label className="match-filters__label">
              Min. Relevance Score ({localMinScore.toFixed(1)})
            </label>
            <div className="match-filters__slider-container">
              <input
                type="range"
                className="match-filters__slider"
                min="0"
                max="10"
                step="0.1"
                value={localMinScore}
                onChange={handleSliderChange}
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
