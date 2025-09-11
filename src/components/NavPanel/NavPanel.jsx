import React from "react";
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

  const isAdmin = user?.role === "admin";

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
    <aside 
      className="nav-panel" 
      role="navigation" 
      aria-label="Main navigation"
      style={{ direction: currentLanguage === 'he' ? 'rtl' : 'ltr' }}
    >
      <div className="nav-panel__header">
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
                >
                  <img
                    src={dashboardIcon}
                    alt="Overview Dashboard, created by Gemini"
                    className="nav-panel__icon"
                  />
                  {t('overview')}
                </NavLink>
              </li>
              <li className="nav-panel__item">
                <NavLink
                  to="/admin/users"
                  className={({ isActive }) =>
                    `nav-panel__link ${isActive ? "nav-panel__link--active" : ""}`
                  }
                >
                  <img
                    src={usersIcon}
                    alt="Users"
                    className="nav-panel__icon"
                  />
                  {t('users')}
                </NavLink>
              </li>
              <li className="nav-panel__item">
                <NavLink
                  to="/jobs-listings"
                  className={({ isActive }) =>
                    `nav-panel__link ${isActive ? "nav-panel__link--active" : ""}`
                  }
                >
                  <img
                    src={listingsIcon}
                    alt="Jobs Listings, created by Gemini"
                    className="nav-panel__icon"
                  />
                  {t('jobsListings')}
                </NavLink>
              </li>
              <li className="nav-panel__item">
                <NavLink
                  to="/admin/matches"
                  className={({ isActive }) =>
                    `nav-panel__link ${isActive ? "nav-panel__link--active" : ""}`
                  }
                >
                  <img
                    src={matchesIcon}
                    alt="Job Matches"
                    className="nav-panel__icon"
                  />
                  {t('jobMatches')}
                </NavLink>
              </li>
              <li className="nav-panel__item">
                <NavLink
                  to="/companies"
                  className={({ isActive }) =>
                    `nav-panel__link ${isActive ? "nav-panel__link--active" : ""}`
                  }
                >
                  <img
                    src={companiesIcon}
                    alt="Companies, created by Gemini"
                    className="nav-panel__icon"
                  />
                  {t('companies')}
                </NavLink>
              </li>
              <li className="nav-panel__item">
                <NavLink
                  to="/reporting"
                  className={({ isActive }) =>
                    `nav-panel__link ${isActive ? "nav-panel__link--active" : ""}`
                  }
                >
                  <img
                    src={reportingIcon}
                    alt="Reporting, created by Gemini"
                    className="nav-panel__icon"
                  />
                  {t('reporting')}
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
                >
                  <img
                    src={matchesIcon}
                    alt="Job Matches"
                    className="nav-panel__icon"
                  />
                  {t('jobMatches')}
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>

      <div className="nav-panel__footer">
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `nav-panel__link nav-panel__profile-link ${
              isActive ? "nav-panel__link--active" : ""
            }`
          }
          style={{ display: "flex", alignItems: "center", marginBottom: 12 }}
        >
          <img
            src={profileIcon}
            alt="Profile"
            className="nav-panel__icon"
            style={{ 
              marginRight: currentLanguage === 'he' ? 0 : 8,
              marginLeft: currentLanguage === 'he' ? 8 : 0
            }}
          />
          {t('profile')}
        </NavLink>
        <button onClick={handleLogout} className="nav-panel__logout">
          {t('logout')}
        </button>
      </div>
    </aside>
  );
};

export default NavPanel;
