import React from "react";
import "./BlogItem.css";

export default class BlogItem extends React.Component {
	constructor(props) {
		super();
		this.state = {
			blogItem: props.blogItem,
		};
	}

	render() {
		return (
			<div className="blog-item-container">
				<div className="post-img-section">
					<img />
				</div>
				<div className="post-info-section">
					<h3 className="post-title">{this.state.blogItem.title}</h3>
					<div className="meta">22/7/2020</div>
					<div className="post-description">Description</div>
					<div className="read-more">
						<button>Read More</button>
					</div>
				</div>
			</div>
		);
	}
}
