import React, { Fragment, useState, useEffect } from "react";
import { ThemeProvider } from "@material-ui/core";
import { Route, Switch, Redirect } from "react-router-dom";
import theme from "./components/ui/theme";
import Login from "./components/login";
import SignUp from "./components/signup";
import Dashboard from "./components/dashboard";
import CreateEvent from "./components/createEvent";
import { paretaClient, refresh } from "./utils/paretaClient";
import ProtectedRoute from "./utils/protectedRoute";

//Authentication
import Cookies from "js-cookie";

const App = () => {
	const [login, setLogin] = useState({ email: "", password: "" });
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [loggedInParent, setLoggedInParent] = useState(null);
	const [errorMessage, setErrorMessage] = useState("");

	const [signUp, setSignUp] = useState({ name: "", email: "", password: "" });

	//LOGIN PARENT
	const cleanLoginData = () => {
		setLogin({ email: "", password: "" });
	};

	const handleLoginData = (e) => {
		setLogin({ ...login, [e.target.id]: e.target.value });
	};

	const handleLoginSubmit = (e) => {
		const { email, password } = login;
		e.preventDefault();
		paretaClient
			.post("/login", {
				email: email,
				password: password,
			})
			.then((res) => {
				const token = res.data;
				if (!token) return setErrorMessage("Ooooopsie Doopsie");
				Cookies.set("parent-token", token);
				refresh();
				cleanLoginData();
				setIsLoggedIn(true);
			})
			.catch((err) => {
				return setErrorMessage(err.response.data);
			});
	};

	//LOGOUT PARENT

	//REGISTER PARENT
	const handleSignUp = (e) => {
		setSignUp({ ...signUp, [e.target.id]: e.target.value });
	};

	const handleSignUpSubmit = (e) => {
		e.preventDefault();
		const { name, email, password } = signUp;
		paretaClient
			.post("/register", {
				name: name,
				email: email,
				password: password,
			})
			.then((res) => console.log(res))
			.catch((err) => console.log(err.message));
		setSignUp({ name: "", email: "", password: "" });
	};

	//CHECK FOR TOKEN GET LOGGED IN PARENT DATA
	useEffect(() => {
		const token = Cookies.get("parent-token");
		if (token) {
			refresh();
			paretaClient
				.get("/dashboard")
				.then((res) => setLoggedInParent(res.data))
				.catch((err) => console.log(err), setLoggedInParent(null));
		} else setLoggedInParent(null);
	}, [isLoggedIn]);

	//Handle Cookie Persistance
	const parentCookie = () => {
		const cookie = Cookies.get("parent-token");
		if (cookie) {
			setIsLoggedIn(true);
		}
	};

	const parentLogout = () => {
		Cookies.remove("parent-token");
		setLoggedInParent(null);
		setIsLoggedIn(false);
	};

	useEffect(() => {
		parentCookie();
	}, []);

	return (
		<Fragment>
			<ThemeProvider theme={theme}>
				<Switch>
					<ProtectedRoute
						isLoggedIn={isLoggedIn}
						parentLogout={parentLogout}
						component={CreateEvent}
						path='/new-event'
					></ProtectedRoute>
					<Route path='/posts'></Route>
					<Route path='/parents'></Route>
					<Route path='/events'></Route>
					<ProtectedRoute
						isLoggedIn={isLoggedIn}
						path='/dashboard'
						loggedInParent={loggedInParent}
						parentLogout={parentLogout}
						component={Dashboard}
					></ProtectedRoute>
					<Route
						path='/signup'
						render={(props) => (
							<SignUp
								{...props}
								handleSignUp={handleSignUp}
								handleSignUpSubmit={handleSignUpSubmit}
							/>
						)}
					/>
					<Route
						exact
						path='/'
						render={() =>
							isLoggedIn ? (
								<Redirect to='/dashboard' />
							) : (
								<Login
									handleLoginData={handleLoginData}
									handleLoginSubmit={handleLoginSubmit}
									errorMessage={errorMessage}
									loginData={login}
								/>
							)
						}
					></Route>
				</Switch>
			</ThemeProvider>
		</Fragment>
	);
};

export default App;
