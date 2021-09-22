import React from "react";
import "./BlogItem.css";
import AuthorService from "../services/AuthorService";
import Storage from "../util/storage";
import image from "../util/post.jpg";
import { ToastContainer } from "react-toastr";
import { Link } from "react-router-dom";

export default class BlogItem extends React.Component {
	constructor(props) {
		super();
		this.state = {
			blogItem: props.blogItem,
		};
		this.onSavedClick = this.onSavedClick.bind(this);
	}

	onSavedClick() {
		AuthorService.savePost(this.state.blogItem.id).then(
			(res) => {
				this.container.success("d");
			},
			(error) => {
				this.container.error("error", "ttt", {
					timeOut: 300,
					closeButton: true,
					preventDuplicates: true,
				});
			}
		);
	}

	render() {
		return (
			<div className="toastr-container">
				<ToastContainer
					ref={(ref) => (this.container = ref)}
					className="toast-top-right"
				/>
				<div className="blog-item-container">
					<div className="post-img-section">
						<img className="post-image" alt="" src={image} />
					</div>
					<div className="post-info-section">
						<h3 className="post-title">
							{this.state.blogItem.title}
						</h3>
						<div className="meta">22/7/2020</div>
						<div className="post-description">
							{this.state.blogItem.content.substring(0, 250)}...
						</div>
						<div className="read-more">
							<Link to={`/post/${this.state.blogItem.id}`}>
								<button className="btn primary-btn">
									Read More
								</button>
							</Link>
							{Storage.isLoggedIn() &&
							Storage.getRole() === "author" ? (
								<button
									className="save-btn"
									onClick={() => {
										this.onSavedClick();
									}}
								></button>
							) : null}
						</div>
					</div>
				</div>
				<div className="divider"></div>
			</div>
		);
	}
}
