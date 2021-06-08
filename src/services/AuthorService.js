import axios from "axios";

const getAll = (limit, offset) => {
	return axios.get("http://localhost:3000/authors", {
		params: {
			limit: limit,
			offset: offset,
		},
	});
};

const AuthorService = {
	getAll,
};

export default AuthorService;
