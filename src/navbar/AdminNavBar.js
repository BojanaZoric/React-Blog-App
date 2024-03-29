import React from "react";
import { NavLink, Router } from "react-router-dom";
import "./NavBar.css";
import history from "../util/history";
import Storage from "../util/storage";

export default class AdminNavBar extends React.Component {
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
					<div className="sidebar-header">App Admin</div>
					<div className="nav-container">
						<ul className="nav-list">
							<li className="nav-element">
								<NavLink
									className="nav-link"
									activeClassName="is-active"
									to="/admin"
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
									to="/admin/authors"
									exact
									onClick={this.closeMenu}
								>
									Users
								</NavLink>
							</li>
							<li className="nav-element">
								<NavLink
									className="nav-link"
									activeClassName="is-active"
									to="/admin/categories"
									exact
									onClick={this.closeMenu}
								>
									Categories
								</NavLink>
							</li>
							<li className="nav-element">
								<NavLink
									className="nav-link"
									activeClassName="is-active"
									to="/admin/tags"
									exact
									onClick={this.closeMenu}
								>
									Tags
								</NavLink>
							</li>
							<li className="nav-element">
								<NavLink
									className="nav-link"
									activeClassName="is-active"
									to="/"
									exact
									onClick={this.closeMenu}
								>
									Posts
								</NavLink>
							</li>
							<li className="nav-element">
								<NavLink
									className="nav-logout"
									to="/login"
									exact
								>
									<button
										onClick={this.logout}
										className="btn primary-btn nav-logout"
									>
										Logout
									</button>
								</NavLink>
							</li>
						</ul>
					</div>
				</div>
			</Router>
		);
	}
}
