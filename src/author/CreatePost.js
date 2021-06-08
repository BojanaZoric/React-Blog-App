import React from "react";
import "./CreatePost.css";
import CategoryService from "../services/CategoryService";
import PostService from "../services/PostService";
import TagService from "../services/TagService";

export default class CreatePost extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "",
			slug: "",
			content: "",
			authorId: 1,
			id: 0,
			image: null,
			categories: [],
			tags: [],
			allCategories: [],
			allTags: [],
			selectedCategory: "",
			selectedTag: "",
		};
		this.addCategory = this.addCategory.bind(this);
		this.addTag = this.addTag.bind(this);
	}

	headers = {
		"Content-Type": "application/json",
	};

	handleChange = (event) => {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		console.log(name, value);
		this.setState({
			[name]: value,
		});
	};

	isPresent(item) {
		for (let el of this.state.categories) {
			if (item.id === el[0].id) {
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
		PostService.getOne(18).then((res) => {
			this.setState({
				title: res.data[0].title,
				slug: res.data[0].slug,
				content: res.data[0].content,
				categories: res.data[3],
				tags: res.data[4],
			});
		});
	}

	handleSubmit = (event) => {
		event.preventDefault();
		PostService.update(18, this.state).then((res) => {
			console.log(res.data);
		});
	};

	addCategory(event) {
		event.preventDefault();

		CategoryService.addCategoryToPost(
			18,
			parseInt(this.state.selectedCategory)
		).then((res) => {
			this.getPost();
			this.setState({ selectedCategory: 0 });
		});
	}

	addTag(event) {
		event.preventDefault();
		TagService.addTagToPost(18, parseInt(this.state.selectedTag)).then(
			(res) => {
				this.getPost();
			}
		);
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
				<div className="post-wrapper">
					<div className="post-data">
						<form onSubmit={this.handleSubmit}>
							<h1>{this.state.title}</h1>
							<h6>{this.state.slug}</h6>
							<div className="blog-content-container">
								<textarea
									name="content"
									id="content"
									className="blog-content"
									onChange={this.handleChange}
									value={this.state.content}
								></textarea>
							</div>
							<button type="submit">Save</button>
						</form>
					</div>
					<div className="post-settings">
						<div className="post-category">
							Category
							<ul>
								{this.state.categories.map((item) => (
									<li key={item[0].id}>
										<span>{item[0].name}</span>
										<span>
											<button
												onClick={() =>
													this.removeCategoryFromPost(
														item[1].id
													)
												}
											>
												x
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
						<div className="post-tag">
							Tag
							<ul>
								{this.state.tags.map((item) => (
									<li key={item[0].id}>
										<span>{item[0].name}</span>
										<span>
											<button
												onClick={() =>
													this.removeTagFromPost(
														item[1].id
													)
												}
											>
												x
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
					</div>
				</div>
			</div>
		);
	}
}
