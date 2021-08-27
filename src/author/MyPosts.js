import React from "react";
import PostsTableView from "../PostsTableView";
import UserService from "../services/UserService";
import Pagination from "../shared/Pagination";

export default class MyPosts extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			blogItems: [],
			totalRecords: 0,
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
			const blogItems = res.data[0];
			this.setState({ blogItems, totalRecords: res.data[1] });
		});
	}

	render() {
		return (
			<div className="my-posts-container">
				{this.state.blogItems.length > 0 ? (
					<>
						<h3>My Posts</h3>
						<div>
							<PostsTableView
								postItems={this.state.blogItems}
							></PostsTableView>
						</div>
						<Pagination
							totalRecords={this.state.totalRecords}
							itemsPerPage={this.state.itemsPerPage}
							currentPage={this.state.currentPage}
							onChangeItemsPerPage={this.changeItemsPerPage}
							onChangePage={this.changePage}
							defaultValue={this.state.itemsPerPage}
						></Pagination>
					</>
				) : (
					<h2 className="empty-results-message">
						There is no posts to show
					</h2>
				)}
			</div>
		);
	}
}
