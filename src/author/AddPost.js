import React from "react";
import { Redirect } from "react-router-dom";
import PostService from "../services/PostService";

export default class AddPost extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "",
			slug: "",
			redirect: false,
			givenId: null,
			slugEdited: false,
		};
		this.data = null;
		this.onClickEditButton = this.onClickEditButton.bind(this);
	}

	headers = {
		"Content-Type": "application/json",
	};

	handleChange = (event) => {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value,
		});

		if (name === "title" && !this.state.slugEdited) {
			this.setState({ slug: this.makeSlugFromTitle(value) });
		}
	};

	handleSubmit = (event) => {
		event.preventDefault();
		PostService.create(this.state).then((res) =>
			this.setState({ givenId: res.data.id, redirect: true })
		);
	};

	makeSlugFromTitle(title) {
		return title
			.toLowerCase()
			.replace(/[^\w ]+/g, "")
			.replace(/ +/g, "-");
	}

	onClickEditButton() {
		this.setState({ slugEdited: true });
		document.getElementById("slug").disabled = false;
	}

	render() {
		return (
			<div className="form-container">
				{this.state.redirect ? (
					<Redirect
						push
						to={`/author/create-post/${this.state.givenId}`}
					/>
				) : null}
				<h3>Create a new Post:</h3>
				<form className="add-form" onSubmit={this.handleSubmit}>
					<label className="add-form-label" htmlFor="title">
						Title:
					</label>
					<input
						className="add-form-control add-form-input"
						type="text"
						name="title"
						id="title"
						onChange={this.handleChange}
						value={this.state.title}
						required
					/>
					<label className="add-form-label" htmlFor="slug">
						Slug:
					</label>
					<div className="input-field-wrapper">
						<input
							className="add-form-control add-form-input"
							type="text"
							name="slug"
							id="slug"
							onChange={this.handleChange}
							value={this.state.slug}
							disabled
						/>
						<button type="button" onClick={this.onClickEditButton}>
							Edit
						</button>
					</div>
					<button
						className="btn primary-btn add-form-control"
						onClick={this.handleSubmit}
						type="submit"
					>
						Add
					</button>
				</form>
			</div>
		);
	}
}
