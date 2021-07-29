import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import axios from 'axios';

axios.interceptors.request.use(
	request => {
		const token = localStorage.getItem('token');
		if (token !== null) {
			request.headers['Authorization'] = `bearer ${token}`
		}
		return request;
	},
	error => {
		return Promise.reject(error);
	}
);

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
