import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import { NavLink } from "react-router-dom";
import BlogList from "../BlogList";
import Sidebar from "../Sidebar";
import Single from "../Single";
import UserHeader from "../UserPage/UserHeader";
import Storage from "../util/storage";
import "./UserPage.css";

export default function UserPage() {
	let match = useRouteMatch();
	return (
		<>
			{Storage.isLoggedIn() ? (
				<div className="admin-line-container">
					<div className="admin-line"></div>
					<div className="admin-options">
						<div className="header-hello">
							Hi, {Storage.getUsername()}
						</div>
						{Storage.getRole() === "admin" ? (
							<NavLink
								className="link-to-panel"
								to={`${match.path}admin`}
								exact
							>
								Advanced Options
							</NavLink>
						) : (
							<NavLink
								className="link-to-panel"
								to={`${match.path}author`}
								exact
							>
								Advanced Options
							</NavLink>
						)}
					</div>
				</div>
			) : null}
			<UserHeader />
			<div className="container user-page-container">
				<aside className="aside">
					<Sidebar />
				</aside>
				<main role="main" className="main">
					<Switch>
						<Route path={`${match.path}blog`} exact>
							<BlogList />
						</Route>
						<Route path={`${match.path}`} exact>
							<BlogList />
						</Route>
						<Route path={`${match.path}post/:id`}>
							<Single />
						</Route>
						<Route path={`${match.path}category/:category`}>
							<BlogList />
						</Route>
						<Route path={`${match.path}tag/:tag`}>
							<BlogList />
						</Route>
					</Switch>
				</main>
			</div>
		</>
	);
}
