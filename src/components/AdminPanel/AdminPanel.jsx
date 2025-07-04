import React from "react";
import { NavLink } from "react-router-dom";
import "./AdminPanel.css";

const AdminPanel = () => {
  return (
    <aside className="admin-panel">
      <h2 className="admin-panel__title">Admin Panel</h2>
      <nav className="admin-panel__nav">
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
              <span className="admin-panel__icon">📊</span>
              Dashboard
            </NavLink>
          </li>
          <li className="admin-panel__item">
            <NavLink
              to="/jobs"
              className={({ isActive }) =>
                `admin-panel__link ${
                  isActive ? "admin-panel__link--active" : ""
                }`
              }
            >
              <span className="admin-panel__icon">💼</span>
              Job Listings
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
              <span className="admin-panel__icon">🏢</span>
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
              <span className="admin-panel__icon">📈</span>
              Reporting
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default AdminPanel;
