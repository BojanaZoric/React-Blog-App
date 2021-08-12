import React from "react";
import "./Pagination.css";

export default class Pagination extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			totalRecords: props.totalRecords,
			itemsPerPage: props.itemsPerPage,
			currentPage: props.currentPage,
			defaultValue: props.defaultValue,
		};
		this.changeNumber = props.onChangePage;
		this.changeItemsPerPage = props.onChangeItemsPerPage;

		this.handleChange = this.handleChange.bind(this);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.totalRecords !== this.props.totalRecords) {
			this.setState({ totalRecords: this.props.totalRecords });
		}
		if (prevProps.itemsPerPage !== this.props.itemsPerPage) {
			this.setState({ itemsPerPage: this.props.itemsPerPage });
		}
	}

	range(totalPages) {
		let i = 0;
		let numbers = [];
		while (i < totalPages) {
			numbers.push(i);
			i++;
		}
		return numbers;
	}

	handleChange(event) {
		this.changeItemsPerPage(event.target.value);
	}

	render() {
		let totalPages = Math.ceil(
			this.state.totalRecords / this.state.itemsPerPage
		);
		return (
			<div className="pagination-container">
				<div className="items-per-page meta">
					items per page
					<select
						value={this.state.itemsPerPage}
						onChange={this.handleChange}
						defaultValue={this.state.defaultValue}
					>
						<option value={5}>5</option>
						<option value={10}>10</option>
						<option value={15}>15</option>
						<option value={this.state.totalRecords}>All</option>
					</select>
				</div>
				<ul>
					{this.range(totalPages).map((pageNum) => (
						<li
							className="pagination-item"
							onClick={() => {
								this.changeNumber(pageNum + 1);
							}}
							key={pageNum}
						>
							{pageNum + 1}
						</li>
					))}
				</ul>
			</div>
		);
	}
}
