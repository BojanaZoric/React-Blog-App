import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import BlogList from "../BlogList";
import Sidebar from "../Sidebar";
import Single from "../Single";
import UserHeader from "../UserPage/UserHeader";

export default function UserPage() {
	let match = useRouteMatch();
	return (
		<>
			<UserHeader />
			<div className="container">
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
					</Switch>
				</main>
			</div>
		</>
	);
}
