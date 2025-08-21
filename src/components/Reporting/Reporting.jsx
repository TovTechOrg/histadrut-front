
import React from "react";
import PerJobBarChart from "./PerJobBarChart";
import CompanyJobsPieChart from "./CompanyJobsPieChart";
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

  useEffect(() => {
    setLoading(true);
    fetchReportMatches()
      .then((res) => {
        setData(res);
        setError(null);
        // Find the max score in the per_job data
        if (res && res.per_job && res.per_job.length > 0) {
          let max = 7.5;
          res.per_job.forEach(job => {
            if (Array.isArray(job.candidates)) {
              job.candidates.forEach(c => {
                if (typeof c.score === 'number' && c.score > max) max = c.score;
              });
            } else if (typeof job.score === 'number' && job.score > max) {
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

  return (
    <section className="main-page page">
      <h1 className="page__title">Reporting</h1>
      <div className="page__content">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 64, minHeight: 800, padding: '0 24px' }}>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          {/* Filter bar: sorter + min score slider */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 32, marginBottom: -60 }}>
            <div className={styles.sorter} style={{ marginBottom: 0 }}>
              <label htmlFor="sort-bar-chart" className={styles.sorter__label}>Sort by</label>
              <select
                id="sort-bar-chart"
                value={sortIndex}
                onChange={e => setSortIndex(Number(e.target.value))}
                className={styles.sorter__select}
              >
                <option value={0}>Company (A-Z)</option>
                <option value={1}>Matches (High → Low)</option>
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 180 }}>
              <label htmlFor="min-score-slider" className={styles.sorter__label} style={{ marginBottom: 8 }}>Min Score: <b>{minScore}</b></label>
              <input
                id="min-score-slider"
                type="range"
                min={7.5}
                max={maxScore}
                step={0.1}
                value={minScore}
                onChange={e => setMinScore(Number(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>
          </div>
          <div className={`custom-scrollbar ${styles['reporting-card']}`}>
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300 }}>
                <div style={{
                  border: '6px solid #f3f3f3',
                  borderTop: '6px solid #3498db',
                  borderRadius: '50%',
                  width: 48,
                  height: 48,
                  animation: 'spin 1s linear infinite'
                }} />
                <style>{`
                  @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                  }
                `}</style>
              </div>
            ) : (
              data && data.per_job && (
                <PerJobBarChart
                  data={data.per_job}
                  sortIndex={sortIndex}
                  setSortIndex={setSortIndex}
                  minScore={minScore}
                />
              )
            )}
          </div>
          <div style={{ minHeight: 400, maxHeight: 600, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #0001', padding: 16 }}>
            <div className="custom-scrollbar" style={{ height: '100%', overflowY: 'auto' }}>
              {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300 }}>
                  <div style={{
                    border: '6px solid #f3f3f3',
                    borderTop: '6px solid #3498db',
                    borderRadius: '50%',
                    width: 48,
                    height: 48,
                    animation: 'spin 1s linear infinite'
                  }} />
                  <style>{`
                    @keyframes spin {
                      0% { transform: rotate(0deg); }
                      100% { transform: rotate(360deg); }
                    }
                  `}</style>
                </div>
              ) : (
                data && data.per_job && <CompanyJobsPieChart data={data.per_job} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reporting;
