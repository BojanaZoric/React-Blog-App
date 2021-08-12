const isLoggedIn = () => {
	const token = localStorage.getItem("token");

	if (token) {
		return true;
	}
	return false;
};

const Storage = {
	isLoggedIn,
};

export default Storage;
