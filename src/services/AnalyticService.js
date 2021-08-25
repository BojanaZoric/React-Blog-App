import axios from "axios";

const getPostsByYear = (year) => {
	return axios.get(`http://localhost:3000/posts-year/${year}`);
};

const getUsersByYear = (year) => {
	return axios.get(`http://localhost:3000/authors-year/${year}`);
};

const AnalyticService = {
	getPostsByYear,
	getUsersByYear,
};

export default AnalyticService;
