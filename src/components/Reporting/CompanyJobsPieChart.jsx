import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
// Accept data as prop from parent
import { getCompanyColorMap } from "./PerJobBarChart";


const CompanyJobsPieChart = ({ data = [], onSliceClick, selectedCompany }) => {
	// data: [{ company, job }]
	// Aggregate by company
	const companyCounts = {};
	data.forEach(item => {
		const company = item.company;
		companyCounts[company] = (companyCounts[company] || 0) + 1;
	});
	let aggData = Object.entries(companyCounts).map(([name, y]) => ({ name, y }));
	// Sort descending and take top 5, group rest as 'Other'
	aggData.sort((a, b) => b.y - a.y);
	// Color map by company name
	let colorMap = getCompanyColorMap(
		aggData.map(d => ({ company: d.name }))
	);
	let pieData = aggData;
	if (aggData.length > 5) {
		const top5 = aggData.slice(0, 5);
		const otherSum = aggData.slice(5).reduce((sum, d) => sum + d.y, 0);
		pieData = [...top5, { name: 'Other', y: otherSum }];
		colorMap = { ...colorMap, Other: '#bdc3c7' };
	}
	// Assign colors
	pieData = pieData.map(d => ({
		...d,
		color: colorMap[d.name],
		sliced: selectedCompany && d.name === selectedCompany
	}));

	const options = {
		chart: { type: 'pie', height: 400 },
		title: {
			text: 'Top Companies by Number of Jobs',
			style: { fontSize: '1rem', fontWeight: 500, marginBottom: 4 },
			margin: 6
		},
		series: [{
			name: 'Jobs',
			colorByPoint: true,
			data: pieData,
			point: {
				events: {
					click: function () {
						if (onSliceClick && this.name !== 'Other') {
							onSliceClick(this.name);
						}
					}
				}
			}
		}],
		legend: { enabled: true },
		credits: { enabled: false },
		tooltip: { pointFormat: '{series.name}: <b>{point.y}</b>' }
	};

	return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default CompanyJobsPieChart;
