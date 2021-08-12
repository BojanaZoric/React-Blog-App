import React from "react";
import AddTag from "./AddTag";
import CategoryList from "./CategoryList";
import TagList from "./TagList";
import Header from "../navbar/Header";
import BlogList from "../BlogList";
import AuthorList from "./AuthorList";
import { Route, Switch, useRouteMatch } from "react-router";
import AddCategory from "./AddCategory";
import Analitics from "./Analitics";
export default function Main() {
	let match = useRouteMatch();
	return (
		<div>
			<Switch>
				<Route path={`${match.path}`} exact>
					<Analitics />
				</Route>
				<Route path={`${match.path}/authors`}>
					<AuthorList />
				</Route>
				<Route path={`${match.path}/blog`}>
					<BlogList />
				</Route>
				<Route path={`${match.path}/categories`}>
					<CategoryList />
				</Route>
				<Route path={`${match.path}/tags`}>
					<TagList />
				</Route>
				<Route path={`${match.path}/addTag`} component={AddTag} />
				<Route
					path={`${match.path}/addCategory`}
					component={AddCategory}
				/>
			</Switch>
		</div>
	);
}
