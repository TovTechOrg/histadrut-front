import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './LanguagePicker.css';

const LanguagePicker = ({ size = 'small', position = 'top-right' }) => {
  const { toggleLanguage, currentLanguage } = useLanguage();

  const sizeStyles = {
    small: {
      padding: '4px 8px',
      fontSize: '12px',
      minWidth: '60px'
    },
    medium: {
      padding: '6px 10px',
      fontSize: '13px',
      minWidth: '70px'
    },
    large: {
      padding: '8px 12px',
      fontSize: '14px',
      minWidth: '80px'
    }
  };

  const positionStyles = {
    'top-right': {
      position: 'absolute',
      top: '20px',
      right: '20px'
    },
    'top-left': {
      position: 'absolute',
      top: '20px',
      left: '20px'
    },
    'inline': {
      position: 'static'
    }
  };

  return (
    <div 
      className="language-picker"
      style={positionStyles[position]}
    >
      <button
        onClick={toggleLanguage}
        className="language-picker-button"
        style={{
          background: 'rgba(255, 255, 255, 0.9)',
          border: '1px solid rgba(221, 221, 221, 0.8)',
          borderRadius: '4px',
          cursor: 'pointer',
          color: '#333',
          transition: 'all 0.2s ease',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          ...sizeStyles[size]
        }}
        onMouseEnter={(e) => {
          e.target.style.borderColor = '#999';
          e.target.style.backgroundColor = 'rgba(255, 255, 255, 1)';
          e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15)';
        }}
        onMouseLeave={(e) => {
          e.target.style.borderColor = 'rgba(221, 221, 221, 0.8)';
          e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
          e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        }}
      >
        עב / EN
      </button>
    </div>
  );
};

export default LanguagePicker;
