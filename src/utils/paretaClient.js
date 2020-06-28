import axios from "axios";
import Cookies from "js-cookie";

if (process.env.NODE_ENV === "development") {
	axios.defaults.baseURL = process.env.REACT_APP_BACKEND_API_LOCAL;
} else {
	axios.defaults.bseURL = process.env.REACT_APP_BACKEND_API;
}

const refresh = () => {
	const token = Cookies.get("parent-token");

	if (token) {
		axios.defaults.headers.common["auth-token"] = token;
	}
};

export { axios as paretaClient, refresh };
