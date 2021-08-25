import React from "react";
import "./PostsTableView.css";
import image from "./util/post.jpg";
import PostService from "./services/PostService";
import { Link } from "react-router-dom";

export default class PostsTableView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			blogItems: [],
		};
	}

	onClickDisable(id) {
		PostService.disablePost(id).then((res) => {
			console.log("disabled");
		});
	}

	onClickEnable(id) {
		PostService.enablePost(id).then((res) => {
			console.log("enabled");
		});
	}

	render() {
		this.state.blogItems = this.props.postItems;
		return (
			<div className="posts-table-container">
				<table className="main-table post-table">
					<thead>
						<tr className="posts-table-row">
							<th className="main-table-header">Id</th>
							<th className="main-table-header">Image</th>
							<th className="main-table-header">Title</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{this.state.blogItems.map((post) => (
							<tr className="posts-table-row" key={post.id}>
								<td className="main-table-data posts-table-id-row">
									{post.id}
								</td>
								<td className="main-table-data posts-table-img-row">
									<img
										src={image}
										className="post-table-img"
									/>
								</td>
								<td className="main-table-data">
									{post.title}
								</td>
								<td className="main-table-data">
									{post.published ? (
										<button
											onClick={() => {
												this.onClickDisable(post.id);
											}}
										>
											Disable
										</button>
									) : (
										<button
											onClick={() => {
												this.onClickEnable(post.id);
											}}
										>
											Enable
										</button>
									)}
								</td>
								<td>
									<Link to={`create-post/${post.id}`}>
										<button className="btn-rounded btn-edit"></button>
									</Link>
								</td>
								<td>
									<button className="btn-rounded btn-delete"></button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}
}
