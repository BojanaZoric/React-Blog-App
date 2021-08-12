import React from "react";
import { Link, Redirect } from "react-router-dom";
import UserService from "./services/UserService";

export default class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loginUsername: "",
			loginPassword: "",
			redirect: false,
			role: "",
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
		UserService.login(this.state).then((res) => {
			const token = res && res.data.user["token"];
			if (token) {
				localStorage.setItem("token", token);
				this.setState({ redirect: true, role: res.data.user.role });
			}
		});
	};

	render() {
		return (
			<div className="form-container">
				{this.state.redirect ? (
					this.state.role === "admin" ? (
						<Redirect push to={"/admin"} />
					) : (
						<Redirect push to={"/author"} />
					)
				) : null}
				<form className="add-form" onSubmit={this.handleSubmit}>
					<label className="add-form-label" htmlFor="loginUsername">
						Username
					</label>
					<input
						className="add-form-control add-form-input"
						type="text"
						id="loginUsername"
						name="loginUsername"
						required
						value={this.state.loginUsername}
						onChange={this.handleChange}
					/>
					<label className="add-form-label" htmlFor="loginPassword">
						Password
					</label>
					<input
						className="add-form-control add-form-input"
						type="password"
						id="loginPassword"
						name="loginPassword"
						placeholder="Password"
						required
						value={this.state.loginPassword}
						onChange={this.handleChange}
					/>
					<button
						className="btn primary-btn add-form-control"
						type="submit"
					>
						Sign in
					</button>
				</form>
				<h5>
					Don't have account?
					<Link to="/registration">Register here </Link>
				</h5>
			</div>
		);
	}
}
