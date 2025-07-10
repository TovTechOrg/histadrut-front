import React from "react";

const Stats = ({ data, loading, error }) => {
  if (loading) {
    return (
      <div className="stats">
        <div className="stats__loading">Loading statistics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="stats">
        <div className="stats__error">Error loading stats: {error}</div>
      </div>
    );
  }

  const statsCards = [
    {
      title: "Total Active Jobs",
      value: data?.jobs || 0,
      color: "blue",
    },
    {
      title: "Total Candidates",
      value: data?.candidates || 0,
      color: "green",
    },
    {
      title: "Total Matches",
      value: data?.matches || 0,
      color: "purple",
    },
    {
      title: "Jobs Added Last Day",
      value: data?.jobsLastDay || 0,
      color: "orange",
    },
    {
      title: "Jobs Added Last Week",
      value: data?.jobsLastWeek || 0,
      color: "teal",
    },
  ];

  return (
    <section className="stats" aria-labelledby="stats-heading">
      <h2 id="stats-heading" className="sr-only">
        Dashboard Statistics
      </h2>
      <div className="stats__grid">
        {statsCards.map((stat, index) => (
          <article
            key={index}
            className={`stats__card stats__card--${stat.color}`}
          >
            <h3 className="stats__card-title">{stat.title}</h3>
            <div className="stats__card-value">{stat.value}</div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Stats;
