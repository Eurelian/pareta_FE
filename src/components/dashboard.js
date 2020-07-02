import React, { Fragment } from "react";
import NavBar from "./navbar";
import Hero from "./hero";
import EventPreview from "./previewEvent";
import ArticlePreview from "./previewArticle";

const Dashboard = ({ loggedInParent, parentLogout }) => {
	if (loggedInParent)
		return (
			<Fragment>
				<NavBar />
				<Hero loggedInParent={loggedInParent}></Hero>
				<EventPreview />
				<ArticlePreview />
			</Fragment>
		);
	else return <div>loading...</div>;
};

export default Dashboard;
