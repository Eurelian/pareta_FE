import React, { Fragment } from "react";
import NavBar from "./navbar";
import Hero from "./hero";
import EventPreview from "./previewEvent";

const Dashboard = ({ loggedInParent, parentLogout }) => {
	if (loggedInParent)
		return (
			<Fragment>
				<NavBar parentLogout={parentLogout} />
				<Hero loggedInParent={loggedInParent}></Hero>
				<EventPreview />
			</Fragment>
		);
	else return <div>loading...</div>;
};

export default Dashboard;
