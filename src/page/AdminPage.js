import React from "react";
import Main from "../admin/Main";
import AdminNavBar from "../navbar/AdminNavBar";

export default class AdminPage extends React.Component {
	render() {
		return (
			<div className="container admin-container">
				<nav className="navbar">
					<AdminNavBar></AdminNavBar>
				</nav>
				<main role="main" className="main">
					<Main></Main>
				</main>
			</div>
		);
	}
}
