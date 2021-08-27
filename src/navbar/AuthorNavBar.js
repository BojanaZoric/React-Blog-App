import React from "react";
import { Router } from "react-router";
import { NavLink } from "react-router-dom";
import history from "../util/history";
import Storage from "../util/storage";

export default class AuthorNavBar extends React.Component {
	constructor() {
		super();
		this.closeMenu = this.closeMenu.bind(this);
	}
	closeMenu = () => {
		this.setState({ sidebarOpen: false });
		document.getElementById("hamburger").checked = false;
	};

	logout() {
		Storage.logOut();
	}

	render() {
		return (
			<Router history={history}>
				<label htmlFor="hamburger" className="hamburger-label">
					&#9776;
				</label>
				<input type="checkbox" id="hamburger"></input>

				<div className="sidebar-container">
					<div className="sidebar-header">App Author</div>
					<div className="nav-container">
						<ul className="nav-list">
							<li className="nav-element">
								<NavLink
									className="nav-link"
									activeClassName="is-active"
									to="/author"
									exact
									onClick={this.closeMenu}
								>
									Home
								</NavLink>
							</li>
							<li className="nav-element">
								<NavLink
									className="nav-link"
									activeClassName="is-active"
									to="/"
									exact
								>
									Posts
								</NavLink>
							</li>
							<li className="nav-element">
								<NavLink
									className="nav-link"
									activeClassName="is-active"
									to="/author/add-post"
									exact
									onClick={this.closeMenu}
								>
									Add Post
								</NavLink>
							</li>
							<li className="nav-element">
								<NavLink
									className="nav-link"
									activeClassName="is-active"
									to="/author/myPosts"
									exact
									onClick={this.closeMenu}
								>
									My Posts
								</NavLink>
							</li>
							<li className="nav-element">
								<NavLink
									className="nav-link"
									activeClassName="is-active"
									to="/author/savedPosts"
									exact
									onClick={this.closeMenu}
								>
									Saved Posts
								</NavLink>
							</li>
							<li className="nav-element">
								<NavLink
									className="nav-link nav-logout"
									activeClassName="is-active"
									to="/login"
									exact
									onClick={this.logout}
								>
									Logout
								</NavLink>
							</li>
						</ul>
					</div>
				</div>
			</Router>
		);
	}
}
