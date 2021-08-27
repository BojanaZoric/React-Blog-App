import React from "react";
import { withRouter } from "react-router";
import UserService from "../services/UserService";
import Storage from "../util/storage";

class UserInfo extends React.Component {
	constructor(props) {
		super(props);
		this.match = this.props.match;
		this.state = {
			userInfo: [],
		};
	}

	componentDidMount() {
		this.getInfo();
	}

	getInfo() {
		const userId = this.props.match.params.id;

		UserService.getUserInfo(userId).then((res) => {
			this.setState({ userInfo: res.data });
		});
	}

	render() {
		return (
			<div className="info-container">
				<div>
					<div className="info-row">
						<div className="info-name">Username:</div>
						<div>{this.state.userInfo.username}</div>
					</div>
					<div className="info-row">
						<div className="info-name">First Name:</div>{" "}
						{this.state.userInfo.firstName}
					</div>
					<div className="info-row">
						<div className="info-name">Last Name:</div>{" "}
						{this.state.userInfo.lastName}
					</div>
					<div className="info-row">
						<div className="info-name">Email:</div>{" "}
						{this.state.userInfo.email}
					</div>
					<div className="info-row">
						<div className="info-name">Biography:</div>{" "}
						{this.state.userInfo.biography}
					</div>
					{Storage.isLoggedIn() && Storage.getRole() === "admin" ? (
						<>
							{this.state.userInfo.enabled ? (
								<div>
									<button className="btn btn-disable">
										Disable
									</button>
								</div>
							) : (
								<div>
									<button className="btn btn-enable">
										Enable
									</button>
								</div>
							)}
						</>
					) : null}
				</div>
			</div>
		);
	}
}

export default withRouter(UserInfo);
