import React, { useState, useRef } from 'react';
import './TruncatedText.css';

const TruncatedText = ({ 
  text, 
  maxWidth = '100px', 
  className = '',
  copyable = false 
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const textRef = useRef(null);

  const handleMouseEnter = () => {
    const element = textRef.current;
    if (element && element.scrollWidth > element.offsetWidth) {
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div 
      className={`truncated-text ${className}`}
      style={{ maxWidth }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span
        ref={textRef}
        className="truncated-text__content"
      >
        {text}
      </span>
      
      {showTooltip && (
        <div className="truncated-text__tooltip">
          {text}
        </div>
      )}
    </div>
  );
};

export default TruncatedText;
