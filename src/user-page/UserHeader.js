import React from "react";
import "./UserHeader.css";
import "../services/CategoryService";
import CategoryService from "../services/CategoryService";
import { Link, NavLink, Router } from "react-router-dom";
import history from "../util/history";
import logo from "../util/logo.png";

export default class UserHeader extends React.Component {
	constructor() {
		super();
		this.state = {
			categories: [],
		};
		this.loginClicked = this.loginClicked.bind(this);
		this.logoutClicked = this.logoutClicked.bind(this);
	}
	componentDidMount() {
		this.getMenu();
	}
	getMenu() {
		CategoryService.getAll().then((res) => {
			this.setState({ categories: res.data[0] });
		});
	}

	isLoggedIn() {
		const token = localStorage.getItem("token");

		if (token) {
			return true;
		}
		return false;
	}

	LoginButton() {
		return (
			<Link to="/login">
				<button
					onClick={this.loginClicked}
					className="btn primary-btn loginBtn"
				>
					Log In
				</button>
			</Link>
		);
	}

	LogoutButton() {
		return (
			<Link to="/login">
				<button
					onClick={this.logoutClicked}
					className="btn primary-btn loginBtn"
				>
					Log Out
				</button>
			</Link>
		);
	}

	loginClicked() {}

	logoutClicked() {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
	}

	render() {
		return (
			<header className="user-header">
				<div className="branding">
					<Link to={`/`} className="logo-link">
						<img className="logo-image" alt="" src={logo} />
					</Link>
				</div>

				<nav>
					<ul className="user-nav">
						<Router history={history}>
							{this.state.categories.map((category) => (
								<li key={category.id} className="user-nav-item">
									<NavLink
										className="user-nav-link"
										activeClassName="is-active"
										to={`/category/${category.id}`}
										exact
									>
										{category.name}
									</NavLink>
								</li>
							))}
						</Router>
						{this.isLoggedIn()
							? this.LogoutButton()
							: this.LoginButton()}
					</ul>
				</nav>
			</header>
		);
	}
}
