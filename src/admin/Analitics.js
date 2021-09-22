import React from "react";
import "./Analitics.css";
import { Bar, Pie } from "react-chartjs-2";
import AnalyticService from "../services/AnalyticService";

export default class Analitics extends React.Component {
	constructor() {
		super();
		this.labels = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];
		const currYear = new Date().getFullYear();
		this.state = {
			postAnalytic: [],
			userAnalytic: [],
			postsYear: currYear,
			userYear: currYear,
			publishedChart: [],
			userChart: [],
		};
	}

	componentDidMount() {
		this.getPostChartStatistic();
		this.getUsersAnalitycData();
		this.getPostsAnalitycData();
		this.getUserChartStatistic();

		const draggables = document.querySelectorAll(".draggable");
		const containers = document.querySelectorAll(".analitic-wrapper");

		draggables.forEach((draggable) => {
			draggable.addEventListener("dragstart", () => {
				draggable.classList.add("dragging");
			});

			draggable.addEventListener("dragend", () => {
				draggable.classList.remove("dragging");
			});
		});

		containers.forEach((container) => {
			container.addEventListener("dragover", (e) => {
				e.preventDefault();
				const afterElement = getDragAfterElement(container, e.clientY);
				const draggable = document.querySelector(".dragging");
				if (afterElement == null) {
					container.appendChild(draggable);
				} else {
					container.insertBefore(draggable, afterElement);
				}
			});
		});

		function getDragAfterElement(container, y) {
			const draggableElements = [
				...container.querySelectorAll(".draggable:not(.dragging)"),
			];

			return draggableElements.reduce(
				(closest, child) => {
					const box = child.getBoundingClientRect();
					const offset = y - box.top - box.height / 2;
					if (offset < 0 && offset > closest.offset) {
						return { offset: offset, element: child };
					} else {
						return closest;
					}
				},
				{ offset: Number.NEGATIVE_INFINITY }
			).element;
		}
	}

	getPostChartStatistic() {
		AnalyticService.getPostsStatistic().then((res) => {
			this.setState({ publishedChart: res.data });
		});
	}

	getUserChartStatistic() {
		AnalyticService.getUserStatistic().then((res) => {
			this.setState({ userChart: res.data });
		});
	}

	getUsersAnalitycData() {
		AnalyticService.getUsersByYear(this.state.userYear).then((res) => {
			const data = res.data;
			const dataList = [];
			for (let i = 1; i <= 12; i++) {
				dataList[i - 1] = 0;
				for (let el of data) {
					if (el[0] === i) {
						dataList[i - 1] = el[1];
					}
				}
			}
			this.setState({ userAnalytic: dataList });
		});
	}

	getPostsAnalitycData() {
		AnalyticService.getPostsByYear(this.state.userYear).then((res) => {
			const data = res.data;
			const dataList = [];
			for (let i = 1; i <= 12; i++) {
				dataList[i - 1] = 0;
				for (let el of data) {
					if (el[0] === i) {
						dataList[i - 1] = el[1];
					}
				}
			}
			this.setState({ postAnalytic: dataList });
		});
	}

	getUserStatistic() {
		return {
			labels: this.labels,
			datasets: [
				{
					scaleSteps: 1,
					label: "New Users",
					backgroundColor: "#4f81ff",
					data: this.state.userAnalytic,
				},
			],
		};
	}

	getPostPieStatistic() {
		return {
			datasets: [
				{
					data: this.state.publishedChart,
					backgroundColor: ["#ff6f4f", "#7595e6"],
				},
			],

			labels: ["Published Posts", "Unpublished Posts"],
		};
	}

	getUserPieStatistic() {
		return {
			datasets: [
				{
					data: this.state.userChart,
					backgroundColor: ["#7595e6", "#ff9b4f"],
				},
			],

			labels: ["Active Users", "Inactive Users"],
		};
	}

	getPostStatistic() {
		return {
			labels: this.labels,
			title: "All Posts",
			datasets: [
				{
					scaleSteps: 1,
					label: "New Posts",
					backgroundColor: "#ff9b4f",
					data: this.state.postAnalytic,
				},
			],
		};
	}

	getChartOptions() {
		return {
			scales: {
				yAxes: [
					{
						ticks: {
							beginAtZero: true,
							stepSize: 1,
						},
					},
				],
			},
		};
	}

	render() {
		return (
			<div className="analitic-wrapper">
				<div
					className="draggable analitic-card card-2"
					draggable="true"
				>
					<Bar
						className="statistic-data-container"
						data={this.getPostStatistic()}
						options={this.getChartOptions()}
					/>
				</div>
				<div
					className="draggable analitic-card card-1"
					draggable="true"
				>
					<Pie
						className="statistic-data-container"
						data={this.getPostPieStatistic()}
					/>
				</div>
				<div
					className="draggable analitic-card card-2"
					draggable="true"
				>
					<Bar
						className="statistic-data-container"
						data={this.getUserStatistic()}
						options={this.getChartOptions()}
					/>
				</div>
				<div
					className="draggable analitic-card card-1"
					draggable="true"
				>
					<Pie
						className="statistic-data-container"
						data={this.getUserPieStatistic()}
					/>
				</div>
			</div>
		);
	}
}
