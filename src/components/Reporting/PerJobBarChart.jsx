import React, { useRef, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useNavigate } from "react-router-dom";

// --- Helper Functions (assuming these are in the same file or imported) ---

const sorters = [
  { label: "Company (A-Z)", fn: (a, b) => a.company.localeCompare(b.company) },
  { label: "Matches (High → Low)", fn: (a, b) => b.matches - a.matches },
];

export const COMPANY_COLORS = [
  "#3498db",
  "#e67e22",
  "#2ecc71",
  "#9b59b6",
  "#e74c3c",
  "#16a085",
];

export function getCompanyColorMap(data) {
  const companyList = Array.from(new Set(data.map((item) => item.company)));
  const companyColorMap = {};
  companyList.forEach((company, idx) => {
    companyColorMap[company] = COMPANY_COLORS[idx % COMPANY_COLORS.length];
  });
  return companyColorMap;
}

// --- Improved Bar Chart Component ---

const PerJobBarChart = ({
  data = [],
  sortIndex,
  setSortIndex,
  minScore = 7.5,
  companyColorMap, // <-- add this prop
}) => {
  const navigate = useNavigate();
  // Filter jobs by minScore, recalculate matches, and remove jobs with 0 matches
  const filteredData = data
    .map((job) => {
      if (Array.isArray(job.candidates)) {
        const filteredCandidates = job.candidates.filter(
          (c) => c.score >= minScore
        );
        return {
          ...job,
          matches: filteredCandidates.length,
          candidates: filteredCandidates,
        };
      } else {
        return job.score >= minScore ? job : { ...job, matches: 0 };
      }
    })
    .filter((job) => job.matches > 0);

  const sortedData = [...filteredData].sort(sorters[sortIndex].fn);
  // const companyColorMap = getCompanyColorMap(sortedData);

  const options = {
    title: {
      text: "",
      style: {
        height: 0,
        margin: 0,
        padding: 0,
        display: "none",
      },
    },
    chart: {
      type: "bar",
      height: sortedData.length * 35 + 120,
      marginLeft: 250,
      style: {
        fontFamily: "inherit",
      },
    },
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    xAxis: {
      categories: sortedData.map((item) => item.job),
      title: {
        text: null,
      },
      labels: {
        style: {
          fontSize: "13px",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          color: "#222", // black label
          fontWeight: 500,
        },
        formatter: function () {
          return this.value;
        },
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Number of Matches",
        align: "high",
      },
      gridLineDashStyle: "Dash",
    },
    tooltip: {
      useHTML: true,
      formatter: function () {
        const pointData = sortedData[this.point.index];
        return `
          <b>${this.point.category}</b><br/>
          <span style="color:${this.point.color}">●</span> Company: <b>${
          pointData.company
        }</b><br/>
          Matches: <b>${this.point.y}</b><br/>
          Avg. Score: <b>${
            pointData.score ? pointData.score.toFixed(1) : ""
          }</b><br/>
          <span style="display:inline-block;margin-top:6px;padding:2px 8px;background:#eaf4fb;color:#2176bd;border-radius:4px;font-size:13px;font-weight:500;">Click to view job matches</span>
        `;
      },
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
        },
        borderRadius: 3,
        borderWidth: 0,
      },
      series: {
        cursor: "pointer",
        point: {
          events: {
            click: function () {
              const jobTitle = this.category;
              const company =
                sortedData[this.index] && sortedData[this.index].company;
              const job_id =
                sortedData[this.index] && sortedData[this.index].job_id;
              const params = new URLSearchParams();
              params.set("companyName", company);
              params.set("job_title", jobTitle);
              if (job_id) params.set("job_id", job_id);
              const url = `/admin/matches?${params.toString()}`;
              navigate(url);
            },
          },
        },
      },
    },
    series: [
      {
        name: "Matches",
        data: sortedData.map((item) => ({
          y: item.matches,
          color: companyColorMap[item.company],
        })),
      },
    ],
  };

  return (
    <div
      className="custom-scrollbar"
      style={{ overflowY: "auto", maxHeight: "400px" }}
    >
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default PerJobBarChart;
