import React from "react";
import BlogArchive from "../BlogArchive";
import UserService from "../services/UserService";
import Pagination from "../shared/Pagination";

export default class MyPosts extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			blogItems: [],
			totalRecords: "",
			itemsPerPage: 5,
			currentPage: 1,
		};

		this.getPosts = this.getPosts.bind(this);
		this.changePage = this.changePage.bind(this);
		this.changeItemsPerPage = this.changeItemsPerPage.bind(this);
	}

	componentDidMount() {
		this.getPosts();
	}

	componentDidUpdate(prevProps, prevState) {
		if (
			this.state.itemsPerPage !== prevState.itemsPerPage ||
			this.state.currentPage !== prevState.currentPage
		) {
			this.getPosts();
		}
	}

	changePage(pageNum) {
		this.setState({ currentPage: pageNum });
	}

	changeItemsPerPage(itemsNum) {
		this.setState({ itemsPerPage: itemsNum });
	}

	getPosts() {
		UserService.myPosts(
			this.state.itemsPerPage,
			this.state.itemsPerPage * (this.state.currentPage - 1)
		).then((res) => {
			const blogItems = res.data;
			this.setState({ totalRecords: res.data[1] });
			this.setState({ blogItems });
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
					defaultValue={this.itemsPerPage}
				></Pagination>
			</div>
		);
	}
}
