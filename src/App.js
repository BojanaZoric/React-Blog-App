import React from "react";
import "./App.css";
import { Router, Switch, Route } from "react-router";
import AdminPage from "./page/AdminPage";
import AuthorPage from "./page/AuthorPage";
import history from "./util/history";
import UserPage from "./page/UserPage";
import Single from "./Single";
import AuthorBlogList from "./author/AuthorBlogList";

function App() {
	return (
		<Router history={history}>
			<div>
				<Switch>
					<Route path="/admin">
						<AdminPage />
					</Route>
					<Route path="/author">
						<AuthorPage />
					</Route>
					<Route path="/" exact>
						<UserPage />
					</Route>
					<Route path="/authorblog" exact>
						<AuthorBlogList />
					</Route>
					<Route path="/post/:postId" exact component={Single} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
