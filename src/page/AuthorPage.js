import React from "react";
import UserPage from "../page/UserPage";
import AuthorNavBar from "../navbar/AuthorNavBar";
import Header from "../navbar/Header";
import { Route, Switch, useRouteMatch } from "react-router";
import AddPost from "../author/AddPost";
import CreatePost from "../author/CreatePost";
import { Router } from "react-router-dom";
import Profile from "../author/Profile";
import MyPosts from "../author/MyPosts";

export default function AuthorPage() {
	let match = useRouteMatch();
	return (
		<div className="container">
			<main role="main" className="main">
				<Header></Header>
				<Switch>
					<Route path={`${match.path}`} exact>
						<AddPost />
					</Route>
					<Route path={`/blog`}>
						<UserPage />
					</Route>
					<Route path={`/author/add-post`}>
						<AddPost />
					</Route>
					<Route path={`/author/create-post`}>
						<CreatePost />
					</Route>
					<Route path={`/author/profile`}>
						<Profile />
					</Route>
					<Route path={`/author/myPosts`}>
						<MyPosts />
					</Route>
				</Switch>
			</main>
			<nav className="navbar">
				<AuthorNavBar />
			</nav>
		</div>
	);
}
