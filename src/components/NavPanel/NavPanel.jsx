import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { backendLogout } from "../../api/api";
import { capitalizeName } from "../../utils/textHelpers";
import { useTranslations } from "../../utils/translations";
import { useLanguage } from "../../contexts/LanguageContext";
import dashboardIcon from "../../assets/icons/dashboard.svg";
import profileIcon from "../../assets/icons/profile.svg";
import listingsIcon from "../../assets/icons/listings.svg";
import matchesIcon from "../../assets/icons/matches.svg";
import companiesIcon from "../../assets/icons/companies.svg";
import usersIcon from "../../assets/icons/users.svg";
import reportingIcon from "../../assets/icons/reporting.svg";
import "./NavPanel.css";

const NavPanel = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslations('navigation');
  const { currentLanguage } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const isAdmin = user?.role === "admin";

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      // On desktop, we start collapsed but show full state on mobile toggle
      if (!mobile) {
        setIsExpanded(false); // Desktop starts collapsed
      } else {
        setIsExpanded(false); // Mobile starts hidden
      }
    };

    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const handleMouseEnter = () => {
    if (isMobile) return; // Don't auto-expand on mobile
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    if (isMobile) return; // Don't auto-collapse on mobile
    setIsExpanded(false);
  };

  const handleLogout = async () => {
    try {
      await backendLogout();
    } catch {
      // Ignore backend logout errors, still proceed with frontend logout
    }
    logout();
    navigate("/login");
  };

  return (
    <>
      {/* Mobile hamburger button when nav is closed */}
      {isMobile && !isExpanded && (
        <button 
          className="nav-panel__mobile-toggle"
          onClick={handleToggleExpansion}
          aria-label="Open navigation"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      )}
      
      {/* Mobile overlay */}
      {isMobile && isExpanded && (
        <div 
          className="nav-overlay nav-overlay--visible"
          onClick={() => setIsExpanded(false)}
        />
      )}
      
      <aside 
        className={`nav-panel ${isExpanded ? 'nav-panel--expanded' : 'nav-panel--collapsed'} ${isMobile ? 'nav-panel--mobile' : 'nav-panel--desktop'}`}
        role="navigation" 
        aria-label="Main navigation"
        style={{ direction: currentLanguage === 'he' ? 'rtl' : 'ltr' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
      {/* Toggle button for mobile */}
      {isMobile && (
        <button 
          className="nav-panel__toggle"
          onClick={handleToggleExpansion}
          aria-label={isExpanded ? "Collapse navigation" : "Expand navigation"}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 7H17M3 13H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      )}

      <div className={`nav-panel__header ${!isExpanded ? 'nav-panel__header--collapsed' : ''}`}>
        <h2 className="nav-panel__title">{t('title')}</h2>
        <p className="nav-panel__user">{t('welcome')}, {capitalizeName(user?.name)}</p>
      </div>
      <nav className="nav-panel__nav" aria-label="Main navigation">
        <ul className="nav-panel__list">
          {isAdmin ? (
            <>
              <li className="nav-panel__item">
                <NavLink
                  to="/overview"
                  className={({ isActive }) =>
                    `nav-panel__link ${isActive ? "nav-panel__link--active" : ""}`
                  }
                  title={!isExpanded ? t('overview') : undefined}
                >
                  <img
                    src={dashboardIcon}
                    alt="Overview Dashboard, created by Gemini"
                    className="nav-panel__icon"
                  />
                  {isExpanded && <span className="nav-panel__text">{t('overview')}</span>}
                </NavLink>
              </li>
              <li className="nav-panel__item">
                <NavLink
                  to="/admin/users"
                  className={({ isActive }) =>
                    `nav-panel__link ${isActive ? "nav-panel__link--active" : ""}`
                  }
                  title={!isExpanded ? t('users') : undefined}
                >
                  <img
                    src={usersIcon}
                    alt="Users"
                    className="nav-panel__icon"
                  />
                  {isExpanded && <span className="nav-panel__text">{t('users')}</span>}
                </NavLink>
              </li>
              <li className="nav-panel__item">
                <NavLink
                  to="/jobs-listings"
                  className={({ isActive }) =>
                    `nav-panel__link ${isActive ? "nav-panel__link--active" : ""}`
                  }
                  title={!isExpanded ? t('jobsListings') : undefined}
                >
                  <img
                    src={listingsIcon}
                    alt="Jobs Listings, created by Gemini"
                    className="nav-panel__icon"
                  />
                  {isExpanded && <span className="nav-panel__text">{t('jobsListings')}</span>}
                </NavLink>
              </li>
              <li className="nav-panel__item">
                <NavLink
                  to="/admin/matches"
                  className={({ isActive }) =>
                    `nav-panel__link ${isActive ? "nav-panel__link--active" : ""}`
                  }
                  title={!isExpanded ? t('jobMatches') : undefined}
                >
                  <img
                    src={matchesIcon}
                    alt="Job Matches"
                    className="nav-panel__icon"
                  />
                  {isExpanded && <span className="nav-panel__text">{t('jobMatches')}</span>}
                </NavLink>
              </li>
              <li className="nav-panel__item">
                <NavLink
                  to="/companies"
                  className={({ isActive }) =>
                    `nav-panel__link ${isActive ? "nav-panel__link--active" : ""}`
                  }
                  title={!isExpanded ? t('companies') : undefined}
                >
                  <img
                    src={companiesIcon}
                    alt="Companies, created by Gemini"
                    className="nav-panel__icon"
                  />
                  {isExpanded && <span className="nav-panel__text">{t('companies')}</span>}
                </NavLink>
              </li>
              <li className="nav-panel__item">
                <NavLink
                  to="/reporting"
                  className={({ isActive }) =>
                    `nav-panel__link ${isActive ? "nav-panel__link--active" : ""}`
                  }
                  title={!isExpanded ? t('reporting') : undefined}
                >
                  <img
                    src={reportingIcon}
                    alt="Reporting, created by Gemini"
                    className="nav-panel__icon"
                  />
                  {isExpanded && <span className="nav-panel__text">{t('reporting')}</span>}
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="nav-panel__item">
                <NavLink
                  to="/user/matches"
                  className={({ isActive }) =>
                    `nav-panel__link ${isActive ? "nav-panel__link--active" : ""}`
                  }
                  title={!isExpanded ? t('jobMatches') : undefined}
                >
                  <img
                    src={matchesIcon}
                    alt="Job Matches"
                    className="nav-panel__icon"
                  />
                  {isExpanded && <span className="nav-panel__text">{t('jobMatches')}</span>}
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>

      <div className={`nav-panel__footer ${!isExpanded ? 'nav-panel__footer--collapsed' : ''}`}>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `nav-panel__link nav-panel__profile-link ${
              isActive ? "nav-panel__link--active" : ""
            }`
          }
          title={!isExpanded ? t('profile') : undefined}
          style={{ display: "flex", alignItems: "center", marginBottom: isExpanded ? 12 : 8 }}
        >
          <img
            src={profileIcon}
            alt="Profile"
            className="nav-panel__icon"
          />
          {isExpanded && <span className="nav-panel__text">{t('profile')}</span>}
        </NavLink>
        
        <button 
          onClick={handleLogout} 
          className={`nav-panel__logout ${!isExpanded && !isMobile ? 'nav-panel__logout--icon' : ''}`}
          title={!isExpanded ? t('logout') : undefined}
          aria-label={t('logout')}
        >
          {(!isExpanded && !isMobile) ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="nav-panel__logout-icon">
              <path d="M9 17H5C3.89543 17 3 16.1046 3 15V5C3 3.89543 3.89543 3 5 3H9M15 13L17 11M17 11L15 9M17 11H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : null}
          <span className={`nav-panel__text ${!isExpanded && !isMobile ? 'nav-panel__logout-text--hidden' : ''}`}>
            {t('logout')}
          </span>
        </button>
      </div>
    </aside>
    </>
  );
};

export default NavPanel;
