import React from "react";
import AddTag from "./AddTag";
import CategoryList from "./CategoryList";
import TagList from "./TagList";
import BlogList from "../user-page/BlogList";
import AuthorList from "./AuthorList";
import { Route, Switch, useRouteMatch } from "react-router";
import AddCategory from "./AddCategory";
import Analitics from "./Analitics";
import UserInfo from "./UserInfo";
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
				<Route path={`${match.path}/user-info/:id`}>
					<UserInfo />
				</Route>
			</Switch>
		</div>
	);
}
