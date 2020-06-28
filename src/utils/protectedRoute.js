import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				isLoggedIn === true ? (
					<Component {...props} {...rest} />
				) : (
					<Redirect to='/'></Redirect>
				)
			}
		></Route>
	);
};

export default ProtectedRoute;
