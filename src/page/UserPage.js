import React from "react";
import { Route, Router, Switch, useRouteMatch } from "react-router";
import BlogList from "../BlogList";
import Sidebar from "../Sidebar";
import Single from "../Single";
import UserHeader from "../UserPage/UserHeader";
import history from "../util/history";

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
					<Router history={history}>
						<Switch>
							<Route path="/blog" exact>
								<BlogList />
							</Route>
							<Route path="/" exact>
								<BlogList />
							</Route>
							<Route path={`${match.path}/post/:id"`}>
								<Single />
							</Route>
						</Switch>
					</Router>
				</main>
			</div>
		</>
	);
}
