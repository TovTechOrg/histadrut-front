import React from "react";

const RecentActions = () => {
  // Mock data for recent administrative actions
  const recentActions = [
    {
      id: 1,
      action: "Admin User logged in.",
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      type: "login",
    },
    {
      id: 2,
      action: "System initialized.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      type: "system",
    },
    {
      id: 3,
      action: "New job posting approved.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
      type: "approval",
    },
    {
      id: 4,
      action: "User registration completed.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
      type: "registration",
    },
    {
      id: 5,
      action: "Database backup completed.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
      type: "system",
    },
  ];

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - timestamp) / (1000 * 60));

    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} days ago`;
    }
  };

  const getActionIcon = (type) => {
    switch (type) {
      case "login":
        return "👤";
      case "system":
        return "⚙️";
      case "approval":
        return "✅";
      case "registration":
        return "📝";
      default:
        return "📋";
    }
  };

  return (
    <section
      className="recent-actions"
      aria-labelledby="recent-actions-heading"
    >
      <h2 id="recent-actions-heading" className="recent-actions__title">
        Recent Administrative Actions
      </h2>
      <ol className="recent-actions__list">
        {recentActions.map((action) => (
          <li key={action.id}>
            <article className="recent-actions__item">
              <div className="recent-actions__icon" aria-hidden="true">
                {getActionIcon(action.type)}
              </div>
              <div className="recent-actions__content">
                <div className="recent-actions__text">{action.action}</div>
                <time
                  className="recent-actions__time"
                  dateTime={action.timestamp.toISOString()}
                >
                  {formatTimeAgo(action.timestamp)}
                </time>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default RecentActions;
