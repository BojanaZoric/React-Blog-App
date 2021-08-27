const logIn = (user) => {
	if (user && user["token"]) {
		localStorage.setItem("token", user["token"]);
		localStorage.setItem("user", JSON.stringify(user));
		return true;
	}
	return false;
};

const isLoggedIn = () => {
	const token = localStorage.getItem("token");

	if (token) {
		return true;
	}
	return false;
};

const logOut = () => {
	localStorage.removeItem("token");
	localStorage.removeItem("user");
};

const getRole = () => {
	const user = JSON.parse(localStorage.getItem("user"));
	return user["role"];
};

const getUsername = () => {
	const user = JSON.parse(localStorage.getItem("user"));
	return user["username"];
};

const Storage = {
	logIn,
	isLoggedIn,
	getRole,
	getUsername,
	logOut,
};

export default Storage;
