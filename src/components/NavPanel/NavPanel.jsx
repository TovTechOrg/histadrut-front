import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import listingsIcon from "../../assets/icons/listings.svg";
import matchesIcon from "../../assets/icons/matches.svg";
import companiesIcon from "../../assets/icons/companies.svg";
import reportingIcon from "../../assets/icons/reporting.svg";
import "./NavPanel.css";

const NavPanel = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin-login");
  };

  return (
    <aside className="nav-panel" role="navigation" aria-label="Main navigation">
      <div className="nav-panel__header">
        <h2 className="nav-panel__title">Navigation</h2>
        <p className="nav-panel__user">Welcome, {user?.name}</p>
      </div>
      <nav className="nav-panel__nav" aria-label="Main navigation">
        <ul className="nav-panel__list">
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
              Jobs Listings
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
                alt="Job Matches, created by Gemini"
                className="nav-panel__icon"
              />
              Job Matches
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
              Companies
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
              Reporting
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="nav-panel__footer">
        <button onClick={handleLogout} className="nav-panel__logout">
          Logout
        </button>
      </div>
    </aside>
  );
};

export default NavPanel;
