import React from "react";
import TagService from "../services/TagService";

export default class AddTag extends React.Component {
	state = {
		name: "",
	};

	handleChange = (event) => {
		this.setState({ name: event.target.value });
	};

	handleSubmit = (event) => {
		event.preventDefault();

		const tag = {
			name: this.state.name,
		};

		console.log(tag);
		TagService.create(tag).then((res) => console.log(res));
	};

	render() {
		return (
			<div className="form-container">
				<h3>Add new tag:</h3>
				<form className="add-form" onSubmit={this.handleSubmit}>
					<label className="add-form-label" htmlFor="tag">
						Tag Name:
					</label>
					<input
						className="add-form-control add-form-input"
						type="text"
						name="name"
						id="tag"
						onChange={this.handleChange}
						value={this.state.name}
						required
					/>
					<button
						className="primary-btn add-form-control"
						type="submit"
					>
						Add
					</button>
				</form>
			</div>
		);
	}
}
