import React from 'react';
import Twemoji from 'react-twemoji';
import { useLanguage } from '../../contexts/LanguageContext';
import './LanguagePicker.css';

const LanguagePicker = ({ size = 'small', position = 'top-right' }) => {
  const { toggleLanguage, currentLanguage } = useLanguage();

  return (
    <div 
      className={`language-picker language-picker--${position}`}
    >
      <button
        onClick={toggleLanguage}
        className={`language-picker-button language-picker-button--${size}`}
      >
        <Twemoji options={{ className: 'twemoji-flag' }}>
          <span role="img" aria-label="Israel">🇮🇱</span> עב / <span role="img" aria-label="United States">🇺🇸</span> EN
        </Twemoji>
      </button>
    </div>
  );
};

export default LanguagePicker;
