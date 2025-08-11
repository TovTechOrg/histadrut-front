import React, { useState, useEffect } from "react";
import Stats from "./Stats";
import RecentActions from "./RecentActions";
import { fetchStats, transformStatsData } from "../../api/api";
import "./Overview.css";

const Overview = () => {
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const apiData = await fetchStats();
        setStatsData(transformStatsData(apiData));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  return (
    <section className="main-page overview">
    <h1 className="page__title">Dashboard Overview</h1>

      <Stats data={statsData} loading={loading} error={error} />

      <RecentActions />
    </section>
  );
};

export default Overview;
