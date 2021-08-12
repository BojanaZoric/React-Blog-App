import React from "react";
import { Link, Redirect } from "react-router-dom";
import UserService from "../services/UserService";

export default class Registration extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			registerUsername: "",
			registerEmail: "",
			registerPassword: "",
			firstName: "",
			lastName: "",
			biography: "",
			redirect: false,
		};
	}

	handleChange = (event) => {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		this.setState({
			[name]: value,
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		UserService.register(this.state).then((res) => {
			this.setState({ redirect: true });
		});
	};

	render() {
		return (
			<div className="form-container">
				{this.state.redirect ? <Redirect push to={"/login"} /> : null}
				<form className="add-form" onSubmit={this.handleSubmit}>
					<label
						className="add-form-label"
						htmlFor="registerUsername"
					>
						Username
					</label>
					<input
						className="add-form-control add-form-input"
						type="text"
						id="registerUsername"
						name="registerUsername"
						required
						value={this.state.registerUsername}
						onChange={this.handleChange}
					/>
					<label className="add-form-label" htmlFor="registerEmail">
						Email
					</label>
					<input
						className="add-form-control add-form-input"
						type="text"
						id="registerEmail"
						name="registerEmail"
						required
						value={this.state.registerEmail}
						onChange={this.handleChange}
					/>
					<label className="add-form-label" htmlFor="firstName">
						First Name
					</label>
					<input
						className="add-form-control add-form-input"
						type="text"
						id="firstName"
						name="firstName"
						required
						value={this.state.firstName}
						onChange={this.handleChange}
					/>
					<label className="add-form-label" htmlFor="lastName">
						Last Name
					</label>
					<input
						className="add-form-control add-form-input"
						type="text"
						id="lastName"
						name="lastName"
						required
						value={this.state.lastName}
						onChange={this.handleChange}
					/>
					<label className="add-form-label" htmlFor="biography">
						Something About You
					</label>
					<textarea
						className="add-form-control add-form-input"
						type="text"
						id="biography"
						name="biography"
						required
						value={this.state.biography}
						onChange={this.handleChange}
					/>
					<label
						className="add-form-label"
						htmlFor="registerPassword"
					>
						Password
					</label>
					<input
						className="add-form-control add-form-input"
						type="password"
						id="registerPassword"
						name="registerPassword"
						required
						value={this.state.registerPassword}
						onChange={this.handleChange}
					/>
					<button
						className="btn primary-btn add-form-control"
						type="submit"
					>
						Register
					</button>
				</form>
				<h5>
					Already have account?
					<Link to="/login"> Log in here</Link>
				</h5>
			</div>
		);
	}
}
