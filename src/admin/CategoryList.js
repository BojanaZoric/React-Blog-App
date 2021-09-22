import React from "react";
import { Link } from "react-router-dom";
import Pagination from "../shared/Pagination";
import CategoryService from "../services/CategoryService";

export default class CategoryList extends React.Component {
	constructor(props) {
		super();
		this.state = {
			categories: [],
			totalRecords: "",
			itemsPerPage: 5,
			currentPage: 1,
		};

		this.getCategories = this.getCategories.bind(this);
		this.changePage = this.changePage.bind(this);
		this.changeItemsPerPage = this.changeItemsPerPage.bind(this);
	}

	componentDidMount() {
		this.getCategories();
	}

	componentDidUpdate(prevProps, prevState) {
		if (
			this.state.itemsPerPage !== prevState.itemsPerPage ||
			this.state.currentPage !== prevState.currentPage
		) {
			this.getCategories();
		}
	}

	getCategories() {
		CategoryService.getAll(
			this.state.itemsPerPage,
			this.state.itemsPerPage * (this.state.currentPage - 1)
		).then((res) => {
			const categories = res.data[0];
			this.setState({ totalRecords: res.data[1] });
			this.setState({ categories });
		});
	}

	handleDelete(id) {
		CategoryService.deleteOne(id).then((res) => {
			this.getCategories();
		});
	}

	changePage(pageNum) {
		this.setState({ currentPage: pageNum });
	}

	changeItemsPerPage(itemsNum) {
		this.setState({ itemsPerPage: itemsNum });
	}

	render() {
		return (
			<div className="content-container">
				<Link to="/admin/addCategory">
					<button type="button" className="btn primary-btn">
						Add Category
					</button>
				</Link>
				<div className="">
					<table className="main-table category-table">
						<thead>
							<tr
								className="main-table-row"
								onClick={() => console.log(this.state)}
							>
								<th className="main-table-header">#</th>
								<th className="main-table-header">
									Category Name
								</th>
								<th className="main-table-header"></th>
							</tr>
						</thead>
						<tbody>
							{this.state.categories.map((category) => (
								<tr
									key={category.id}
									className="main-table-row"
								>
									<td className="main-table-data main-table-id">
										{category.id}
									</td>
									<td className="main-table-data">
										{category.name}
									</td>
									<td className="main-table-data">
										<button
											className="btn danger-btn"
											onClick={() =>
												this.handleDelete(category.id)
											}
										>
											Delete
										</button>
									</td>
								</tr>
							))}
							{[
								...Array(
									this.state.itemsPerPage -
										this.state.categories.length
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
			</div>
		);
	}
}
