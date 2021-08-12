import React from "react";
import BlogArchive from "../BlogArchive";
import AuthorService from "../services/AuthorService";
import Pagination from "../shared/Pagination";

export default class SavedPosts extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			blogItems: [],
			totalRecords: 0,
			itemsPerPage: 5,
			currentPage: 1,
		};
		this.getSavedPosts = this.getSavedPosts.bind(this);
		this.changePage = this.changePage.bind(this);
		this.changeItemsPerPage = this.changeItemsPerPage.bind(this);
	}

	componentDidMount() {
		this.getSavedPosts();
	}

	componentDidUpdate(prevProps, prevState) {
		if (
			this.state.itemsPerPage !== prevState.itemsPerPage ||
			this.state.currentPage !== prevState.currentPage
		) {
			this.getSavedPosts();
		}
	}

	changePage(pageNum) {
		this.setState({ currentPage: pageNum });
	}

	changeItemsPerPage(itemsNum) {
		this.setState({ itemsPerPage: itemsNum });
	}

	getSavedPosts() {
		AuthorService.savedPosts(
			this.state.itemsPerPage,
			this.state.itemsPerPage * (this.state.currentPage - 1)
		).then((res) => {
			const blogItems = res.data[0];
			this.setState({ blogItems, totalRecords: res.data[1] });
		});
	}

	render() {
		return (
			<div>
				<div>
					<BlogArchive postItems={this.state.blogItems}></BlogArchive>
				</div>
				<Pagination
					totalRecords={this.state.totalRecords}
					itemsPerPage={this.state.itemsPerPage}
					currentPage={this.state.currentPage}
					onChangeItemsPerPage={this.changeItemsPerPage}
					onChangePage={this.changePage}
					defaultValue={this.state.itemsPerPage}
				></Pagination>
			</div>
		);
	}
}
