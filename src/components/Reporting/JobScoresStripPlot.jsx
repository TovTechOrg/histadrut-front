
import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";
import { kernelDensityEstimator, gaussianKernel, quantile } from "./violinUtils";

// Initialize highcharts-more for areasplinerange
if (typeof HighchartsMore === "function") {
  HighchartsMore(Highcharts);
}



const JobScoresStripPlot = ({ data = [] }) => {
  // data: [{ job: string, scores: number[] }]
  // Only include jobs with at least 3 scores
  let jobs = data.filter(j => Array.isArray(j.scores) && j.scores.length > 2);
  // Sort by number of scores (descending) and take top 20
  jobs = jobs.sort((a, b) => b.scores.length - a.scores.length).slice(0, 20);

  if (jobs.length === 0) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: '#888', height: '340px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Not enough data to display the plot. <br/>
        This chart requires at least one job with three or more scores.
      </div>
    );
  }

  const categories = jobs.map(j => j.job);

  // Only scatter dots for unique scores
  const scatterSeries = [];
  jobs.forEach((job, jobIndex) => {
    const scores = job.scores;
    const scoreCounts = {};
    scores.forEach(s => {
      const rounded = Math.round(s * 100) / 100;
      scoreCounts[rounded] = (scoreCounts[rounded] || 0) + 1;
    });
    // Find max count for this job for normalization
    const maxCount = Math.max(...Object.values(scoreCounts));
    const scatterData = Object.entries(scoreCounts).map(([score, count]) => ({
      x: jobIndex,
      y: parseFloat(score),
      count,
      job: job.job,
      alpha: maxCount > 1 ? Math.max(0.2, Math.min(1, count / maxCount)) : 1
    }));
    scatterSeries.push({
      type: 'scatter',
      name: job.job + ' scores',
      data: scatterData,
      color: 'rgba(52,152,219,1)',
      marker: {
        radius: 4,
        symbol: 'circle',
        fillColor: undefined, // We'll set color per point
        lineWidth: 0,
      },
      zIndex: 3,
      tooltip: {
        pointFormatter: function () {
          return `<b>${this.job}</b><br/>Score: <b>${this.y.toFixed(2)}</b><br/>Count: <b>${this.count}</b>`;
        }
      },
      showInLegend: false,
      lineWidth: 0,
      connectNulls: false,
      states: { hover: { lineWidthPlus: 0 } },
      // Set per-point color with alpha
      point: {
        events: {
          mouseOver: function () {},
        }
      },
      // Use point color for alpha
      dataLabels: { enabled: false },
    });
    // Set per-point color with alpha
    scatterSeries[scatterSeries.length - 1].data.forEach(point => {
      point.color = `rgba(52,152,219,${point.alpha})`;
    });
  });


  const options = {
    chart: {
      type: 'scatter',
      height: 500, // Increased height for more vertical space
      width: 1200, // Make the card longer horizontally
      style: { fontFamily: 'inherit' },
    },
    title: { text: 'Job Scores Violin Plot', align: 'left' },
    credits: { enabled: false },
    legend: { enabled: false },
    xAxis: {
      min: -0.5,
      max: categories.length - 0.5,
      tickPositions: categories.map((_, i) => i),
      labels: {
        formatter: function () { return categories[this.value]; },
        rotation: -65,
        style: { fontSize: '9px', color: '#222', fontWeight: 400, maxWidth: 40, textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
      },
      title: { text: 'Job' },
    },
    yAxis: {
      min: 7,
      max: 10,
      tickInterval: 0.5,
      title: { text: 'Score' },
    },
    tooltip: {
      useHTML: true,
      formatter: function () {
        if (this.point && typeof this.point.count !== 'undefined') {
          return `<b>${categories[this.x]}</b><br/>Score: <b>${this.y.toFixed(2)}</b><br/>Count: <b>${this.point.count}</b>`;
        }
        return false;
      }
    },
    plotOptions: {
      scatter: {
        marker: { radius: 3, symbol: 'circle', fillColor: '#3498db' },
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