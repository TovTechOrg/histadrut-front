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
        scoreRange: ["0", "10"],
        locations: "Locations",
        locationsPlaceholder: "e.g., Tel Aviv, Jerusalem, Haifa",
        locationsHelp: "Separate multiple locations with commas"
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
        jobLinkNotAvailable: "Job link not available",
        linkToJob: "Link to Job",
        updating: "Updating...",
        revertStatus: "Revert Status",
        statusValues: {
          yes: "YES",
          no: "NO",
          pending: "Pending",
          sent: "Sent"
        }
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
        scoreRange: ["0", "10"],
        locations: "מיקומים",
        locationsPlaceholder: "למשל, תל אביב, ירושלים, חיפה",
        locationsHelp: "הפרד מיקומים מרובים עם פסיקים"
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
        jobLinkNotAvailable: "קישור למשרה לא זמין",
        linkToJob: "קישור למשרה",
        updating: "מעדכן...",
        revertStatus: "החזר סטטוס",
        statusValues: {
          yes: "כן",
          no: "לא",
          pending: "ממתין",
          sent: "נשלח"
        }
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

  // Modal components
  modals: {
    en: {
      candidateModal: {
        matchScore: "Match Score",
        mmr: "MMR",
        matchedAt: "Matched at",
        candidateOverview: "Candidate Overview",
        strengths: "Strengths",
        weaknesses: "Weaknesses",
        noStrengthsListed: "No strengths listed.",
        noWeaknessesListed: "No weaknesses listed.",
        noOverviewAvailable: "No overview available"
      },
      jobModal: {
        company: "Company",
        dateAdded: "Date Added",
        jobDescription: "Job Description",
        noDescriptionAvailable: "No description available"
      },
      jobDescriptionModal: {
        company: "Company",
        dateAdded: "Date Added",
        jobDescription: "Job Description",
        jobDetails: "Job Details",
        noDescriptionAvailable: "No description available"
      },
      jobViewModal: {
        description: "Description"
      }
    },
    he: {
      candidateModal: {
        matchScore: "ציון התאמה",
        mmr: "MMR",
        matchedAt: "הותאם ב",
        candidateOverview: "סקירת מועמד",
        strengths: "חוזקות",
        weaknesses: "חולשות",
        noStrengthsListed: "לא רשומות חוזקות.",
        noWeaknessesListed: "לא רשומות חולשות.",
        noOverviewAvailable: "אין סקירה זמינה"
      },
      jobModal: {
        company: "חברה",
        dateAdded: "תאריך הוספה",
        jobDescription: "תיאור המשרה",
        noDescriptionAvailable: "אין תיאור זמין"
      },
      jobDescriptionModal: {
        company: "חברה",
        dateAdded: "תאריך הוספה",
        jobDescription: "תיאור המשרה",
        jobDetails: "פרטי המשרה",
        noDescriptionAvailable: "אין תיאור זמין"
      },
      jobViewModal: {
        description: "תיאור"
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
  },

  // Reporting page
  reporting: {
    en: {
      title: "Reporting",
      loading: "Loading report data...",
      error: "Failed to load report data",
      filters: {
        sortBy: "Sort by",
        sortOptions: {
          companyAZ: "Company (A-Z)",
          matchesHighLow: "Matches (High → Low)"
        },
        minScore: "Min Score:",
        showCompany: "Show Company"
      },
      charts: {
        jobsWithHighScoreMatches: "Jobs with high-scoring matches (above {minScore} score)",
        topCompaniesByJobs: "Top Companies by Number of Jobs",
        scoreDensityAcrossJobs: "Score density across top jobs",
        numberOfMatches: "Number of Matches",
        jobs: "Jobs",
        job: "Job",
        score: "Score",
        company: "Company",
        matches: "Matches",
        avgScore: "Avg. Score",
        clickToViewJobMatches: "Click to view job matches",
        notEnoughData: "Not enough data to display the plot.",
        chartRequiresData: "This chart requires at least one job with three or more scores.",
        count: "Count",
        other: "Other"
      }
    },
    he: {
      title: "דוחות",
      loading: "טוען נתוני דוח...",
      error: "כשל בטעינת נתוני דוח",
      filters: {
        sortBy: "מיין לפי",
        sortOptions: {
          companyAZ: "חברה (א-ת)",
          matchesHighLow: "התאמות (גבוה → נמוך)"
        },
        minScore: "ציון מינימלי:",
        showCompany: "הצג חברה"
      },
      charts: {
        jobsWithHighScoreMatches: "משרות עם התאמות בציון גבוה (מעל {minScore})",
        topCompaniesByJobs: "חברות מובילות לפי מספר משרות",
        scoreDensityAcrossJobs: "צפיפות ציונים במשרות מובילות",
        numberOfMatches: "מספר התאמות",
        jobs: "משרות",
        job: "משרה",
        score: "ציון",
        company: "חברה",
        matches: "התאמות",
        avgScore: "ציון ממוצע",
        clickToViewJobMatches: "לחץ לצפייה בהתאמות משרה",
        notEnoughData: "אין מספיק נתונים להצגת הגרף.",
        chartRequiresData: "גרף זה דורש לפחות משרה אחת עם שלושה ציונים או יותר.",
        count: "כמות",
        other: "חברות אחרות"
      }
    }
  },

  // Job Listings page
  jobListings: {
    en: {
      title: "Job Listings Management",
      addNewJob: "Add New Job",
      loading: "Loading jobs...",
      errorLoading: "Error loading jobs",
      
      // Filters section
      filters: {
        title: "Filters",
        searchJobs: "Search Jobs",
        searchPlaceholder: "Search by job title, company, or description...",
        companyFilter: "Company",
        companyPlaceholder: "All Companies",
        statusFilter: "Status",
        statusPlaceholder: "All Statuses",
        clearFilters: "Clear Filters"
      },
      
      // Table headers and content
      table: {
        headers: {
          jobId: "Job ID",
          title: "Job Title", 
          company: "Company",
          status: "Status",
          age: "Age",
          matchCount: "Matches",
          datePosted: "Date Posted",
          linkToJob: "Link to Job",
          actions: "Actions"
        },
        loading: "Loading jobs...",
        error: "Error loading jobs: {error}",
        noJobs: "No jobs found",
        noJobsFiltered: "No jobs match the current filters",
        
        // Age indicators  
        ageLabels: {
          new: "New",
          fresh: "Fresh", 
          stale: "Stale",
          old: "Old",
          // Day-specific labels from API
          "1 day": "1 day",
          "2-5 days": "2-5 days", 
          "6-14 days": "6-14 days",
          "15+ days": "15+ days"
        },
        
        // Action tooltips
        actions: {
          view: "View job details",
          edit: "Edit job",
          delete: "Delete job",
          openLink: "Open job link"
        },
        
        // Link status
        linkNotAvailable: "Job link not available"
      },
      
      // Delete confirmation modal
      deleteModal: {
        title: "Delete Job and Matches",
        warningText: "Are you sure you want to delete this job and <b>all of its matches</b>? This action cannot be undone.",
        jobId: "Job ID",
        job: "Job",
        company: "Company",
        cancel: "Cancel",
        delete: "Delete",
        deleting: "Deleting...",
        errorDeleting: "Failed to delete job."
      },
      
      // Success modal after deletion
      successModal: {
        title: "Job Deleted",
        message: "Job and all its matches were deleted successfully.",
        instruction: "Close this message to refresh the list."
      }
    },
    he: {
      title: "ניהול רשימת משרות",
      addNewJob: "הוסף משרה חדשה",
      loading: "טוען משרות...",
      errorLoading: "שגיאה בטעינת משרות",
      
      // Filters section  
      filters: {
        title: "מסננים",
        searchJobs: "חפש משרות",
        searchPlaceholder: "חפש לפי כותרת משרה, חברה או תיאור...",
        companyFilter: "חברה",
        companyPlaceholder: "כל החברות",
        statusFilter: "סטטוס",
        statusPlaceholder: "כל הסטטוסים",
        clearFilters: "נקה מסננים"
      },
      
      // Table headers and content
      table: {
        headers: {
          jobId: "מזהה משרה",
          title: "כותרת המשרה",
          company: "חברה", 
          status: "סטטוס",
          age: "נוסף לפני",
          matchCount: "התאמות",
          datePosted: "תאריך פרסום",
          linkToJob: "קישור למשרה",
          actions: "פעולות"
        },
        loading: "טוען משרות...",
        error: "שגיאה בטעינת משרות: {error}",
        noJobs: "לא נמצאו משרות",
        noJobsFiltered: "לא נמצאו משרות התואמות למסננים הנוכחיים",
        
        // Age indicators
        ageLabels: {
          new: "חדש",
          fresh: "טרי",
          stale: "ישן",
          old: "מיושן",
          // Day-specific labels from API
          "1 day": "יום 1",
          "2-5 days": "ימים 2-5", 
          "6-14 days": "ימים 6-14",
          "15+ days": "ימים 15+"
        },
        
        // Action tooltips
        actions: {
          view: "הצג פרטי משרה",
          edit: "ערוך משרה", 
          delete: "מחק משרה",
          openLink: "פתח קישור למשרה"
        },
        
        // Link status
        linkNotAvailable: "קישור למשרה לא זמין"
      },
      
      // Delete confirmation modal
      deleteModal: {
        title: "מחק משרה והתאמות",
        warningText: "האם אתה בטוח שברצונך למחוק את המשרה הזו ו<b>את כל ההתאמות שלה</b>? פעולה זו אינה ניתנת לביטול.",
        jobId: "מזהה משרה",
        job: "משרה",
        company: "חברה",
        cancel: "בטל",
        delete: "מחק",
        deleting: "מוחק...",
        errorDeleting: "כשל במחיקת המשרה."
      },
      
      // Success modal after deletion
      successModal: {
        title: "המשרה נמחקה",
        message: "המשרה וכל ההתאמות שלה נמחקו בהצלחה.",
        instruction: "סגור הודעה זו כדי לרענן את הרשימה."
      }
    }
  },

  // Add Job page
  addJob: {
    en: {
      title: "Add a New Job",
      
      // Form fields
      form: {
        jobTitle: "Job Title",
        jobTitlePlaceholder: "e.g. Software Developer, Marketing Manager",
        
        positionLink: "Position Link",
        positionLinkPlaceholder: "https://example.com/careers/position",
        
        company: "Company",
        companyPlaceholder: "Select a company",
        companyOther: "Other",
        newCompanyName: "New Company Name",
        newCompanyPlaceholder: "Enter new company name",
        
        field: "Field",
        fieldPlaceholder: "Select a field",
        
        jobId: "Job ID",
        jobIdPlaceholder: "e.g. JOB-2024-001",
        
        location: "Location",
        locationPlaceholder: "e.g. Tel Aviv, Remote, Hybrid",
        
        scope: "Scope",
        scopePlaceholder: "Select scope...",
        scopeFullTime: "Full-time",
        scopePartTime: "Part-time",
        
        jobDescription: "Job Description",
        jobDescriptionPlaceholder: "Describe the responsibilities, requirements, and expectations for this role.",
        
        required: "Required field"
      },
      
      // Actions
      actions: {
        cancel: "Cancel",
        submit: "Add Job",
        update: "Update Job"
      },
      
      // Success modal
      successModal: {
        title: "Success",
        message: "Job added successfully!",
        messageUpdate: "Job updated successfully!"
      },
      
      // Error handling
      errors: {
        failedToAdd: "Failed to add job",
        failedToUpdate: "Failed to update job",
        pleaseCheck: "Please check the form and try again."
      }
    },
    he: {
      title: "הוסף משרה חדשה",
      
      // Form fields
      form: {
        jobTitle: "כותרת המשרה",
        jobTitlePlaceholder: "לדוגמה: מפתח תוכנה, מנהל שיווק",
        
        positionLink: "קישור למשרה",
        positionLinkPlaceholder: "https://example.com/careers/position",
        
        company: "חברה",
        companyPlaceholder: "בחר חברה",
        companyOther: "אחר",
        newCompanyName: "שם חברה חדש",
        newCompanyPlaceholder: "הכנס שם חברה חדש",
        
        field: "תחום",
        fieldPlaceholder: "בחר תחום",
        
        jobId: "מזהה משרה",
        jobIdPlaceholder: "לדוגמה: JOB-2024-001",
        
        location: "מיקום",
        locationPlaceholder: "לדוגמה: תל אביב, מרחוק, היברידי",
        
        scope: "היקף משרה",
        scopePlaceholder: "בחר היקף משרה...",
        scopeFullTime: "משרה מלאה",
        scopePartTime: "משרה חלקית",
        
        jobDescription: "תיאור המשרה",
        jobDescriptionPlaceholder: "תאר את האחריות, הדרישות והציפיות לתפקיד זה.",
        
        required: "שדה חובה"
      },
      
      // Actions
      actions: {
        cancel: "בטל",
        submit: "הוסף משרה",
        update: "עדכן משרה"
      },
      
      // Success modal
      successModal: {
        title: "הצלחה",
        message: "המשרה נוספה בהצלחה!",
        messageUpdate: "המשרה עודכנה בהצלחה!"
      },
      
      // Error handling
      errors: {
        failedToAdd: "כשל בהוספת המשרה",
        failedToUpdate: "כשל בעדכון המשרה",
        pleaseCheck: "אנא בדוק את הטופס ונסה שוב."
      }
    }
  },

  // Sign Up page
  signUp: {
    en: {
      title: "Sign Up",
      subtitle: "Create your account to get started",
      
      // Form fields
      form: {
        email: "Email",
        emailPlaceholder: "Enter your email",
        
        name: "Name", 
        namePlaceholder: "Enter your name",
        
        password: "Password",
        passwordPlaceholder: "Enter your password",
        
        confirmPassword: "Confirm Password",
        confirmPasswordPlaceholder: "Re-enter your password",
        
        showPassword: "Show password",
        hidePassword: "Hide password"
      },
      
      // Actions
      actions: {
        signUp: "Sign Up",
        loading: "Please wait...",
        signIn: "Sign In"
      },
      
      // Footer
      footer: {
        alreadyHaveAccount: "Already have an account?",
        cookieWarning: "⚠️ This site requires third-party cookies to log in. Please enable them in your browser settings."
      },
      
      // Error messages
      errors: {
        nameRequired: "Name is required.",
        passwordsMismatch: "Passwords do not match.",
        registrationFailed: "Registration failed",
        genericError: "An error occurred. Please try again."
      }
    },
    he: {
      title: "הרשמה",
      subtitle: "צור את החשבון שלך כדי להתחיל",
      
      // Form fields
      form: {
        email: "אימייל",
        emailPlaceholder: "הכנס את האימייל שלך",
        
        name: "שם",
        namePlaceholder: "הכנס את השם שלך",
        
        password: "סיסמה",
        passwordPlaceholder: "הכנס את הסיסמה שלך",
        
        confirmPassword: "אימות סיסמה",
        confirmPasswordPlaceholder: "הכנס שוב את הסיסמה שלך",
        
        showPassword: "הצג סיסמה",
        hidePassword: "הסתר סיסמה"
      },
      
      // Actions
      actions: {
        signUp: "הירשם",
        loading: "אנא המתן...",
        signIn: "התחבר"
      },
      
      // Footer
      footer: {
        alreadyHaveAccount: "כבר יש לך חשבון?",
        cookieWarning: "⚠️ אתר זה דורש עוגיות צד שלישי כדי להתחבר. אנא אפשר אותן בהגדרות הדפדפן שלך."
      },
      
      // Error messages
      errors: {
        nameRequired: "שם הוא שדה חובה.",
        passwordsMismatch: "הסיסמאות אינן תואמות.",
        registrationFailed: "ההרשמה נכשלה",
        genericError: "אירעה שגיאה. אנא נסה שוב."
      }
    }
  },

  // Password Reset Modal
  resetPassword: {
    en: {
      title: "Reset Password",
      emailLabel: "Email",
      emailPlaceholder: "Enter your email",
      sendResetLink: "Send Reset Link",
      sending: "Sending...",
      successMessage: "Check your email for a reset link.",
      failedToSend: "Failed to send reset email"
    },
    he: {
      title: "איפוס סיסמה",
      emailLabel: "אימייל",
      emailPlaceholder: "הכנס את האימייל שלך",
      sendResetLink: "שלח קישור איפוס",
      sending: "שולח...",
      successMessage: "בדוק את האימייל שלך לקישור איפוס.",
      failedToSend: "כשל בשליחת אימייל איפוס"
    }
  },

  // New Password Page
  newPassword: {
    en: {
      title: "Set New Password",
      newPassword: "New Password",
      newPasswordPlaceholder: "Enter new password",
      confirmPassword: "Confirm Password", 
      confirmPasswordPlaceholder: "Confirm new password",
      setPassword: "Set Password",
      setting: "Setting...",
      showPassword: "Show password",
      hidePassword: "Hide password",
      
      errors: {
        fillAllFields: "Please fill in all fields.",
        passwordsMismatch: "Passwords do not match.",
        failedToSet: "Failed to set new password"
      }
    },
    he: {
      title: "הגדר סיסמה חדשה",
      newPassword: "סיסמה חדשה",
      newPasswordPlaceholder: "הכנס סיסמה חדשה",
      confirmPassword: "אימות סיסמה",
      confirmPasswordPlaceholder: "אמת את הסיסמה החדשה",
      setPassword: "הגדר סיסמה",
      setting: "מגדיר...",
      showPassword: "הצג סיסמה",
      hidePassword: "הסתר סיסמה",
      
      errors: {
        fillAllFields: "אנא מלא את כל השדות.",
        passwordsMismatch: "הסיסמאות אינן תואמות.",
        failedToSet: "כשל בהגדרת סיסמה חדשה"
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
