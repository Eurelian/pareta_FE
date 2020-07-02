import React, { Fragment, useState, useEffect } from "react";
import { ThemeProvider } from "@material-ui/core";
import { Route, Switch, Redirect } from "react-router-dom";
import theme from "./components/ui/theme";

// COMPONENTS
import Login from "./components/login";
import SignUp from "./components/signup";
import Dashboard from "./components/dashboard";
import CreateEvent from "./components/createEvent";
import EventsPage from "./components/GeneralPage";
import EventDetails from "./components/EventDetails";
import ArticlePage from "./components/articlePage";
import AllPosts from "./components/posts/AllPosts";
import ParentChat from "./components/parents/parentChat";
import CreateArticle from "./components/createArticle";

//UTILS
import { paretaClient, refresh } from "./utils/paretaClient";
import ProtectedRoute from "./utils/protectedRoute";

//Contexts
import eventContext from "./components/contexts/eventContext";
import actionsContext from "./components/contexts/actionsContext";
import parentContext from "./components/contexts/parentContext";
import articleContext from "./components/contexts/articleContext";
//Authentication
import Cookies from "js-cookie";

const App = () => {
	// USER AUTHENTICATION
	const [login, setLogin] = useState({ email: "", password: "" });
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [loggedInParent, setLoggedInParent] = useState(null);
	const [signUp, setSignUp] = useState({ name: "", email: "", password: "" });
	const [errorMessage, setErrorMessage] = useState("");

	//ARTICLE DATA
	const [articles, setArticles] = useState(null);
	// const [articlePreview, setArticlePreview] = useState(null);

	//ARTICLE DATA GET

	//EVENT DATA Submit
	const [event, setEvent] = useState({
		event_name: "",
		location: { lat: 0, lng: 0 },
		event_date: new Date(),
		age_group: { from: 0, to: 0 },
		event_description: "",
		event_size: 0,
	});

	const [eventData, setEventData] = useState(null);
	const [isSubmitted, setIsSubmitted] = useState(false);

	//EVENT DATA GET
	useEffect(() => {
		const token = Cookies.get("parent-token");
		if (token) {
			refresh();
			paretaClient
				.get("/events")
				.then((res) => setEventData(res))
				.catch((err) => console.log(err));
		}
	}, []);

	//CLEAR EVENT DATA
	const clearEventData = () => {
		setEvent({
			event_name: "",
			location: { lat: 0, lng: 0 },
			event_date: new Date(),
			age_group: { from: 0, to: 0 },
			event_description: "",
			event_size: 0,
		});
	};

	//EVENT SUBMIT
	const handleEventSubmit = (e) => {
		e.preventDefault();
		const {
			event_name,
			location,
			event_date,
			age_group,
			event_description,
			event_size,
		} = event;
		const token = Cookies.get("parent-token");
		if (token) {
			refresh();
			paretaClient
				.post("/dashboard/events", {
					name: event_name,
					geometry: {
						type: "Point",
						coordinates: [location.lat, location.lng],
					},
					date: event_date,
					age_group: age_group,
					description: event_description,
					size: event_size,
				})
				.then((res) => {
					console.log(res);
					clearEventData();
					setIsSubmitted(true);
				})
				.catch((err) => {
					setErrorMessage(err.response.data);
					console.log(err.response.data);
				});
			console.log("works");
		}
	};

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
				return console.log(err.response.data);
			});
	};

	//LOGOUT PARENT
	const parentLogout = () => {
		Cookies.remove("parent-token");
		setLoggedInParent(null);
		setIsLoggedIn(false);
	};
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

	useEffect(() => {
		parentCookie();
	}, []);

	return (
		<Fragment>
			<ThemeProvider theme={theme}>
				<eventContext.Provider
					value={{
						event,
						setEvent,
						errorMessage,
						handleEventSubmit,
						isSubmitted,
						eventData,
					}}
				>
					<parentContext.Provider value={{ loggedInParent }}>
						<actionsContext.Provider value={{ parentLogout }}>
							<Switch>
								{/* Create Event */}
								<ProtectedRoute
									isLoggedIn={isLoggedIn}
									parentLogout={parentLogout}
									component={CreateEvent}
									path='/new-event'
								></ProtectedRoute>

								{/* Create Article */}
								<ProtectedRoute
									isLoggedIn={isLoggedIn}
									parentLogout={parentLogout}
									component={CreateArticle}
									path='/new-article'
								></ProtectedRoute>

								{/* Read One Article */}
								<ProtectedRoute
									isLoggedIn={isLoggedIn}
									path='/posts/:id'
									component={ArticlePage}
								></ProtectedRoute>

								{/* Render parent you want to chat with */}
								<ProtectedRoute
									isLoggedIn={isLoggedIn}
									path='/parents/:id'
									component={ParentChat}
								></ProtectedRoute>

								{/* Parent Chat Room */}
								<ProtectedRoute
									isLoggedIn={isLoggedIn}
									path='/parents/'
									component={ParentChat}
								></ProtectedRoute>
								<Route path='/parents'></Route>
								<ProtectedRoute
									isLoggedIn={isLoggedIn}
									path='/events/:id'
									component={EventDetails}
								></ProtectedRoute>

								{/* Get All Articles */}
								<ProtectedRoute
									isLoggedIn={isLoggedIn}
									path='/posts/'
									component={AllPosts}
								></ProtectedRoute>

								{/* Get All Events */}
								<ProtectedRoute
									isLoggedIn={isLoggedIn}
									path='/events'
									component={EventsPage}
								></ProtectedRoute>

								{/* Get Dashboard Data */}
								<ProtectedRoute
									isLoggedIn={isLoggedIn}
									path='/dashboard'
									loggedInParent={loggedInParent}
									parentLogout={parentLogout}
									component={Dashboard}
								></ProtectedRoute>

								{/* Register */}
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
						</actionsContext.Provider>
					</parentContext.Provider>
				</eventContext.Provider>
			</ThemeProvider>
		</Fragment>
	);
};

export default App;
