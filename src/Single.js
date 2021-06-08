import React from "react";
import axios from "axios";

export default class Single extends React.Component {
	constructor(props) {
		super();

		this.state = {
			post: [],
		};
		console.log(this.props);
	}

	componentDidMount() {
		const postId = this.props.match.params.postId;
		axios.get(`http://localhost:3000/post/1`).then((res) => {
			const post = res.data;
			console.log(post);
			this.setState({ post });
		});
	}

	render() {
		return <div>This is single</div>;
	}
}
