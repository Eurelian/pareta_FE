import React, { Fragment } from "react";

//COMPONENTS
import NavBar from "./navbar";
import Hero from "./hero";
import EventPreview from "./previewEvent";
import ArticlePreview from "./previewArticle";
import Footer from "./footer";
import Loader from "./ui/loader";

const Dashboard = ({ loggedInParent, parentLogout }) => {
	if (loggedInParent)
		return (
			<Fragment>
				<NavBar />
				<Hero loggedInParent={loggedInParent}></Hero>
				<EventPreview />
				<ArticlePreview />
				<Footer></Footer>
			</Fragment>
		);
	else
		return (
			<div
				style={{
					height: "100vh",
					width: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<div>
					<Loader></Loader>
				</div>
			</div>
		);
};

export default Dashboard;
