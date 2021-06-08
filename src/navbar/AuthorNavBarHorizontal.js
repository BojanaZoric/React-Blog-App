import React from "react";
import { NavLink } from "react-router-dom";

export default class AuthorNavBarHorizontal extends React.Component {
	render() {
		return (
			<ul className="horizontal-nav-list">
				<li className="horizontal-nav-element">
					<NavLink
						className="horizontal-nav-link"
						activeClassName="is-active"
						to="/author"
						exact
						onClick={this.closeMenu}
					>
						Home
					</NavLink>
				</li>
				<li className="horizontal-nav-element">
					<NavLink
						className="horizontal-nav-link"
						activeClassName="is-active"
						to="/"
						exact
					>
						Posts
					</NavLink>
				</li>
				<li className="horizontal-nav-element">
					<NavLink
						className="horizontal-nav-link"
						activeClassName="is-active"
						to="/author/add-post"
						exact
						onClick={this.closeMenu}
					>
						Add Post
					</NavLink>
				</li>
			</ul>
		);
	}
}
