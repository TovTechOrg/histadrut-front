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

  // Navigation panel
  navigation: {
    en: {
      title: "Navigation",
      welcome: "Welcome",
      overview: "Overview",
      users: "Users", 
      jobsListings: "Jobs Listings",
      jobMatches: "Job Matches",
      companies: "Companies",
      reporting: "Reporting",
      profile: "Profile",
      logout: "Logout"
    },
    he: {
      title: "ניווט",
      welcome: "ברוך הבא",
      overview: "סקירה כללית",
      users: "משתמשים",
      jobsListings: "רשימת משרות",
      jobMatches: "התאמות משרות",
      companies: "חברות",
      reporting: "דוחות",
      profile: "פרופיל",
      logout: "התנתק"
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
      noCV: "No CV available to download.",
      emailSubscriptionStatus: "You are currently {status} to receive job matches via email.",
      subscribed: "subscribed",
      unsubscribed: "unsubscribed",
      doNotWishEmails: "I do not wish to receive job matches via email",
      wishToReceiveEmails: "I wish to receive job matches via email",
      unsubscribe: "Unsubscribe",
      subscribe: "Subscribe", 
      unsubscribeSuccess: "You have been unsubscribed from job offer emails.",
      subscribeSuccess: "You have been subscribed to job offer emails.",
      unsubscribeFailed: "Failed to unsubscribe. Please try again.",
      subscribeFailed: "Failed to subscribe. Please try again.",
      email: "Email",
      role: "Role",
      cvStatus: "CV Status",
      welcome: "Welcome",
      language: "Language"
    },
    he: {
      title: "פרופיל",
      downloadCV: "הורד קורות חיים",
      uploadCV: "העלה קורות חיים",
      reUploadCV: "העלה קורות חיים מחדש",
      subscribeEmails: "הירשם להודעות אימייל",
      unsubscribeEmails: "בטל הרשמה להודעות אימייל",
      noCV: "אין קורות חיים זמינים להורדה.",
      emailSubscriptionStatus: "אתה כרגע {status} לקבל התאמות עבודה באמצעות אימייל.",
      subscribed: "רשום",
      unsubscribed: "לא רשום",
      doNotWishEmails: "אני לא רוצה לקבל התאמות עבודה באמצעות אימייל",
      wishToReceiveEmails: "אני רוצה לקבל התאמות עבודה באמצעות אימייל",
      unsubscribe: "בטל הרשמה",
      subscribe: "הירשם",
      unsubscribeSuccess: "בוטלה ההרשמה שלך לקבלת הצעות עבודה באימייל.",
      subscribeSuccess: "נרשמת לקבלת הצעות עבודה באימייל.",
      unsubscribeFailed: "ביטול ההרשמה נכשל. אנא נסה שוב.",
      subscribeFailed: "ההרשמה נכשלה. אנא נסה שוב.",
      email: "אימייל",
      role: "תפקיד",
      cvStatus: "סטטוס קורות חיים",
      welcome: "ברוך הבא",
      language: "שפה"
    }
  },

  // Overview/Dashboard
  overview: {
    en: {
      title: "Dashboard Overview",
      totalActiveJobs: "Total Active Jobs",
      totalCandidates: "Total Candidates", 
      totalMatches: "Total Matches",
      jobsAddedLastDay: "Jobs Added Last Day",
      jobsAddedLastWeek: "Jobs Added Last Week",
      newJobsByCompanyToday: "New Jobs by Company Today",
      loadingStats: "Loading statistics...",
      errorLoadingStats: "Error loading stats"
    },
    he: {
      title: "סקירת לוח בקרה",
      totalActiveJobs: "סה\"כ משרות פעילות",
      totalCandidates: "סה\"כ מועמדים",
      totalMatches: "סה\"כ התאמות",
      jobsAddedLastDay: "משרות שנוספו אתמול",
      jobsAddedLastWeek: "משרות שנוספו השבוע",
      newJobsByCompanyToday: "משרות חדשות לפי חברה היום",
      loadingStats: "טוען סטטיסטיקות...",
      errorLoadingStats: "שגיאה בטעינת סטטיסטיקות"
    }
  },

  // CVUpload page
  cvUpload: {
    en: {
      title: "Find Your Perfect Job Match",
      subtitle: "Upload your resume to instantly discover jobs that match your skills",
      description: "Once you upload your CV, our algorithm checks relevant job openings. If a suitable job is found, you'll receive a personalized email, every day, starting tomorrow.",
      startingTomorrow: "starting tomorrow",
      uploadYourResume: "Upload Your Resume",
      dragAndDropInstructions: "Drag and drop your resume here or",
      clickToBrowse: "click to browse",
      supportedFormats: "Supported formats: PDF, DOC, DOCX • English or Hebrew CVs",
      remove: "Remove",
      back: "← Back",
      uploadLater: "Upload Later",
      uploadButton: "Upload Resume",
      uploading: "Uploading...",
      successTitle: "CV Uploaded Successfully!",
      successMessage: "Your resume was uploaded. We'll notify you if a match is found.",
      okButton: "OK",
      errors: {
        invalidFileType: "Please upload a PDF or Word document.",
        noFileSelected: "Please select a file to upload.",
        uploadError: "An error occurred while uploading your CV."
      }
    },
    he: {
      title: "מצא את ההתאמה המושלמת לעבודה",
      subtitle: "העלה את קורות החיים שלך כדי לגלות מיד עבודות שמתאימות לכישורים שלך",
      description: "ברגע שתעלה את קורות החיים שלך, האלגוריתם שלנו בודק משרות רלוונטיות. אם נמצאת עבודה מתאימה, תקבל אימייל אישי, כל יום, החל ממחר.",
      startingTomorrow: "החל ממחר",
      uploadYourResume: "העלה קורות חיים",
      dragAndDropInstructions: "גרור ושחרר את קורות החיים שלך כאן או",
      clickToBrowse: "לחץ לעיון",
      supportedFormats: "פורמטים נתמכים: PDF, DOC, DOCX • קורות חיים באנגלית או עברית",
      remove: "הסר",
      back: "חזור ←",
      uploadLater: "העלה מאוחר יותר",
      uploadButton: "העלה קורות חיים",
      uploading: "מעלה...",
      successTitle: "קורות החיים הועלו בהצלחה!",
      successMessage: "קורות החיים שלך הועלו. נודיע לך אם נמצאה התאמה.",
      okButton: "אישור",
      errors: {
        invalidFileType: "אנא העלה מסמך PDF או Word.",
        noFileSelected: "אנא בחר קובץ להעלאה.",
        uploadError: "אירעה שגיאה בהעלאת קורות החיים שלך."
      }
    }
  },

  // Matches page
  matches: {
    en: {
      title: "Job Match Dashboard",
      subtitle: "Aggregated view of manually sourced jobs and matched candidates.",
      filtersTitle: "Filters",
      pagination: {
        previous: "← Previous",
        next: "Next →",
        pageInfo: "Page {current} of {total}"
      },
      filters: {
        companyName: "Company Name",
        companyNamePlaceholder: "e.g., Example Tech",
        jobTitle: "Job Title",
        jobTitlePlaceholder: "e.g., Backend Developer",
        candidateName: "Candidate Name",
        candidateNamePlaceholder: "e.g., Shy",
        jobId: "Job ID",
        jobIdPlaceholder: "e.g., 12345",
        appliedStatus: "Applied Status",
        allStatuses: "All Statuses",
        pending: "Pending",
        sent: "Sent",
        appliedStatusHelp: "View the matches you have applied for",
        appliedStatusHelpAdmin: "View the matches candidates have applied for",
        postedAfter: "Posted after",
        postedAfterHelp: "Show jobs posted after this date",
        minRelevanceScore: "Min. Relevance Score ({score})",
        scoreRange: ["0", "10"]
      },
      table: {
        headers: {
          jobId: "Job ID",
          jobTitle: "Job Title",
          company: "Company",
          dateAdded: "Date Added",
          linkToJob: "Link to Job",
          matchedCandidates: "Matched Candidates",
          cv: "CV",
          mmr: "MMR",
          appliedStatus: "Applied Status",
          actions: ""
        },
        noMatches: "No matches yet! If you've recently uploaded your CV, please check back in 1-2 days. Our algorithm is working to find the perfect job matches for you.",
        noMatchesFiltered: "No jobs match the current filters.",
        viewJob: "View job description",
        viewCandidate: "View candidate details",
        markAsSent: "Mark as sent",
        markAsPending: "Mark as pending",
        downloadCV: "Download CV",
        downloadCVFor: "Download CV for {name}",
        cvNotAvailable: "CV not available",
        jobLinkNotAvailable: "Job link not available"
      }
    },
    he: {
      title: "לוח התאמות משרות",
      subtitle: "תצוגה מרוכזת של משרות שנאספו ידנית ומועמדים מתאימים.",
      filtersTitle: "מסננים",
      pagination: {
        previous: "הקודם ←",
        next: "→ הבא",
        pageInfo: "עמוד {current} מתוך {total}"
      },
      filters: {
        companyName: "שם חברה",
        companyNamePlaceholder: "למשל, Example Tech",
        jobTitle: "תפקיד",
        jobTitlePlaceholder: "למשל, מפתח Backend",
        candidateName: "שם מועמד",
        candidateNamePlaceholder: "למשל, שי",
        jobId: "מזהה משרה",
        jobIdPlaceholder: "למשל, 12345",
        appliedStatus: "סטטוס הגשה",
        allStatuses: "כל הסטטוסים",
        pending: "ממתין",
        sent: "נשלח",
        appliedStatusHelp: "הצג את ההתאמות שהגשת",
        appliedStatusHelpAdmin: "הצג את ההתאמות שמועמדים הגישו",
        postedAfter: "פורסם לאחר",
        postedAfterHelp: "הצג משרות שפורסמו לאחר תאריך זה",
        minRelevanceScore: "ציון רלוונטיות מינימלי ({score})",
        scoreRange: ["0", "10"]
      },
      table: {
        headers: {
          jobId: "מזהה משרה",
          jobTitle: "תפקיד",
          company: "חברה",
          dateAdded: "תאריך הוספה",
          linkToJob: "קישור למשרה",
          matchedCandidates: "מועמדים מתאימים",
          cv: "קורות חיים",
          mmr: "MMR",
          appliedStatus: "סטטוס הגשה",
          actions: ""
        },
        noMatches: "אין התאמות עדיין! אם העלית לאחרונה את קורות החיים שלך, אנא בדוק שוב בעוד יום-יומיים. האלגוריתם שלנו עובד כדי למצוא עבורך את ההתאמות המושלמות.",
        noMatchesFiltered: "אין משרות התואמות למסננים הנוכחיים.",
        viewJob: "הצג תיאור משרה",
        viewCandidate: "הצג פרטי מועמד",
        markAsSent: "סמן כנשלח",
        markAsPending: "סמן כממתין",
        downloadCV: "הורד קורות חיים",
        downloadCVFor: "הורד קורות חיים עבור {name}",
        cvNotAvailable: "קורות חיים לא זמינים",
        jobLinkNotAvailable: "קישור למשרה לא זמין"
      }
    }
  },

  // Companies page
  companies: {
    en: {
      title: "Company Management",
      loading: "Loading companies...",
      error: "Error loading companies",
      noCompanies: "No companies found.",
      table: {
        headers: {
          id: "",
          companyName: "Company Name",
          jobsCount: "Jobs Count", 
          actions: ""
        }
      },
      actions: {
        viewJobs: "View {company} jobs",
        deleteCompany: "Delete {company}"
      },
      modal: {
        deleteTitle: "Confirm Deletion",
        deleteMessage: "You're about to delete {company}, that have {jobsCount} active jobs.",
        deleteConfirm: "Are you sure?",
        cancel: "Cancel",
        delete: "Delete",
        successTitle: "Success",
        errorTitle: "Error"
      }
    },
    he: {
      title: "ניהול חברות",
      loading: "טוען חברות...",
      error: "שגיאה בטעינת חברות",
      noCompanies: "לא נמצאו חברות.",
      table: {
        headers: {
          id: "",
          companyName: "שם החברה",
          jobsCount: "מספר משרות",
          actions: ""
        }
      },
      actions: {
        viewJobs: "הצג משרות של {company}",
        deleteCompany: "מחק את {company}"
      },
      modal: {
        deleteTitle: "אישור מחיקה",
        deleteMessage: "אתה עומד למחוק את {company}, שיש לה {jobsCount} משרות פעילות.",
        deleteConfirm: "האם אתה בטוח?",
        cancel: "בטל",
        delete: "מחק",
        successTitle: "הצלחה",
        errorTitle: "שגיאה"
      }
    }
  },

  // Common elements
  common: {
    en: {
      loading: "Loading...",
      updating: "Updating...",
      error: "Error",
      cancel: "Cancel",
      save: "Save",
      delete: "Delete",
      edit: "Edit",
      close: "Close"
    },
    he: {
      loading: "טוען...",
      updating: "מעדכן...",
      error: "שגיאה",
      cancel: "בטל",
      save: "שמור",
      delete: "מחק",
      edit: "ערוך",
      close: "סגור"
    }
  },

  // Users page
  users: {
    en: {
      title: "All Users",
      loading: "Loading users...",
      error: "Failed to load users.",
      table: {
        headers: {
          name: "Name",
          email: "Email",
          cvStatus: "CV Status",
          signedUp: "Signed Up",
          totalMatches: "Total Matches",
          actions: ""
        }
      },
      actions: {
        deleteUser: "Delete user"
      },
      modal: {
        deleteTitle: "Confirm Deletion",
        deleteMessage: "Are you sure you want to completely delete the user {userName}",
        deleteMessageWithCV: ", their CV",
        deleteMessageWithMatches: " and {matchCount} matches",
        deleteWarning: "This action can't be reversed!",
        deleting: "Deleting...",
        delete: "Delete",
        cancel: "Cancel",
        successTitle: "User Deleted",
        successMessage: "User was deleted successfully.",
        ok: "OK"
      }
    },
    he: {
      title: "כל המשתמשים",
      loading: "טוען משתמשים...",
      error: "כשל בטעינת משתמשים.",
      table: {
        headers: {
          name: "שם",
          email: "אימייל",
          cvStatus: "סטטוס קורות חיים",
          signedUp: "תאריך הרשמה",
          totalMatches: "סה״כ התאמות",
          actions: ""
        }
      },
      actions: {
        deleteUser: "מחק משתמש"
      },
      modal: {
        deleteTitle: "אישור מחיקה",
        deleteMessage: "האם אתה בטוח שברצונך למחוק לחלוטין את המשתמש {userName}",
        deleteMessageWithCV: ", את קורות החיים שלו",
        deleteMessageWithMatches: " ו-{matchCount} התאמות",
        deleteWarning: "פעולה זו אינה ניתנת לביטול!",
        deleting: "מוחק...",
        delete: "מחק",
        cancel: "בטל",
        successTitle: "המשתמש נמחק",
        successMessage: "המשתמש נמחק בהצלחה.",
        ok: "אישור"
      }
    }
  }
};

// Helper function to get translation with template variable support
export const getTranslation = (section, key, language = 'en', variables = {}) => {
  try {
    // Handle nested keys like 'errors.loginFailed'
    const keys = key.split('.');
    let value = translations[section]?.[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    // If not found in current language, try fallback to English
    if (value === undefined && language !== 'en') {
      let fallbackValue = translations[section]?.['en'];
      for (const k of keys) {
        fallbackValue = fallbackValue?.[k];
      }
      value = fallbackValue;
    }
    
    // If still not found, return the key as fallback
    if (value === undefined) {
      console.warn(`Translation not found for: ${section}.${key} in ${language}`);
      return key;
    }
    
    // Replace template variables like {current} and {total}
    if (typeof value === 'string' && Object.keys(variables).length > 0) {
      return value.replace(/\{(\w+)\}/g, (match, varName) => {
        return variables[varName] !== undefined ? variables[varName] : match;
      });
    }
    
    return value;
  } catch (error) {
    console.warn(`Translation not found for: ${section}.${key} in ${language}`);
    return key; // return the key as fallback
  }
};

// Hook to get translations for a specific section (to be used with LanguageContext)
import { useLanguage } from '../contexts/LanguageContext';

export const useTranslations = (section) => {
  const { currentLanguage } = useLanguage();
  
  const t = (key, variables = {}) => getTranslation(section, key, currentLanguage, variables);
  
  return { t, currentLanguage };
};
