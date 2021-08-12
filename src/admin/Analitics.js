import React from "react";
import "./Analitics.css";
import { Bar, Chart } from "react-chartjs-2";

export default class Analitics extends React.Component {
	constructor() {
		super();
	}

	componentDidMount() {
		const draggables = document.querySelectorAll(".draggable");
		console.log(draggables);
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

	getUsersAnalitycData() {
		const labels = ["1", "2", "3"];
		return {
			labels: ["1", "2", "3"],
			datasets: [
				{
					label: "New Users",
					backgroundColor: "red",
					data: [0, 10, 5],
				},
			],
		};
	}

	render() {
		const labels = ["January", "February", "March", "April", "May", "June"];
		const data = {
			labels: labels,
			datasets: [
				{
					label: "My First dataset",
					backgroundColor: "rgb(255, 99, 132)",
					borderColor: "rgb(255, 99, 132)",
					data: [0, 10, 5, 2, 20, 30, 45],
				},
			],
		};
		return (
			<div className="analitic-wrapper">
				<div
					className="draggable analitic-card card-2"
					draggable="true"
				>
					<Bar data={data} />
					Post Views
				</div>
				<div
					className="draggable analitic-card card-1"
					draggable="true"
				>
					New Users
					<Bar data={this.getUsersAnalitycData()} />
				</div>
				<div
					className="draggable analitic-card card-1"
					draggable="true"
				></div>
			</div>
		);
	}
}
