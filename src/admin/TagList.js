import React from "react";
import { Link } from "react-router-dom";
import Pagination from "../shared/Pagination";
import TagService from "../services/TagService";

export default class TagList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tags: [],
			totalRecords: "",
			itemsPerPage: 5,
			currentPage: 1,
		};

		this.getTags = this.getTags.bind(this);
		this.changePage = this.changePage.bind(this);
		this.changeItemsPerPage = this.changeItemsPerPage.bind(this);
	}

	componentDidMount() {
		this.getTags();
	}

	getTags() {
		TagService.getAll(
			this.state.itemsPerPage,
			this.state.itemsPerPage * (this.state.currentPage - 1)
		).then((res) => {
			const tags = res.data[0];
			this.setState({ tags });
			this.setState({ totalRecords: res.data[1] });
		});
	}

	componentDidUpdate(prevProps, prevState) {
		if (
			this.state.itemsPerPage !== prevState.itemsPerPage ||
			this.state.currentPage !== prevState.currentPage
		) {
			this.getTags();
		}
	}

	changePage(pageNum) {
		this.setState({ currentPage: pageNum });
	}

	changeItemsPerPage(itemsNum) {
		this.setState({ itemsPerPage: itemsNum });
	}

	handleDelete(id) {
		TagService.deleteOne(id).then((res) => {
			this.getTags();
		});
	}

	render() {
		return (
			<div className="content-container">
				<Link to="/admin/addTag">
					<button type="button" className="btn primary-btn">
						Add Tag
					</button>
				</Link>
				<div className="table-container">
					<table className="main-table">
						<thead>
							<tr className="main-table-row">
								<th className="main-table-header">#</th>
								<th className="main-table-header">Tag Name</th>
							</tr>
						</thead>
						<tbody>
							{this.state.tags.map((tag) => (
								<tr key={tag.id} className="main-table-row">
									<td className="main-table-data main-table-id">
										{tag.id}
									</td>
									<td className="main-table-data">
										{tag.name}
									</td>
									<td className="main-table-data">
										<button
											className="btn danger-btn"
											onClick={() =>
												this.handleDelete(tag.id)
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
										this.state.tags.length
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
			</div>
		);
	}
}
