import React from "react";
import UserPage from "../page/UserPage";
import "../navbar/AuthorNavBarHorizontal.css";
import AuthorNavBarHorizontal from "../navbar/AuthorNavBarHorizontal";

export default class AuthorBlogList extends React.Component {
	render() {
		return (
			<div className="author-blog-list-wrapper">
				<AuthorNavBarHorizontal />
				<UserPage />
			</div>
		);
	}
}
