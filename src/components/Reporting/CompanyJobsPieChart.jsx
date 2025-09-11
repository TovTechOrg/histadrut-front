import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";


const CompanyJobsPieChart = ({ data = [], onSliceClick, selectedCompany, companyColorMap = {}, t }) => {
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
	let pieData = aggData;
	if (aggData.length > 5) {
		const top5 = aggData.slice(0, 5);
		const otherSum = aggData.slice(5).reduce((sum, d) => sum + d.y, 0);
		const otherLabel = t && typeof t === 'function' ? t('charts.other') : 'Other';
		pieData = [...top5, { name: otherLabel, y: otherSum }];
	}
	// Assign colors
	pieData = pieData.map(d => ({
		...d,
		color: companyColorMap[d.name] || "#bdc3c7",
		sliced: selectedCompany && d.name === selectedCompany
	}));

	const options = {
		chart: { type: 'pie', height: 400 },
		title: {
			text: t ? t('charts.topCompaniesByJobs') : 'Top Companies by Number of Jobs',
			style: { fontSize: '1rem', fontWeight: 500, marginBottom: 4 },
			margin: 6
		},
		series: [{
			name: t ? t('charts.jobs') : 'Jobs',
			colorByPoint: true,
			data: pieData,
			point: {
				events: {
					click: function () {
						const otherLabel = t && typeof t === 'function' ? t('charts.other') : 'Other';
						if (onSliceClick && this.name !== otherLabel) {
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
