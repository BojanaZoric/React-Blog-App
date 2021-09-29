import React from "react";
import UserService from "../services/UserService";

export default class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			email: "",
			firstName: "",
			lastName: "",
			biography: "",
		};
	}
	componentDidMount() {
		this.getProfile();
	}
	getProfile() {
		UserService.profile().then((res) => {
			this.setState(res.data);
		});
	}
	render() {
		return (
			<div>
				<div>
					<h3>Username: {this.state.username}</h3>
					<h3>Email: {this.state.email}</h3>
					<h3>FirstName: {this.state.firstName}</h3>
					<h3>LastName: {this.state.lastName}</h3>
					<h3>Biography: {this.state.biography}</h3>
				</div>
			</div>
		);
	}
}
