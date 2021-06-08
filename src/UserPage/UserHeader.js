import React from "react";
import "./UserHeader.css";

export default class UserHeader extends React.Component {
	render() {
		return (
			<header className="user-header">
				<div className="branding">Header</div>
				<nav>
					<ul className="user-nav">
						<li className="user-nav-item">
							<a>Home</a>
						</li>
						<li className="user-nav-item">
							<a>About</a>
						</li>
						<li className="user-nav-item">
							<a>Contact</a>
						</li>
					</ul>
				</nav>
			</header>
		);
	}
}
