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

  // Transform API data to match available data
  const statsCards = [
    {
      title: "Total Active Jobs",
      value: data?.Number_of_jobs || 0,
      color: "blue",
    },
    {
      title: "Total Candidates",
      value: data?.Number_of_candidtes || 0,
      color: "green",
    },
    {
      title: "Total Matches",
      value: data?.Number_of_matches || 0,
      color: "purple",
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
