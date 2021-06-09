import React from "react";
import Pagination from "../shared/Pagination";
import AuthorService from "../services/AuthorService";

export default class AuthorList extends React.Component {
	constructor() {
		super();
		this.state = {
			authors: [],
			totalRecords: "",
			itemsPerPage: 5,
			currentPage: 1,
		};

		this.getAuthors = this.getAuthors.bind(this);
		this.changePage = this.changePage.bind(this);
		this.changeItemsPerPage = this.changeItemsPerPage.bind(this);
	}

	componentDidMount() {
		this.getAuthors();
	}

	getAuthors() {
		AuthorService.getAll(
			this.state.itemsPerPage,
			this.state.itemsPerPage * (this.state.currentPage - 1)
		).then((res) => {
			const authors = res.data[0];
			this.setState({ authors });
			this.setState({ totalRecords: res.data[1] });
		});
	}

	componentDidUpdate(prevProps, prevState) {
		if (
			this.state.itemsPerPage !== prevState.itemsPerPage ||
			this.state.currentPage !== prevState.currentPage
		) {
			this.getAuthors();
		}
	}

	changePage(pageNum) {
		this.setState({ currentPage: pageNum });
	}

	changeItemsPerPage(itemsNum) {
		this.setState({ itemsPerPage: itemsNum });
	}

	render() {
		return (
			<div className="table-container">
				<table className="main-table">
					<thead>
						<tr className="main-table-row">
							<th className="main-table-header">#</th>
							<th className="main-table-header">First Name</th>
							<th className="main-table-header">Last Name</th>
						</tr>
					</thead>
					<tbody>
						{this.state.authors.map((author) => (
							<tr key={author.id} className="main-table-row">
								<td className="main-table-data main-table-id">
									{author.id}
								</td>
								<td className="main-table-data">
									{author.firstName}
								</td>
								<td className="main-table-data">
									{author.lastName}
								</td>
							</tr>
						))}
						{[
							...Array(
								this.state.itemsPerPage -
									this.state.authors.length
							),
						].map((_, i) => (
							<tr
								key={i}
								className="main-table-row main-table-empty-row"
							>
								<td className="main-table-data main-table-id">
									#
								</td>
								<td className="main-table-data"> </td>
								<td className="main-table-data"></td>
							</tr>
						))}
					</tbody>
				</table>
				<Pagination
					totalRecords={this.state.totalRecords}
					itemsPerPage={this.state.itemsPerPage}
					currentPage={this.state.currentPage}
					onChangeItemsPerPage={this.changeItemsPerPage}
					onChangePage={this.changePage}
					defaultValue={this.itemsPerPage}
				></Pagination>
			</div>
		);
	}
}
