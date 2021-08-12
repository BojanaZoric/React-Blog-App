import React from "react";
import "./BlogItem.css";
import AuthorService from "./services/AuthorService";
import Storage from "./util/storage";
import image from "./util/post.jpg";

export default class BlogItem extends React.Component {
	constructor(props) {
		super();
		this.state = {
			blogItem: props.blogItem,
		};
		this.onSavedClick = this.onSavedClick.bind(this);
	}

	onSavedClick() {
		AuthorService.savePost(this.state.blogItem.id).then((res) => {
			console.log(res);
		});
	}

	render() {
		return (
			<div>
				<div className="blog-item-container">
					<div className="post-img-section">
						<img className="post-image" src={image} />
					</div>
					<div className="post-info-section">
						<h3 className="post-title">
							{this.state.blogItem.title}
						</h3>
						<div className="meta">22/7/2020</div>
						<div className="post-description">Description</div>
						<div className="read-more">
							<button className="btn primary-btn">
								Read More
							</button>
							{Storage.isLoggedIn() ? (
								<button onClick={this.onSavedClick}>
									Save
								</button>
							) : null}
						</div>
					</div>
				</div>
				<div className="divider"></div>
			</div>
		);
	}
}
