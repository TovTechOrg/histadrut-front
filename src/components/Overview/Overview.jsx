import React, { useState, useEffect } from "react";
import Stats from "./Stats";
import RecentActions from "./RecentActions";
import { fetchStats } from "../../api/api";
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
        const data = await fetchStats();
        setStatsData(data);
      } catch (err) {
        setError(err.message);
        console.error("Error loading stats:", err);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  return (
    <div className="overview">
      <h1 className="overview__title">Dashboard Overview</h1>

      <Stats data={statsData} loading={loading} error={error} />

      <RecentActions />
    </div>
  );
};

export default Overview;
