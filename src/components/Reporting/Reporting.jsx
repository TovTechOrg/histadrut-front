import PerJobBarChart from "./PerJobBarChart";
import CompanyJobsPieChart from "./CompanyJobsPieChart";
import JobScoresStripPlot from "./JobScoresStripPlot";
import "./custom-scrollbar.css";
import styles from "./Reporting.module.css";
import { useEffect, useState } from "react";
import { fetchReportMatches } from "../../api/api";

const Reporting = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortIndex, setSortIndex] = useState(0);
  const [minScore, setMinScore] = useState(7.5);
  const [maxScore, setMaxScore] = useState(10);
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchReportMatches()
      .then((res) => {
        setData(res);
        setError(null);
        // Find the max score in the per_job data
        if (res && res.per_job && res.per_job.length > 0) {
          let max = 7.5;
          res.per_job.forEach((job) => {
            if (Array.isArray(job.candidates)) {
              job.candidates.forEach((c) => {
                if (typeof c.score === "number" && c.score > max) max = c.score;
              });
            } else if (typeof job.score === "number" && job.score > max) {
              max = job.score;
            }
          });
          setMaxScore(Math.max(7.5, Math.floor(max * 10) / 10));
        }
      })
      .catch((err) => {
        setError("Failed to load report data");
        setData(null);
      })
      .finally(() => setLoading(false));
  }, []);

  // Get all companies from data
  const allCompanies =
    data && data.per_job
      ? Array.from(new Set(data.per_job.map((j) => j.company)))
      : [];

  // Set default selected company when data loads
  useEffect(() => {
    if (data && data.per_job && data.per_job.length > 0) {
      setSelectedCompany(data.per_job[0].company);
    }
  }, [data]);

  // --- DATA MAPPING FOR CHARTS ---
  // 1. Bar chart: [{ company, job, matches, score }]
  const barChartData =
    data && data.per_job
      ? data.per_job.map((j) => ({
          company: j.company,
          job: j.job,
          matches: j.matches,
          score: j.score,
          job_id: j.job_id,
        }))
      : [];

  // 2. Pie chart: [{ company, job }]
  const pieChartData =
    data && data.per_job
      ? data.per_job.map((j) => ({
          company: j.company,
          job: j.job,
        }))
      : [];

  // 3. Strip plot: { [company]: [{ job, scores }] }
  const stripPlotData = {};
  if (data && data.per_job) {
    data.per_job.forEach((j) => {
      if (!stripPlotData[j.company]) stripPlotData[j.company] = [];
      stripPlotData[j.company].push({
        job: j.job,
        scores: j.scores,
      });
    });
  }

  // Jobs for selected company (for strip plot)
  const companyJobs =
    selectedCompany && stripPlotData[selectedCompany]
      ? stripPlotData[selectedCompany]
      : [];

  // Handler for pie chart click (to be passed to CompanyJobsPieChart)
  const handlePieClick = (company) => {
    setSelectedCompany(company);
  };

  // Dynamic chart title based on minScore
  const chartTitle = `Jobs with high-scoring matches (above ${minScore} score)`;

  // At the top of Reporting.jsx, after you get allCompanies:
  const companyColorPalette = [
    "#3498db",
    "#e67e22",
    "#2ecc71",
    "#e74c3c",
    "#9b59b6",
    "#f1c40f",
    "#1abc9c",
    "#34495e",
    "#fd79a8",
    "#00b894",
    "#fdcb6e",
    "#636e72",
    "#00cec9",
    "#6c5ce7",
    "#fab1a0",
    "#d35400",
    // ...add more if needed
  ];

  const companyColorMap = {};
  allCompanies.forEach((company, idx) => {
    companyColorMap[company] = companyColorPalette[idx % companyColorPalette.length];
  });

  return (
    <section className="main-page page">
      <h1 className="page__title">Reporting</h1>
      <div className="page__content">
        <div className={styles.reportingPageColumn}>
          {error && <div className={styles.error}>{error}</div>}
          {/* Filter bar: sorter + min score slider */}
          <>
            {!loading ? (
              <>
                <div className={styles.filterBar}>
                  <div className={styles.sorter}>
                    <label htmlFor="sort-bar-chart" className={styles.sorter__label}>
                      Sort by
                    </label>
                    <select
                      id="sort-bar-chart"
                      value={sortIndex}
                      onChange={(e) => setSortIndex(Number(e.target.value))}
                      className={styles.sorter__select}
                    >
                      <option value={0}>Company (A-Z)</option>
                      <option value={1}>Matches (High → Low)</option>
                    </select>
                  </div>
                  <div className={styles.minScoreFilter}>
                    <label
                      htmlFor="min-score-slider"
                      className={styles.sorter__label}
                    >
                      Min Score: <b>{minScore}</b>
                    </label>
                    <input
                      id="min-score-slider"
                      type="range"
                      min={7.5}
                      max={maxScore}
                      step={0.1}
                      value={minScore}
                      onChange={(e) => setMinScore(Number(e.target.value))}
                      className={styles.minScoreSlider}
                    />
                  </div>
                </div>
                <h2 className={styles.chartTitle}>{chartTitle}</h2>
              </>
            ) : (
              // Placeholder with same height as filters+title
              <div style={{ height: "72px" }} /> // Adjust height as needed
            )}
            <div className={styles.reportingCard}>
              {loading ? (
                <div className={styles.spinnerWrapper}>
                  <div className={styles.spinner} />
                </div>
              ) : (
                <PerJobBarChart
                  data={barChartData}
                  sortIndex={sortIndex}
                  setSortIndex={setSortIndex}
                  minScore={minScore}
                  companyColorMap={companyColorMap}
                />
              )}
            </div>
          </>
          <div className={styles.reportingCardLarge}>
            <div
              className="custom-scrollbar"
              style={{ height: "100%", overflowY: "auto" }}
            >
              {loading ? (
                <div className={styles.spinnerWrapper}>
                  <div className={styles.spinner} />
                </div>
              ) : (
                <div className={styles.flexRowGraphs}>
                  <div className={styles.pieChartCol}>
                    <CompanyJobsPieChart
                      data={pieChartData}
                      onSliceClick={handlePieClick}
                      selectedCompany={selectedCompany}
                      companyColorMap={companyColorMap}
                    />
                  </div>
                  <div className={styles.stripPlotCol}>
                    <div className={styles.companySelectorBar}>
                      <label
                        htmlFor="company-select"
                        className={styles.companySelectorLabel}
                      >
                        Show Company
                      </label>
                      <select
                        id="company-select"
                        value={selectedCompany || ""}
                        onChange={(e) => setSelectedCompany(e.target.value)}
                        className={styles.companySelector}
                      >
                        {allCompanies.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                    <JobScoresStripPlot
                      data={companyJobs}
                      companyColorMap={companyColorMap}
                      selectedCompany={selectedCompany}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reporting;
