import axios from "axios";

const getAll = (limit, offset) => {
	return axios.get("http://localhost:3000/posts", {
		params: {
			limit: limit,
			offset: offset,
		},
	});
};

const getPostsWithCategory = (categoryId, limit, offset) => {
	return axios.get(`http://localhost:3000/categoryPost/${categoryId}`, {
		params: {
			limit: limit,
			offset: offset,
		},
	});
};

const getOne = (id) => {
	return axios.get("http://localhost:3000/post/" + id);
};

const create = (data) => {
	let post = {
		title: data.title,
		slug: data.slug,
		content: "",
		image: "",
		published: false,
	};
	return axios.post("http://localhost:3000/posts", post);
};

const update = (id, data) => {
	let post = {
		authorId: 1,
		title: data.title,
		slug: data.slug,
		content: data.content,
		image: data.image,
		published: data.published,
	};
	return axios.put(`http://localhost:3000/post/${id}`, post);
};

const BlogService = {
	getAll,
	getPostsWithCategory,
	create,
	getOne,
	update,
};

export default BlogService;
