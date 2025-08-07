import React from "react";
import { useNavigate } from "react-router-dom";
import { useCompaniesData } from "../../hooks/useCompaniesData";
import { useAuth } from "../../hooks/useAuth";
import addIcon from "../../assets/icons/add.svg";
import viewJobsIcon from "../../assets/icons/viewJobs.svg";
import editIcon from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import "./Companies.css";

const Companies = () => {
  const { user } = useAuth();
  const { companiesData, loading, error } = useCompaniesData();
  const navigate = useNavigate();

  const isAdmin = user?.role === "admin";

  const handleAddCompany = () => {
    alert("Add new company");
  };

  const handleViewCompany = (companyName) => {
    // Navigate to job listings page with company filter
    navigate(`/jobs-listings?company=${encodeURIComponent(companyName)}`);
  };

  const handleEditCompany = (companyName) => {
    alert(`Edit ${companyName}`);
  };

  const handleDeleteCompany = (companyName) => {
    alert(`Delete ${companyName}`);
  };

  if (loading) {
    return (
      <section className="companies-page">
        <div className="companies-header">
          <h1 className="companies-title">Company Management</h1>
          {isAdmin && (
            <button className="companies-add-btn" onClick={handleAddCompany}>
              <img
                src={addIcon}
                alt="Add, created by Gemini"
                className="companies-add-btn__icon"
              />
              Add New Company
            </button>
          )}
        </div>
        <div className="companies-table">
          <div className="companies-table__loading">Loading companies...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="companies-page">
        <div className="companies-header">
          <h1 className="companies-title">Company Management</h1>
          {isAdmin && (
            <button className="companies-add-btn" onClick={handleAddCompany}>
              <img
                src={addIcon}
                alt="Add, created by Gemini"
                className="companies-add-btn__icon"
              />
              Add New Company
            </button>
          )}
        </div>
        <div className="companies-table">
          <div className="companies-table__error">
            Error loading companies: {error}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="companies-page">
      <div className="companies-header">
        <h1 className="companies-title">Company Management</h1>
        {isAdmin && (
          <button className="companies-add-btn" onClick={handleAddCompany}>
            <img
              src={addIcon}
              alt="Add, created by Gemini"
              className="companies-add-btn__icon"
            />
            Add New Company
          </button>
        )}
      </div>

      <div className="companies-table">
        <table className="companies-table__table">
          <thead className="companies-table__header">
            <tr>
              <th className="companies-table__cell companies-table__cell--header"></th>
              <th className="companies-table__cell companies-table__cell--header">
                Company Name
              </th>
              <th className="companies-table__cell companies-table__cell--header">
                Jobs Count
              </th>
              <th className="companies-table__cell companies-table__cell--header">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {companiesData.length === 0 ? (
              <tr>
                <td colSpan="4" className="companies-table__empty">
                  No companies found.
                </td>
              </tr>
            ) : (
              companiesData.map((company) => (
                <tr key={company.id} className="companies-table__row">
                  <td className="companies-table__cell companies-table__cell--id">
                    {company.id}
                  </td>
                  <td className="companies-table__cell companies-table__cell--name">
                    {company.name}
                  </td>
                  <td className="companies-table__cell companies-table__cell--jobs-count">
                    {company.jobsCount}
                  </td>
                  <td className="companies-table__cell companies-table__cell--actions">
                    <div className="companies-table__actions">
                      <button
                        className="companies-table__action-btn companies-table__action-btn--view"
                        onClick={() => handleViewCompany(company.name)}
                        title={`View ${company.name} jobs`}
                        aria-label={`View ${company.name} jobs`}
                      >
                        <img
                          src={viewJobsIcon}
                          alt="View Jobs, created by Gemini"
                          className="companies-table__action-icon"
                        />
                      </button>
                      {isAdmin && (
                        <>
                          <button
                            className="companies-table__action-btn companies-table__action-btn--edit"
                            onClick={() => handleEditCompany(company.name)}
                            title={`Edit ${company.name}`}
                            aria-label={`Edit ${company.name}`}
                          >
                            <img
                              src={editIcon}
                              alt="Edit, created by Gemini"
                              className="companies-table__action-icon"
                            />
                          </button>
                          <button
                            className="companies-table__action-btn companies-table__action-btn--delete"
                            onClick={() => handleDeleteCompany(company.name)}
                            title={`Delete ${company.name}`}
                            aria-label={`Delete ${company.name}`}
                          >
                            <img
                              src={deleteIcon}
                              alt="Delete, created by Gemini"
                              className="companies-table__action-icon"
                            />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Companies;
