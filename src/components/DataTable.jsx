import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import "./DataTable.css";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const DataTable = () => {
	const [expandedRow, setExpandedRow] = useState(null);

	const generateChartData = (baseValue, variation = 0.2) => {
		const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
		return {
			labels: days,
			data: days.map(() => {
				const randomFactor = 1 + (Math.random() * 2 - 1) * variation;
				return Math.round(baseValue * randomFactor);
			}),
		};
	};

	const data = [
		{
			indicator: "Выручка, руб",
			currentDay: "500 521",
			yesterday: "480 521 (4%)",
			sameDayLastWeek: "4 805 121",
			chartData: generateChartData(500000),
		},
		{
			indicator: "Наличные",
			currentDay: "300 000 (0%)",
			yesterday: "300 000 (0%)",
			sameDayLastWeek: "300 000",
			chartData: generateChartData(300000, 0.1),
		},
		{
			indicator: "Безналичный расчет",
			currentDay: "100 000 (0%)",
			yesterday: "100 000 (0%)",
			sameDayLastWeek: "100 000",
			chartData: generateChartData(100000, 0.15),
		},
		{
			indicator: "Кредитные карты",
			currentDay: "100 521 (0%)",
			yesterday: "100 521 (0%)",
			sameDayLastWeek: "100 521",
			chartData: generateChartData(100000, 0.1),
		},
		{
			indicator: "Средний чек, руб",
			currentDay: "1 300",
			yesterday: "900 (44%)",
			sameDayLastWeek: "900 (44%)",
			chartData: generateChartData(1200, 0.2),
		},
		{
			indicator: "Средний гость, руб",
			currentDay: "1 200",
			yesterday: "800 (50%)",
			sameDayLastWeek: "800 (50%)",
			chartData: generateChartData(1000, 0.2),
		},
		{
			indicator: "Удаления из чека (после оплаты), руб",
			currentDay: "1 000",
			yesterday: "1 100 (-9%)",
			sameDayLastWeek: "900 (0%)",
			chartData: generateChartData(1000, 0.3),
		},
		{
			indicator: "Удаления из чека (до оплаты), руб",
			currentDay: "1 300",
			yesterday: "1 300 (0%)",
			sameDayLastWeek: "900 (0%)",
			chartData: generateChartData(1200, 0.25),
		},
		{
			indicator: "Количество чеков",
			currentDay: "34",
			yesterday: "36 (-6%)",
			sameDayLastWeek: "34",
			chartData: generateChartData(35, 0.15),
		},
		{
			indicator: "Количество гостей",
			currentDay: "34",
			yesterday: "36 (-6%)",
			sameDayLastWeek: "32",
			chartData: generateChartData(35, 0.15),
		},
	];

	const getCellClassName = (value) => {
		if (value.includes("(0%)")) return "no-change";
		if (value.includes("(-")) return "negative-change";
		if (value.includes("(") && !value.includes("(-"))
			return "positive-change";
		return "";
	};

	const handleRowClick = (index) => {
		setExpandedRow(expandedRow === index ? null : index);
	};

	return (
		<div className="table-container">
			<table className="data-table">
				<thead>
					<tr>
						<th>Показатель</th>
						<th>Текущий день</th>
						<th>Вчера</th>
						<th>Этот день недели</th>
					</tr>
				</thead>
				<tbody>
					{data.map((row, index) => (
						<React.Fragment key={index}>
							<tr onClick={() => handleRowClick(index)}>
								<td className="indicator">{row.indicator}</td>
								<td>{row.currentDay}</td>
								<td className={getCellClassName(row.yesterday)}>
									{row.yesterday}
								</td>
								<td
									className={getCellClassName(
										row.sameDayLastWeek
									)}
								>
									{row.sameDayLastWeek}
								</td>
							</tr>
							{expandedRow === index && (
								<tr>
									<td colSpan="4">
										<div className="chart-container">
											<Line
												data={{
													labels: row.chartData
														.labels,
													datasets: [
														{
															label: row.indicator,
															data: row.chartData
																.data,
															borderColor:
																"rgb(75, 192, 192)",
															backgroundColor:
																"rgba(75, 192, 192, 0.5)",
															tension: 0.1,
															fill: false,
														},
													],
												}}
												options={{
													responsive: true,
													scales: {
														y: {
															beginAtZero: true,
														},
													},
												}}
											/>
										</div>
									</td>
								</tr>
							)}
						</React.Fragment>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default DataTable;
