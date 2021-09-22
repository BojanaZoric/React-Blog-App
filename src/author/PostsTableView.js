import React from "react";
import "./PostsTableView.css";
import image from "../util/post.jpg";
import { Link } from "react-router-dom";

export default class PostsTableView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			blogItems: [],
			mode: props.mode,
		};
		this.onClickEnable = props.onEnabled;
		this.onClickDisable = props.onDisabled;
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
							{this.state.mode === "edit" ? (
								<th className="main-table-header">Status</th>
							) : null}

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
								{this.state.mode === "edit" ? (
									<>
										<td className="main-table-data">
											{post.published ? (
												<>Published</>
											) : (
												<>Draft</>
											)}
										</td>
									</>
								) : null}

								{this.state.mode === "edit" ? (
									<td>
										<Link to={`create-post/${post.id}`}>
											<button className="btn-rounded btn-edit"></button>
										</Link>
									</td>
								) : (
									<td>
										<button className="btn-rounded btn-info"></button>
									</td>
								)}

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
