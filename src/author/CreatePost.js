import React from "react";
import "./CreatePost.css";
import CategoryService from "../services/CategoryService";
import PostService from "../services/PostService";
import TagService from "../services/TagService";
import { Redirect, withRouter } from "react-router-dom";

class CreatePost extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "",
			slug: "",
			content: "",
			published: false,
			image: "",
			id: this.props.match.params.id,
			categories: [],
			tags: [],
			allCategories: [],
			allTags: [],
			selectedCategory: "",
			selectedTag: "",
			redirect: false,
		};
		this.addCategory = this.addCategory.bind(this);
		this.addTag = this.addTag.bind(this);
	}

	headers = {
		"Content-Type": "application/json",
	};

	handleChange = (event) => {
		const target = event.target;
		const value =
			target.type === "checkbox" ? target.checked : target.value;
		const name = target.name;
		this.setState({
			[name]: value,
		});
	};

	isPresent(item) {
		for (let el of this.state.categories) {
			if (item.id === el.id) {
				return true;
			}
		}
		return false;
	}

	isPresentTag(item) {
		for (let el of this.state.tags) {
			if (item.id === el[0].id) {
				return true;
			}
		}
		return false;
	}

	componentDidMount() {
		this.getPost();
		CategoryService.getAll().then((res) => {
			this.setState({ allCategories: res.data[0] });
		});

		TagService.getAll().then((res2) => {
			this.setState({ allTags: res2.data[0] });
		});
	}

	getPost() {
		PostService.getOne(this.state.id).then((res) => {
			this.setState({
				title: res.data[0].title,
				slug: res.data[0].slug,
				content: res.data[0].content,
				categories: res.data[3],
				tags: res.data[4],
				published: res.data[0].published,
			});
		});
	}

	handleSubmit = (event) => {
		event.preventDefault();
		PostService.update(this.state.id, this.state).then((res) => {
			this.setState({ redirect: true });
		});
	};

	addCategory(event) {
		event.preventDefault();

		CategoryService.addCategoryToPost(
			this.state.id,
			parseInt(this.state.selectedCategory)
		).then((res) => {
			this.getPost();
			this.setState({ selectedCategory: 0 });
		});
	}

	addTag(event) {
		event.preventDefault();
		TagService.addTagToPost(
			this.state.id,
			parseInt(this.state.selectedTag)
		).then((res) => {
			this.getPost();
		});
	}

	removeTagFromPost(postTagId) {
		TagService.removeTagFromPost(postTagId).then((res) => {
			this.getPost();
		});
	}

	removeCategoryFromPost(postCategoryId) {
		CategoryService.removeCategoryFromPost(postCategoryId).then((res) => {
			this.getPost();
		});
	}

	render() {
		return (
			<div>
				{this.state.redirect ? (
					<Redirect push to={"/author/myPosts"} />
				) : null}
				<div className="post-wrapper">
					<div className="post-data">
						<form onSubmit={this.handleSubmit}>
							<h1 className="post-data-title">
								<input
									name="title"
									id="title"
									type="text"
									className="input-title"
									value={this.state.title}
									onChange={this.handleChange}
								/>
							</h1>
							<h6 className="post-data-title">
								{this.state.slug}
							</h6>
							<div className="blog-content-container">
								<textarea
									name="content"
									id="content"
									className="blog-content"
									onChange={this.handleChange}
									value={this.state.content}
								></textarea>
							</div>
							<button className="btn primary-btn" type="submit">
								Save
							</button>
						</form>
					</div>
					<div className="post-settings">
						<div className="post-labels">
							<div className="settings-title">Categories</div>
							<ul className="post-categories">
								{this.state.categories.map((item) => (
									<li
										className="post-category-item"
										key={item.id}
									>
										<span className="post-category-label">
											{item.name}
										</span>
										<span>
											<button
												className="post-category-btn"
												onClick={() =>
													this.removeCategoryFromPost(
														item.id
													)
												}
											>
												&#10006;
											</button>
										</span>
									</li>
								))}
							</ul>
							<form onSubmit={this.addCategory}>
								<select
									value={this.state.selectedCategory}
									onChange={this.handleChange}
									name="selectedCategory"
								>
									<option value=""></option>
									{this.state.allCategories.map((item) => {
										return this.isPresent(item) ? null : (
											<option
												key={item.id}
												value={item.id}
											>
												{item.name}
											</option>
										);
									})}
								</select>
								<button type="submit">Add</button>
							</form>
						</div>
						<div className="post-labels">
							<div className="settings-title">Tags</div>
							<ul className="post-categories">
								{this.state.tags.map((item) => (
									<li
										className="post-category-item"
										key={item[0].id}
									>
										<span className="post-category-label">
											{item[0].name}
										</span>
										<span>
											<button
												className="post-category-btn"
												onClick={() =>
													this.removeTagFromPost(
														item[1].id
													)
												}
											>
												&#10006;
											</button>
										</span>
									</li>
								))}
							</ul>
							<form onSubmit={this.addTag}>
								<select
									value={this.state.selectedTag}
									onChange={this.handleChange}
									name="selectedTag"
								>
									<option value=""></option>
									{this.state.allTags.map((item) => {
										return this.isPresentTag(
											item
										) ? null : (
											<option
												key={item.id}
												value={item.id}
											>
												{item.name}
											</option>
										);
									})}
								</select>
								<button type="submit">Add</button>
							</form>
						</div>
						<div>
							<input
								name="published"
								checked={this.state.published}
								value={this.state.published}
								onChange={this.handleChange}
								type="checkbox"
								id="published"
							/>
							<label htmlFor="published">publish</label>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(CreatePost);
