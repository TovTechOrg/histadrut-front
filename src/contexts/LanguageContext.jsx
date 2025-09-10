import React, { createContext, useContext, useReducer } from 'react';

// Language reducer
const languageReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return {
        ...state,
        currentLanguage: action.payload
      };
    case 'TOGGLE_LANGUAGE':
      return {
        ...state,
        currentLanguage: state.currentLanguage === 'en' ? 'he' : 'en'
      };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  currentLanguage: 'en', // default to English
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
