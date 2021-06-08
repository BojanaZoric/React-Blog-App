import axios from "axios";

const getAll = (limit, offset) => {
	return axios.get("http://localhost:3000/tags", {
		params: {
			limit: limit,
			offset: offset,
		},
	});
};

const create = (data) => {
	const headers = {
		"Content-Type": "application/json",
	};
	return axios.post("http://localhost:3000/tags", data, headers);
};

const deleteOne = (id) => {
	return axios.delete(`http://localhost:3000/tag/${id}`);
};

const addTagToPost = (postId, tagId) => {
	var postTag = {
		postId: postId,
		tagId: tagId,
	};

	return axios.post(`http://localhost:3000/tagPost`, postTag);
};

const removeTagFromPost = (postTagId) => {
	return axios.delete(`http://localhost:3000/postTagRemove/${postTagId}`);
};

const TagService = {
	getAll,
	create,
	addTagToPost,
	removeTagFromPost,
	deleteOne,
};

export default TagService;
