import React from "react";
import "./UserHeader.css";
import "../services/CategoryService";
import CategoryService from "../services/CategoryService";
import { NavLink, Router } from "react-router-dom";
import history from "../util/history";

export default class UserHeader extends React.Component {
	constructor() {
		super();
		this.state = {
			categories: [],
		};
	}
	componentDidMount() {
		this.getMenu();
	}
	getMenu() {
		CategoryService.getAll().then((res) => {
			this.setState({ categories: res.data[0] });
		});
	}

	render() {
		return (
			<header className="user-header">
				<div className="branding">Header</div>

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
					</ul>
				</nav>
			</header>
		);
	}
}
