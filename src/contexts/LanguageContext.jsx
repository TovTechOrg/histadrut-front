import React, { createContext, useContext, useReducer } from 'react';

// Language reducer
const languageReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      // Save to localStorage when language changes
      try {
        localStorage.setItem('selectedLanguage', action.payload);
      } catch (error) {
        console.warn('Could not save language to localStorage:', error);
      }
      return {
        ...state,
        currentLanguage: action.payload
      };
    case 'TOGGLE_LANGUAGE':
      const newLanguage = state.currentLanguage === 'en' ? 'he' : 'en';
      // Save to localStorage when language toggles
      try {
        localStorage.setItem('selectedLanguage', newLanguage);
      } catch (error) {
        console.warn('Could not save language to localStorage:', error);
      }
      return {
        ...state,
        currentLanguage: newLanguage
      };
    default:
      return state;
  }
};

// Initial state - check localStorage first
const getInitialLanguage = () => {
  try {
    const saved = localStorage.getItem('selectedLanguage');
    return saved && ['en', 'he'].includes(saved) ? saved : 'en';
  } catch (error) {
    console.warn('Could not access localStorage:', error);
    return 'en';
  }
};

const initialState = {
  currentLanguage: getInitialLanguage(),
  supportedLanguages: ['en', 'he']
};

// Create context
const LanguageContext = createContext();

// Language provider component
export const LanguageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(languageReducer, initialState);

  const setLanguage = (language) => {
    if (state.supportedLanguages.includes(language)) {
      dispatch({ type: 'SET_LANGUAGE', payload: language });
    }
  };

  const toggleLanguage = () => {
    dispatch({ type: 'TOGGLE_LANGUAGE' });
  };

  const value = {
    ...state,
    setLanguage,
    toggleLanguage
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
