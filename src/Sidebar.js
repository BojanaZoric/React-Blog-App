import React from "react";
import { NavLink } from "react-router-dom";
import TagService from "./services/TagService";

export default class Sidebar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			tags: [],
		};
	}

	componentDidMount() {
		this.getTags();
	}

	getTags() {
		TagService.getAll().then((res) => {
			this.setState({ tags: res.data[0] });
		});
	}
	render() {
		return (
			<div className="sidebar-container">
				<div className="widget-title">Tags</div>
				<div className="sidebar-body">
					{this.state.tags.map((item) => (
						<NavLink
							className="sidebar-single-tag"
							activeClassName="is-active"
							to={`/tag/${item.id}`}
							exact
							key={item.id}
						>
							#{item.name}
						</NavLink>
					))}
				</div>
			</div>
		);
	}
}
