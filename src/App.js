import React from "react";
import "./App.css";
import { Router, Switch, Route } from "react-router";
import AdminPage from "./page/AdminPage";
import AuthorPage from "./page/AuthorPage";
import history from "./util/history";
import UserPage from "./page/UserPage";
import AuthorBlogList from "./author/AuthorBlogList";
import Login from "./Login";
import Registration from "./page/Registration";

function App() {
	return (
		<Router history={history}>
			<div>
				<Switch>
					<Route path="/login">
						<Login></Login>
					</Route>
					<Route path="/registration">
						<Registration />
					</Route>
					<Route path="/admin">
						<AdminPage />
					</Route>
					<Route path="/author">
						<AuthorPage />
					</Route>
					<Route path="/">
						<UserPage />
					</Route>
					<Route path="/authorblog" exact>
						<AuthorBlogList />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
