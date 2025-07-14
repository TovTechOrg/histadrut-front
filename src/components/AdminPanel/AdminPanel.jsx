import React from "react";
import { NavLink } from "react-router-dom";
import dashboardIcon from "../../assets/icons/dashboard.svg";
import listingsIcon from "../../assets/icons/listings.svg";
import matchesIcon from "../../assets/icons/matches.svg";
import companiesIcon from "../../assets/icons/companies.svg";
import reportingIcon from "../../assets/icons/reporting.svg";
import "./AdminPanel.css";

const AdminPanel = () => {
  return (
    <aside
      className="admin-panel"
      role="navigation"
      aria-label="Admin navigation"
    >
      <h2 className="admin-panel__title">Admin Panel</h2>
      <nav className="admin-panel__nav" aria-label="Main admin navigation">
        <ul className="admin-panel__list">
          <li className="admin-panel__item">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `admin-panel__link ${
                  isActive ? "admin-panel__link--active" : ""
                }`
              }
            >
              <img
                src={dashboardIcon}
                alt="Dashboard, created by Gemini"
                className="admin-panel__icon"
              />
              Dashboard
            </NavLink>
          </li>
          <li className="admin-panel__item">
            <NavLink
              to="/jobs-listings"
              className={({ isActive }) =>
                `admin-panel__link ${
                  isActive ? "admin-panel__link--active" : ""
                }`
              }
            >
              <img
                src={listingsIcon}
                alt="Jobs Listings, created by Gemini"
                className="admin-panel__icon"
              />
              Jobs Listings
            </NavLink>
          </li>
          <li className="admin-panel__item">
            <NavLink
              to="/matches"
              className={({ isActive }) =>
                `admin-panel__link ${
                  isActive ? "admin-panel__link--active" : ""
                }`
              }
            >
              <img
                src={matchesIcon}
                alt="Job Matches, created by Gemini"
                className="admin-panel__icon"
              />
              Job Matches
            </NavLink>
          </li>
          <li className="admin-panel__item">
            <NavLink
              to="/companies"
              className={({ isActive }) =>
                `admin-panel__link ${
                  isActive ? "admin-panel__link--active" : ""
                }`
              }
            >
              <img
                src={companiesIcon}
                alt="Companies, created by Gemini"
                className="admin-panel__icon"
              />
              Companies
            </NavLink>
          </li>

          <li className="admin-panel__item">
            <NavLink
              to="/reporting"
              className={({ isActive }) =>
                `admin-panel__link ${
                  isActive ? "admin-panel__link--active" : ""
                }`
              }
            >
              <img
                src={reportingIcon}
                alt="Reporting, created by Gemini"
                className="admin-panel__icon"
              />
              Reporting
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default AdminPanel;
