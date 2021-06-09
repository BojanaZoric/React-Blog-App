import React from "react";
import BlogArchive from "./BlogArchive";
import Pagination from "./shared/Pagination";
import PostService from "./services/PostService";

export default class BlogList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			category: props.category,
			tag: props.tag,
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

	getPosts() {
		if (!this.state.category && !this.state.tag) {
			PostService.getAll(
				this.state.itemsPerPage,
				this.state.itemsPerPage * (this.state.currentPage - 1)
			).then((res) => {
				const blogItems = res.data[0];
				this.setState({ totalRecords: res.data[1] });
				this.setState({ blogItems });
			});
		} else if (this.state.category) {
			PostService.getPostsWithCategory(
				this.state.category,
				this.state.itemsPerPage,
				this.state.itemsPerPage * (this.state.currentPage - 1)
			).then((res) => {
				this.setState({
					totalRecords: res.data[2],
					blogItems: res.data[1],
				});
			});
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
