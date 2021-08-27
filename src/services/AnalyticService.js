import axios from "axios";

const getPostsByYear = (year) => {
	return axios.get(`http://localhost:3000/posts-year/${year}`);
};

const getUsersByYear = (year) => {
	return axios.get(`http://localhost:3000/authors-year/${year}`);
};

const getPostsStatistic = () => {
	return axios.get(`http://localhost:3000/post-statistic`);
};

const getUserStatistic = () => {
	return axios.get(`http://localhost:3000/author-statistic`);
};

const AnalyticService = {
	getPostsByYear,
	getUsersByYear,
	getPostsStatistic,
	getUserStatistic,
};

export default AnalyticService;
