import React from "react";
import { useCompaniesData } from "../../hooks/useCompaniesData";
import "./Companies.css";

const Companies = () => {
  const { companiesData, loading, error } = useCompaniesData();

  const handleAddCompany = () => {
    alert("Add new company");
  };

  const handleViewCompany = (companyName) => {
    alert(`Displaying ${companyName} jobs`);
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
          <button className="companies-add-btn" onClick={handleAddCompany}>
            <span className="companies-add-btn__icon">⊕</span>
            Add New Company
          </button>
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
          <button className="companies-add-btn" onClick={handleAddCompany}>
            <span className="companies-add-btn__icon">⊕</span>
            Add New Company
          </button>
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
        <button className="companies-add-btn" onClick={handleAddCompany}>
          <span className="companies-add-btn__icon">⊕</span>
          Add New Company
        </button>
      </div>

      <div className="companies-table">
        <table className="companies-table__table">
          <thead className="companies-table__header">
            <tr>
              <th className="companies-table__cell companies-table__cell--header">
                ID
              </th>
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
                        ☰
                      </button>
                      <button
                        className="companies-table__action-btn companies-table__action-btn--edit"
                        onClick={() => handleEditCompany(company.name)}
                        title={`Edit ${company.name}`}
                        aria-label={`Edit ${company.name}`}
                      >
                        ✎
                      </button>
                      <button
                        className="companies-table__action-btn companies-table__action-btn--delete"
                        onClick={() => handleDeleteCompany(company.name)}
                        title={`Delete ${company.name}`}
                        aria-label={`Delete ${company.name}`}
                      >
                        🗑
                      </button>
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
