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

				<ul className="pagination-button-list">
					<li
						onClick={() => {
							if (this.state.currentPage !== 1) {
								this.changeNumber(1);
								this.setState({ currentPage: 1 });
							}
						}}
						className="pagination-list-item"
					>
						<button
							disabled={this.state.currentPage <= 1}
							className="btn-pagination btn-first"
						></button>
					</li>
					<li
						onClick={() => {
							if (this.state.currentPage > 1) {
								this.changeNumber(this.state.currentPage - 1);
								this.setState({
									currentPage: this.state.currentPage - 1,
								});
							}
						}}
						className="pagination-list-item"
					>
						<button
							disabled={this.state.currentPage <= 1}
							className="btn-pagination btn-left"
						></button>
					</li>
					<li
						onClick={() => {
							if (this.state.currentPage < totalPages) {
								this.changeNumber(this.state.currentPage + 1);
								this.setState({
									currentPage: this.state.currentPage + 1,
								});
							}
						}}
						className="pagination-list-item"
					>
						<button
							disabled={this.state.currentPage >= totalPages}
							className="btn-pagination btn-right"
						></button>
					</li>
					<li
						onClick={() => {
							if (this.state.currentPage < totalPages) {
								this.changeNumber(totalPages);
								this.setState({
									currentPage: totalPages,
								});
							}
						}}
						className="pagination-list-item"
					>
						<button
							disabled={
								totalPages <= 1 ||
								this.state.currentPage >= totalPages
							}
							className="btn-pagination btn-last"
						></button>
					</li>
				</ul>
			</div>
		);
	}
}
