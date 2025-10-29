import React from "react";
import styles from "./CompanyAutocompleteInput.module.css";

/**
 * CompanyAutocompleteInput
 * Props:
 *   value: string (current value)
 *   onChange: function (called with new value)
 *   options: array of company names
 *   label: string (label for input)
 *   placeholder: string (input placeholder)
 *   inputId: string (for htmlFor)
 *   className: string (optional extra class)
 */
const CompanyAutocompleteInput = ({
  value,
  onChange,
  options = [],
  label = "Company Name",
  placeholder = "e.g., Example Tech",
  inputId = "companyName",
  className = "",
}) => {
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [localValue, setLocalValue] = React.useState(value || "");
  const [dropdownPosition, setDropdownPosition] = React.useState({});
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    setLocalValue(value || "");
  }, [value]);

  const updateDropdownPosition = () => {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  };

  const handleInputChange = (e) => {
    setLocalValue(e.target.value);
    onChange(e.target.value);
    setShowDropdown(true);
    updateDropdownPosition();
  };

  const handleSelect = (company) => {
    setLocalValue(company);
    onChange(company);
    setShowDropdown(false);
  };

  const handleClear = () => {
    setLocalValue("");
    onChange("");
    setShowDropdown(false);
  };

  const handleFocus = () => {
    setShowDropdown(true);
    updateDropdownPosition();
  };

  return (
    <div className="job-filters__field" style={{ position: "relative" }}>
      <label htmlFor={inputId} className="job-filters__label">{label}</label>
      <input
        ref={inputRef}
        id={inputId}
        type="text"
        className={`job-filters__input${className ? ` ${className}` : ''}`}
        placeholder={placeholder}
        value={localValue}
        onChange={handleInputChange}
        autoComplete="off"
        onFocus={handleFocus}
        onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
      />
      {localValue && (
        <button
          type="button"
          aria-label="Clear company filter"
          onClick={handleClear}
          className={styles["company-autocomplete-clear-btn"]}
        >
          ×
        </button>
      )}
      {showDropdown && options.length > 0 && (
        <ul 
          className={styles["company-autocomplete-dropdown"]}
          style={{
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            width: `${dropdownPosition.width}px`,
          }}
        >
          {options
            .filter((c) =>
              localValue ? c.toLowerCase().includes(localValue.toLowerCase()) : true
            )
            .map((company) => (
              <li
                key={company}
                className={company === localValue ? styles.selected : undefined}
                onMouseDown={() => handleSelect(company)}
              >
                {company}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default CompanyAutocompleteInput;
