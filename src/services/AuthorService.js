import axios from "axios";

const getAll = (limit, offset) => {
	return axios.get("http://localhost:3000/authors", {
		params: {
			limit: limit,
			offset: offset,
		},
	});
};

const savePost = (id) => {
	return axios.post(`http://localhost:3000/savePost/${id}`, {});
};

const unSavePost = (id) => {
	return axios.delete(`http://localhost:3000/savePost/${id}`, {});
};

const savedPosts = (limit, offset) => {
	return axios.get(`http://localhost:3000/savedPosts`, {
		params: {
			limit: limit,
			offset: offset,
		},
	});
};

const AuthorService = {
	getAll,
	savePost,
	unSavePost,
	savedPosts,
};

export default AuthorService;
