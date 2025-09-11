import React, { useState, useEffect } from "react";
import Stats from "./Stats";
import { fetchStats, fetchCompaniesToday, transformStatsData } from "../../api/api";
import { useTranslations } from "../../utils/translations";
import { useLanguage } from "../../contexts/LanguageContext";
import "./Overview.css";

const Overview = () => {
  const { t } = useTranslations('overview');
  const { currentLanguage, toggleLanguage } = useLanguage();
  
  const [statsData, setStatsData] = useState(null);
  const [companiesToday, setCompaniesToday] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const [apiData, companiesData] = await Promise.all([
          fetchStats(),
          fetchCompaniesToday()
        ]);
        setStatsData(transformStatsData(apiData));
        setCompaniesToday(companiesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  return (
    <section className="main-page overview" style={{ direction: currentLanguage === 'he' ? 'rtl' : 'ltr', position: 'relative' }}>
      <h1 className="page__title">{t('title')}</h1>

      <Stats data={statsData} companiesToday={companiesToday} loading={loading} error={error} />
    </section>
  );
};

export default Overview;
