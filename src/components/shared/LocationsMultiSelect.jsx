import React, { useState, useEffect, useRef } from 'react';
import './LocationsMultiSelect.css';

const LocationsMultiSelect = ({ 
  value = "", 
  onChange, 
  options = [], 
  label, 
  placeholder, 
  inputId, 
  className = "" 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const dropdownRef = useRef(null);

  // Parse the value string into an array of selected locations
  useEffect(() => {
    if (value && value.trim()) {
      const locations = value.split(',').map(loc => loc.trim()).filter(loc => loc);
      setSelectedLocations(locations);
    } else {
      setSelectedLocations([]);
    }
  }, [value]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLocationToggle = (location) => {
    let newSelected;
    if (selectedLocations.includes(location)) {
      // Remove location
      newSelected = selectedLocations.filter(loc => loc !== location);
    } else {
      // Add location
      newSelected = [...selectedLocations, location];
    }
    
    setSelectedLocations(newSelected);
    
    // Format for display (with spaces after commas) and for query (without spaces)
    const displayValue = newSelected.join(', ');
    const queryValue = newSelected.join(',');
    
    // Call onChange with the query format
    onChange(queryValue);
  };

  const handleRemoveLocation = (locationToRemove, e) => {
    e.stopPropagation();
    const newSelected = selectedLocations.filter(loc => loc !== locationToRemove);
    setSelectedLocations(newSelected);
    
    const queryValue = newSelected.join(',');
    onChange(queryValue);
  };

  const displayValue = selectedLocations.join(', ');

  return (
    <div className="locations-multiselect" ref={dropdownRef}>
      <label className="locations-multiselect__label" htmlFor={inputId}>
        {label}
      </label>
      
      <div 
        className={`locations-multiselect__input-container ${className} ${isOpen ? 'locations-multiselect__input-container--open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="locations-multiselect__display">
          {selectedLocations.length > 0 ? (
            <div className="locations-multiselect__selected">
              {selectedLocations.map((location, index) => (
                <span key={location} className="locations-multiselect__tag">
                  {location}
                  <button
                    type="button"
                    className="locations-multiselect__tag-remove"
                    onClick={(e) => handleRemoveLocation(location, e)}
                    aria-label={`Remove ${location}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          ) : (
            <span className="locations-multiselect__placeholder">{placeholder}</span>
          )}
        </div>
        
        <div className="locations-multiselect__arrow">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {isOpen && (
        <div className="locations-multiselect__dropdown">
          {options.length > 0 ? (
            options.map((location) => (
              <div
                key={location}
                className={`locations-multiselect__option ${
                  selectedLocations.includes(location) ? 'locations-multiselect__option--selected' : ''
                }`}
                onClick={() => handleLocationToggle(location)}
              >
                <input
                  type="checkbox"
                  checked={selectedLocations.includes(location)}
                  onChange={() => {}} // Handled by parent onClick
                  className="locations-multiselect__checkbox"
                />
                <span className="locations-multiselect__option-text">{location}</span>
              </div>
            ))
          ) : (
            <div className="locations-multiselect__no-options">
              No locations available
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationsMultiSelect;
