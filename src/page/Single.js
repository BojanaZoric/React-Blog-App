import React from "react";
import { withRouter } from "react-router-dom";
import PostService from "../services/PostService";
import "./Single.css";
import Storage from "../util/storage";

class Single extends React.Component {
	constructor(props) {
		super(props);
		this.match = this.props.match;
		this.state = {
			post: [],
			commentMessage: "",
			parentComment: null,
		};
	}

	componentDidMount() {
		this.getPost();
	}

	getPost() {
		const postId = this.props.match.params.id;
		PostService.getOne(postId).then((res) => {
			const post = res.data;
			this.setState({ post });
		});
	}

	sortComments(comments) {
		let newList = {};
		for (let comment of comments) {
			for (let auth of this.state.post[5]) {
				if (auth.userId === comment[1]) {
					comment[0].authorFirstName = auth.firstName;
					comment[0].authorLastName = auth.lastName;
					break;
				}
			}
			newList[comment[0].id] = [];
			if (comment[0].parentComment === null) {
				newList[comment[0].id].push(comment);
			} else {
				newList[comment[0].parentComment].push(comment);
			}
		}
		var values = Object.keys(newList).map(function (key) {
			return newList[key];
		});
		return values;
	}

	handleChange = (event) => {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		this.setState({
			commentMessage: value,
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		const data = {
			postId: parseInt(this.props.match.params.id),
			message: this.state.commentMessage,
			parentComment: this.state.parentComment,
		};
		PostService.sendComment(data).then((res) => {
			this.getPost();
			this.setState({ commentMessage: "" });
		});
	};

	formatDate(currentDate) {
		const d = new Date(currentDate);

		var datestring =
			d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
		return datestring;
	}

	render() {
		return (
			<div className="single-post-container">
				{this.state.post[0] !== undefined ? (
					<>
						<div className="single-post-category">
							{this.state.post[3].map((item) => (
								<div key={item.id}>{item.name}</div>
							))}
						</div>
						<h2 className="single-post-title">
							{this.state.post[0].title}
						</h2>
						<div className="single-post-author">
							by: {this.state.post[1][0].firstName}{" "}
							{this.state.post[1][0].lastName}
						</div>
						<div className="single-post-date meta">
							{this.formatDate(this.state.post[0].last_modified)}
						</div>
						<div className="single-post-content">
							{this.state.post[0].content}
						</div>
						{this.state.post[4].map((item) => {
							<div className="single-post-tag" key="item.id">
								{item.name}
							</div>;
						})}
						<div className="divider"></div>
						<div className="comments-section">
							{this.state.post[2].length === 0 ? (
								<h4>There is no comments for this post</h4>
							) : (
								<>
									<h4>Comments:</h4>
									<ul className="comments-list">
										{this.sortComments(
											this.state.post[2]
										).map((comment) =>
											comment.map((item) => (
												<li
													key={item[0].id}
													className={`comment-item ${
														item[0]
															.parentComment !==
														null
															? "indent-comment"
															: ""
													}`}
												>
													<div className="single-comment-container">
														<div className="single-comment-header">
															<div className="meta">
																{
																	item[0]
																		.authorFirstName
																}{" "}
																{
																	item[0]
																		.authorLastName
																}
															</div>
															<div className="meta">
																{this.formatDate(
																	item[0]
																		.created_at
																)}
															</div>
														</div>
														<div className="single-comment-message">
															{item[0].message}
														</div>
														<div className="reply-div">
															<a
																className="reply-label"
																onClick={() => {
																	this.setState(
																		{
																			parentComment:
																				item[0]
																					.id,
																		}
																	);
																}}
															>
																Reply
															</a>
														</div>
													</div>
												</li>
											))
										)}
									</ul>
								</>
							)}
						</div>
						<div className="divider"></div>
						{Storage.isLoggedIn() &&
						Storage.getRole() === "author" ? (
							<div className="comment-form">
								<h4>Leave your comment:</h4>
								{this.state.parentComment ? (
									<div className="small-text">
										Reply
										<span>
											<button
												onClick={() => {
													this.setState({
														parentComment: null,
													});
												}}
												className="post-category-btn"
											>
												&#10006;
											</button>
										</span>
									</div>
								) : null}

								<form onSubmit={this.handleSubmit}>
									<textarea
										className="comment-form-message"
										value={this.state.commentMessage}
										onChange={this.handleChange}
										required
									></textarea>
									<input
										type="hidden"
										value={this.state.parentComment}
									/>
									<button
										className="btn primary-btn"
										type="submit"
									>
										Send
									</button>
								</form>
							</div>
						) : (
							<p>Please Log In to leave a comment</p>
						)}
					</>
				) : null}
			</div>
		);
	}
}

export default withRouter(Single);
