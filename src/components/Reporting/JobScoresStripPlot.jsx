
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
  // Only include jobs with at least 1 score (no filter), then take top 20 by count
  let jobs = data.filter(j => Array.isArray(j.scores) && j.scores.length > 0);
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
    // Global alpha and size: 1 match = 0.1, 10+ = 1, 2-9 spread equally
    const scatterData = Object.entries(scoreCounts).map(([score, count]) => {
      // 1 match = 40% alpha, 2-10+ spread evenly from 40% to 100%
      let alpha = 0.4;
      if (count >= 10) alpha = 1;
      else if (count > 1) alpha = 0.4 + 0.6 * (count - 1) / 9;
      // Marker size: 1 match = 3, 10+ = 10, 2-9 spread equally
      let radius = 3;
      if (count >= 10) radius = 10;
      else if (count > 1) radius = 3 + (7 * (count - 1) / 9); // 2=3.78..., 3=4.56..., ..., 9=9.22...
      return {
        x: jobIndex,
        y: parseFloat(score),
        count,
        job: job.job,
        alpha,
        marker: {
          radius,
          fillColor: `rgba(52,152,219,${alpha})`,
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
          return `<b>${this.job}</b><br/>Score: <b>${this.y.toFixed(2)}</b><br/>Count: <b>${this.count}</b>`;
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
      height: 500, // Less vertical space, fits card
      width: 1000, // Fit card and titles better
      style: { fontFamily: 'inherit' },
    },
  title: { text: 'Score Density across top jobs', align: 'left' },
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
          return `<b>${this.point.job}</b><br/>Score: <b>${this.y.toFixed(2)}</b><br/>Count: <b>${this.point.count}</b>`;
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