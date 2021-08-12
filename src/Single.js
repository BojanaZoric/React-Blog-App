import React from "react";
import PostService from "./services/PostService";
import "./Single.css";

export default class Single extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			post: [],
			commentMessage: "",
		};
	}

	componentDidMount() {
		//const postId = this.props.match.params.postId;
		PostService.getOne(1).then((res) => {
			const post = res.data;
			this.setState({ post });
			console.log(post);
		});
	}

	sortComments(comments) {
		console.log(comments);
		let newList = {};
		for (let comment of comments) {
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
			postId: 1,
			message: this.state.commentMessage,
			parentComment: null,
		};
		PostService.sendComment(data).then((res) => {
			console.log(res);
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
							<h4>Comments:</h4>
							<ul className="comments-list">
								{this.sortComments(this.state.post[2]).map(
									(comment) =>
										comment.map((item) => (
											<li
												key={item[0].id}
												className={`comment-item ${
													item[0].parentComment !==
													null
														? "indent-comment"
														: ""
												}`}
											>
												<div className="single-comment-container">
													<div className="single-comment-header">
														<div className="meta">
															{item[1].firstName}{" "}
															{item[1].lastName}
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
												</div>
											</li>
										))
								)}
							</ul>
						</div>
						<div className="divider"></div>
						<div className="comment-form">
							<h4>Leave your comment:</h4>
							<form onSubmit={this.handleSubmit}>
								<textarea
									className="comment-form-message"
									value={this.state.commentMessage}
									onChange={this.handleChange}
									required
								></textarea>
								<button type="submit">Send</button>
							</form>
						</div>
					</>
				) : null}
			</div>
		);
	}
}
