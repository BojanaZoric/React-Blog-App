import axios from "axios";

const getAll = (limit, offset) => {
	return axios.get("http://localhost:3000/categories", {
		params: {
			limit: limit,
			offset: offset,
		},
	});
};

const create = (data) => {
	return axios.post("http://localhost:3000/categories", data);
};

const deleteOne = (id) => {
	return axios.delete(`http://localhost:3000/category/${id}`);
};

const addCategoryToPost = (postId, categoryId) => {
	var postCategory = {
		postId: parseInt(postId),
		categoryId: categoryId,
	};

	return axios.post(`http://localhost:3000/postCategory`, postCategory);
};

const removeCategoryFromPost = (postCategoryId) => {
	return axios.delete(
		`http://localhost:3000/categoryPostRemove/${postCategoryId}`
	);
};

const CategoryService = {
	getAll,
	create,
	deleteOne,
	addCategoryToPost,
	removeCategoryFromPost,
};

export default CategoryService;
