import React from "react";
import CategoryService from "../services/CategoryService";

export default class AddCategory extends React.Component {
	state = {
		name: "",
	};

	headers = {
		"Content-Type": "application/json",
	};

	handleChange = (event) => {
		this.setState({ name: event.target.value });
	};

	handleSubmit = (event) => {
		event.preventDefault();

		const category = {
			name: this.state.name,
		};

		CategoryService.create(category).then((res) => console.log(res));
	};

	render() {
		return (
			<div className="form-container">
				<h3>Add new category:</h3>
				<form className="add-form" onSubmit={this.handleSubmit}>
					<label className="add-form-label" htmlFor="category">
						Category Name:
					</label>
					<input
						className="add-form-control add-form-input"
						type="text"
						name="name"
						id="category"
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
