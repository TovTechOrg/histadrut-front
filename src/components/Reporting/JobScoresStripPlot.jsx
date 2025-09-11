import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";
import { kernelDensityEstimator, gaussianKernel, quantile } from "./violinUtils";

// Initialize highcharts-more for areasplinerange
if (typeof HighchartsMore === "function") {
  HighchartsMore(Highcharts);
}

function hexToRgb(hex) {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) hex = hex.split("").map(x => x + x).join("");
  const num = parseInt(hex, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255].join(",");
}

const JobScoresStripPlot = ({ data = [], companyColorMap = {}, selectedCompany, t }) => {
  // data: [{ job: string, scores: number[] }]
  // Only include jobs with at least 1 score (no filter), then take top 20 by count
  let jobs = data.filter(j => Array.isArray(j.scores) && j.scores.length > 0);
  jobs = jobs.sort((a, b) => b.scores.length - a.scores.length).slice(0, 20);

  if (jobs.length === 0) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: '#888', height: '340px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {t ? t('charts.notEnoughData') : 'Not enough data to display the plot.'} <br/>
        {t ? t('charts.chartRequiresData') : 'This chart requires at least one job with three or more scores.'}
      </div>
    );
  }

  const categories = jobs.map(j => j.job);

  let maxCount = 1;
  jobs.forEach(job => {
    const scoreCounts = {};
    job.scores.forEach(s => {
      const rounded = Math.round(s * 100) / 100;
      scoreCounts[rounded] = (scoreCounts[rounded] || 0) + 1;
    });
    Object.values(scoreCounts).forEach(count => {
      if (count > maxCount) maxCount = count;
    });
  });

  // Only scatter dots for unique scores
  const scatterSeries = [];
  jobs.forEach((job, jobIndex) => {
    const scores = job.scores;
    const scoreCounts = {};
    scores.forEach(s => {
      const rounded = Math.round(s * 100) / 100;
      scoreCounts[rounded] = (scoreCounts[rounded] || 0) + 1;
    });

    const scatterData = Object.entries(scoreCounts).map(([score, count]) => {
      // 1 match = 50% alpha, maxCount = 100%, 2-maxCount spread evenly
      let alpha = 0.5; 
      if (count >= maxCount) alpha = 1;
      else if (count > 1) alpha = 0.4 + 0.6 * (count - 1) / (maxCount - 1);

      let radius = 3;
      if (count >= maxCount) radius = 10;
      else if (count > 1) radius = 3 + (7 * (count - 1) / (maxCount - 1));

      return {
        x: jobIndex,
        y: parseFloat(score),
        count,
        job: job.job,
        alpha,
        marker: {
          radius,
          fillColor: companyColorMap[selectedCompany]
            ? `rgba(${hexToRgb(companyColorMap[selectedCompany])},${alpha})`
            : `rgba(52,152,219,${alpha})`,
          symbol: 'circle',
          lineWidth: 0
        }
      };
    });
    scatterSeries.push({
      type: 'scatter',
      name: job.job + ' scores',
      data: scatterData,
      color: undefined, // use per-point color
      marker: {
        radius: 3,
        symbol: 'circle',
        fillColor: undefined, // per-point
        lineWidth: 0,
      },
      zIndex: 3,
      tooltip: {
        pointFormatter: function () {
          const scoreLabel = t ? t('charts.score') : 'Score';
          const countLabel = t ? t('charts.count') : 'Count';
          return `<b>${this.job}</b><br/>${scoreLabel}: <b>${this.y.toFixed(2)}</b><br/>${countLabel}: <b>${this.count}</b>`;
        }
      },
      showInLegend: false,
      lineWidth: 0,
      connectNulls: false,
      states: { hover: { lineWidthPlus: 0 } },
      dataLabels: { enabled: false },
    });
  });


  const options = {
    chart: {
      type: 'scatter',
      height: 500,
      width: 1000,
      style: { fontFamily: 'inherit' },
    },
    title: { 
      text: t && typeof t === 'function' ? t('charts.scoreDensityAcrossJobs') : 'Score density across top jobs',
      align: 'left' 
    },
    credits: { enabled: false },
    legend: { enabled: false },
    xAxis: {
      min: -0.5,
      max: categories.length - 0.5,
      tickPositions: categories.map((_, i) => i),
      labels: {
        formatter: function () {
          const label = categories[this.value];
          if (!label) return '';
          return label.length > 35 ? label.slice(0, 32) + '...' : label;
        },
        rotation: -80,
        style: { fontSize: '11px', color: '#222', fontWeight: 400, maxWidth: 60, textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
      },
      title: { text: t ? t('charts.job') : 'Job' },
    },
    yAxis: {
      min: 7,
      max: 10,
      tickInterval: 0.5,
      title: { text: t ? t('charts.score') : 'Score' },
    },
    tooltip: {
      useHTML: true,
      formatter: function () {
        if (this.point && typeof this.point.count !== 'undefined') {
          const scoreLabel = t ? t('charts.score') : 'Score';
          const countLabel = t ? t('charts.count') : 'Count';
          return `<b>${this.point.job}</b><br/>${scoreLabel}: <b>${this.y.toFixed(2)}</b><br/>${countLabel}: <b>${this.point.count}</b>`;
        }
        return false;
      }
    },
    plotOptions: {
      scatter: {
        marker: { radius: 3, symbol: 'circle', fillColor: '#3498db' },
        states: {
          inactive: {
            opacity: 0.8
          }
        }
      },
      areasplinerange: {
        enableMouseTracking: false,
        marker: { enabled: false },
        showInLegend: false,
        zIndex: 1
      },
      line: {
        marker: { enabled: false },
        lineWidth: 2,
        zIndex: 2
      }
    },
    series: [
      ...scatterSeries
    ]
  };


  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default JobScoresStripPlot;