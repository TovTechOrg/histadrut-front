// Translation strings for the application
export const translations = {
  // Login page
  login: {
    en: {
      title: "Login",
      emailLabel: "Email",
      passwordLabel: "Password",
      loginButton: "Login",
      forgotPassword: "Forgot Password?",
      showPassword: "Show password",
      hidePassword: "Hide password",
      signUpPrompt: "Don't have an account?",
      signUpLink: "Sign Up",
      resetPasswordTitle: "Reset Password",
      cookieWarning: "⚠️ This site requires third-party cookies to log in. Please enable them in your browser settings.",
      errors: {
        loginFailed: "Login failed",
        userNotFound: "User or password not found. Please check your credentials.",
        genericError: "An error occurred. Please try again."
      }
    },
    he: {
      title: "התחברות",
      emailLabel: "אימייל",
      passwordLabel: "סיסמה",
      loginButton: "התחבר",
      forgotPassword: "שכחת סיסמה?",
      showPassword: "הצג סיסמה",
      hidePassword: "הסתר סיסמה",
      signUpPrompt: "אין לך חשבון?",
      signUpLink: "הירשם",
      resetPasswordTitle: "איפוס סיסמה",
      cookieWarning: "⚠️ אתר זה דורש קובצי Cookie מצד שלישי כדי להתחבר. אנא אפשר אותם בהגדרות הדפדפן שלך.",
      errors: {
        loginFailed: "ההתחברות נכשלה",
        userNotFound: "משתמש או סיסמה לא נמצאו. אנא בדוק את הפרטים שלך.",
        genericError: "אירעה שגיאה. אנא נסה שוב."
      }
    }
  },

  // Profile page
  profile: {
    en: {
      title: "Profile",
      downloadCV: "Download CV",
      uploadCV: "Upload CV",
      reUploadCV: "Re-upload CV",
      subscribeEmails: "Subscribe to email notifications",
      unsubscribeEmails: "Unsubscribe from email notifications",
      noCV: "No CV available to download."
    },
    he: {
      title: "פרופיל",
      downloadCV: "הורד קורות חיים",
      uploadCV: "העלה קורות חיים",
      reUploadCV: "העלה קורות חיים מחדש",
      subscribeEmails: "הירשם להודעות אימייל",
      unsubscribeEmails: "בטל הרשמה להודעות אימייל",
      noCV: "אין קורות חיים זמינים להורדה."
    }
  },

  // Overview/Dashboard
  overview: {
    en: {
      title: "Dashboard Overview"
    },
    he: {
      title: "סקירת לוח בקרה"
    }
  },

  // Common elements
  common: {
    en: {
      loading: "Loading...",
      error: "Error",
      cancel: "Cancel",
      save: "Save",
      delete: "Delete",
      edit: "Edit",
      close: "Close"
    },
    he: {
      loading: "טוען...",
      error: "שגיאה",
      cancel: "בטל",
      save: "שמור",
      delete: "מחק",
      edit: "ערוך",
      close: "סגור"
    }
  }
};

// Helper function to get translation
export const getTranslation = (section, key, language = 'en') => {
  try {
    // Handle nested keys like 'errors.loginFailed'
    const keys = key.split('.');
    let value = translations[section][language];
    
    for (const k of keys) {
      value = value[k];
    }
    
    return value || translations[section]['en'][key] || key; // fallback to English or key itself
  } catch (error) {
    console.warn(`Translation not found for: ${section}.${key} in ${language}`);
    return key; // return the key as fallback
  }
};

// Hook to get translations for a specific section (to be used with LanguageContext)
import { useLanguage } from '../contexts/LanguageContext';

export const useTranslations = (section) => {
  const { currentLanguage } = useLanguage();
  
  const t = (key) => getTranslation(section, key, currentLanguage);
  
  return { t, currentLanguage };
};
