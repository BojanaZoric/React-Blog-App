import React from "react";
import Pagination from "../shared/Pagination";
import PostService from "../services/PostService";
import { withRouter } from "react-router-dom";
import BlogItem from "./BlogItem";

class BlogList extends React.Component {
	constructor(props) {
		super(props);
		this.match = this.props.match;
		this.state = {
			category: props.match.params.category,
			tag: props.match.params.tag,
			blogItems: [],
			totalRecords: "",
			itemsPerPage: 5,
			currentPage: 1,
		};
		this.getPosts = this.getPosts.bind(this);
		this.changePage = this.changePage.bind(this);
		this.changeItemsPerPage = this.changeItemsPerPage.bind(this);
	}

	componentWillReceiveProps = (nextProps) => {
		if (
			nextProps.match.params.category &&
			this.props.match.params.category !== nextProps.match.params.category
		) {
			this.setState({
				tag: "",
				category: nextProps.match.params.category,
			});
		} else if (
			nextProps.match.params.tag &&
			this.props.match.params.tag !== nextProps.match.params.tag
		) {
			this.setState({ category: "", tag: nextProps.match.params.tag });
		} else {
			this.setState({ category: null, tag: null });
		}
	};

	componentDidMount() {
		this.getPosts();
	}

	componentDidUpdate(prevProps, prevState) {
		if (
			this.state.itemsPerPage !== prevState.itemsPerPage ||
			this.state.currentPage !== prevState.currentPage ||
			this.state.category !== prevState.category ||
			this.state.tag !== prevState.tag
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
				this.setState({
					totalRecords: res.data[1],
					blogItems: blogItems,
				});
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
		} else if (this.state.tag) {
			PostService.getPostsWithTag(
				this.state.tag,
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
					<div>
						<div className="divider"></div>
						{this.state.blogItems.map((item) => (
							<BlogItem key={item.id} blogItem={item}></BlogItem>
						))}
					</div>
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

export default withRouter(BlogList);
