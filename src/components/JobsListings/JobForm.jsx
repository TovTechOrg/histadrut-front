import React, { useState, useEffect } from "react";
import { fetchCompanies } from "../../api/api";

const initialJobState = {
  job_title: "",
  position_link: "",
  company_name: "",
  field: "",
  job_id: "",
  location: "",
  scope: "",
  job_description: "",
};

export default function JobForm({ onSubmit, onCancel, initialValues = initialJobState, submitLabel = "OK", pageTitle, viewMode = false }) {
  const [form, setForm] = useState(initialValues);
  const [companies, setCompanies] = useState([]);
  const [companySelect, setCompanySelect] = useState(initialValues.company_name ? initialValues.company_name : "");
  const [showOther, setShowOther] = useState(false);
  const [otherCompany, setOtherCompany] = useState("");

  useEffect(() => {
    fetchCompanies().then((data) => {
      if (data && typeof data === "object") {
        setCompanies(Object.keys(data));
      }
    });
  }, []);

  const handleChange = (e) => {
    if (viewMode) return;
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCompanySelect = (e) => {
    const value = e.target.value;
    setCompanySelect(value);
    if (value === "Other") {
      setShowOther(true);
      setForm((prev) => ({ ...prev, company_name: "" }));
    } else {
      setShowOther(false);
      setForm((prev) => ({ ...prev, company_name: value }));
    }
  };

  const handleOtherCompanyChange = (e) => {
    setOtherCompany(e.target.value);
    setForm((prev) => ({ ...prev, company_name: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <>
      <style>{`
        .job-form input::placeholder,
        .job-form textarea::placeholder {
          color: #8a99a8;
          opacity: 1;
        }
      `}</style>
      {pageTitle && (
        <h1 style={{ textAlign: "center", fontSize: "2rem", fontWeight: 600, marginBottom: "2rem" }}>{pageTitle}</h1>
      )}
  <form className="job-form" onSubmit={handleSubmit}>
        <div className="job-form__fields">
          <label className="job-form__label job-form__label--required">
            <span className="job-form__label-text">
              Job Title <span className="job-form__asterisk">*</span>
            </span>
            <input
              name="job_title"
              value={form.job_title}
              onChange={handleChange}
              required={!viewMode}
              placeholder="e.g. Senior Backend Developer"
              style={{ background: "#fafbfc", color: "#222", border: "1px solid #e1e8ed", borderRadius: "4px", fontSize: "0.9rem", padding: "0.75rem" }}
              disabled={viewMode}
            />
          </label>
          <label style={{ textTransform: "uppercase", fontWeight: 600, fontSize: "0.85rem", color: "#5a6c7d", marginBottom: "0.5rem", textAlign: "left" }}>
            Position Link
            <input
              name="position_link"
              value={form.position_link}
              onChange={handleChange}
              placeholder="Paste job posting URL here"
              style={{ background: "#fafbfc", color: "#222", border: "1px solid #e1e8ed", borderRadius: "4px", fontSize: "0.9rem", padding: "0.75rem" }}
              disabled={viewMode}
            />
          </label>
          <label className="job-form__label job-form__label--required">
            <span className="job-form__label-text">
              Company Name <span className="job-form__asterisk">*</span>
            </span>
            <select
              name="company_name"
              value={companySelect}
              onChange={handleCompanySelect}
              required={!viewMode}
              style={{ background: "#fafbfc", color: "#222", border: "1px solid #e1e8ed", borderRadius: "4px", fontSize: "0.9rem", padding: "0.75rem" }}
              disabled={viewMode}
            >
              <option value="">Select company...</option>
              {companies.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
              <option value="Other">Other</option>
              {viewMode && companySelect && !companies.includes(companySelect) && (
                <option value={companySelect}>{companySelect}</option>
              )}
            </select>
          </label>
          <label style={{ textTransform: "uppercase", fontWeight: 600, fontSize: "0.85rem", color: "#5a6c7d", marginBottom: "0.5rem", textAlign: "left", visibility: showOther ? "visible" : "hidden" }}>
            New Company Name
            <input
              name="other_company"
              value={otherCompany}
              onChange={handleOtherCompanyChange}
              required={showOther && !viewMode}
              placeholder="Enter new company name"
              style={{ background: "#fafbfc", color: "#222", border: "1px solid #e1e8ed", borderRadius: "4px", fontSize: "0.9rem", padding: "0.75rem" }}
              disabled={viewMode}
            />
          </label>
          <label style={{ textTransform: "uppercase", fontWeight: 600, fontSize: "0.85rem", color: "#5a6c7d", marginBottom: "0.5rem", textAlign: "left" }}>
            Field
            <input
              name="field"
              value={form.field}
              onChange={handleChange}
              placeholder="e.g. Software, Marketing, HR"
              style={{ background: "#fafbfc", color: "#222", border: "1px solid #e1e8ed", borderRadius: "4px", fontSize: "0.9rem", padding: "0.75rem" }}
              disabled={viewMode}
            />
          </label>
          <label className="job-form__label job-form__label--required">
            <span className="job-form__label-text">
              Job ID <span className="job-form__asterisk">*</span>
            </span>
            <input
              name="job_id"
              value={form.job_id}
              onChange={handleChange}
              required={!viewMode}
              placeholder="Internal or external job reference ID"
              style={{ background: "#fafbfc", color: "#222", border: "1px solid #e1e8ed", borderRadius: "4px", fontSize: "0.9rem", padding: "0.75rem" }}
              disabled={viewMode}
            />
          </label>
          <label style={{ textTransform: "uppercase", fontWeight: 600, fontSize: "0.85rem", color: "#5a6c7d", marginBottom: "0.5rem", textAlign: "left" }}>
            Location
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="e.g. Tel Aviv, Remote, Hybrid"
              style={{ background: "#fafbfc", color: "#222", border: "1px solid #e1e8ed", borderRadius: "4px", fontSize: "0.9rem", padding: "0.75rem" }}
              disabled={viewMode}
            />
          </label>
          <label style={{ textTransform: "uppercase", fontWeight: 600, fontSize: "0.85rem", color: "#5a6c7d", marginBottom: "0.5rem", textAlign: "left" }}>
            Scope
            <select
              name="scope"
              value={form.scope}
              onChange={handleChange}
              style={{ background: "#fafbfc", color: "#222", border: "1px solid #e1e8ed", borderRadius: "4px", fontSize: "0.9rem", padding: "0.75rem" }}
              disabled={viewMode}
            >
              <option value="">Select scope...</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              {viewMode && form.scope && !["Full-time", "Part-time"].includes(form.scope) && (
                <option value={form.scope}>{form.scope}</option>
              )}
            </select>
          </label>
          <label style={{ textTransform: "uppercase", fontWeight: 600, fontSize: "0.85rem", color: "#5a6c7d", marginBottom: "0.5rem", textAlign: "left" }}>
            Job Description
            <textarea
              name="job_description"
              value={form.job_description}
              onChange={handleChange}
              placeholder="Describe the responsibilities, requirements, and expectations for this role."
              style={{ background: "#fafbfc", color: "#222", border: "1px solid #e1e8ed", borderRadius: "4px", fontSize: "0.9rem", padding: "0.75rem", minHeight: "80px" }}
              disabled={viewMode}
            />
          </label>
        </div>
        {!viewMode && (
          <div className="job-form__actions">
            <button type="button" className="job-form__cancel" onClick={onCancel}>Cancel</button>
            <button type="submit" className="job-form__ok">{submitLabel}</button>
          </div>
        )}
      </form>
    </>
  );
}
