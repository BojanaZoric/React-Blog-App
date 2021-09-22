import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import axios from "axios";

axios.interceptors.request.use(
	(request) => {
		const token = localStorage.getItem("token");
		if (token !== null) {
			request.headers["Authorization"] = `bearer ${token}`;
		}
		return request;
	},
	(error) => {
		return Promise.reject(error);
	}
);

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);
