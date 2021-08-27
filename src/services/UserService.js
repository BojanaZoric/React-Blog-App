import axios from "axios";

const login = (data) => {
	return axios.post("http://localhost:3000/user/login", data);
};

const profile = (data) => {
	return axios.get("http://localhost:3000/user/profile");
};

const register = (data) => {
	return axios.post("http://localhost:3000/user/register", data);
};

const myPosts = (limit, offset) => {
	return axios.get("http://localhost:3000/user/myPosts", {
		params: {
			limit: limit,
			offset: offset,
		},
	});
};

const getUserInfo = (id) => {
	return axios.get(`http://localhost:3000/user-info/${id}`);
};

const UserService = {
	login,
	register,
	profile,
	myPosts,
	getUserInfo,
};

export default UserService;
