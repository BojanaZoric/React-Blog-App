import React from "react";
import BlogItem from "./BlogItem";

export default class BlogArchive extends React.Component {
	constructor(props) {
		super();
		this.state = {
			blogItems: [],
		};
	}

	render() {
		this.state.blogItems = this.props.postItems;
		return (
			<div>
				<div className="divider"></div>
				{this.state.blogItems.map((item) => (
					<BlogItem key={item.id} blogItem={item}></BlogItem>
				))}
			</div>
		);
	}
}
