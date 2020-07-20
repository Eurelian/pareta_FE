import React, { Fragment, useContext } from "react";

//PACKAGES
import { Box, Typography, Button } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

//ASSETS
import heroMom from "../img/hero_mom_window.svg";

//CONTEXTS
import parentContext from "./contexts/parentContext";

//COMPONENTS
import Loader from "./ui/loader";

const HeroButton = withStyles((theme) => ({
	root: {
		backgroundColor: "#53237D",
		color: "#f5f5f5",
		fontWeight: "bold",
		letterSpacing: "2px",
		borderRadius: "20px",
		height: "5vh",
		marginTop: "100px",
		width: "200px",
		padding: "30px 40px",
		boxShadow: "3px 3px 10px 2px rgba(0,0,0,0.2)",
		transition: "all 0.5s ease",
		"&:hover": {
			backgroundColor: "#F5EFFB",
			transform: "translateY(-4px)",
			color: "#53237D",
		},
	},
}))(Button);

const useStyles = makeStyles((theme) => ({
	heroContainer: {
		width: "100%",
		height: "80vh",
		display: "flex",
		position: "relative",
	},
	heroImgContainer: {
		width: "60%",
		background: `url(${heroMom})`,
		backgroundSize: "cover",
		backgroundPosition: "center",
		clipPath: "polygon(0 0, 100% 0, 100% 100%, 10% 100%)",
		boxShadow: "inset 20px -15px 20px -16px rgba(83,35,125,0.3)",
		[theme.breakpoints.down(890)]: { display: "none" },

		// backgroundRepeat: "no-repeat",
		// backgroundAttachment: "fixed",
	},

	heroText: {
		marginLeft: "50px",
		width: "40%",
		display: "flex",
		justifyContent: "center",
		flexDirection: "column",
		[theme.breakpoints.down(890)]: {
			margin: 0,
			width: "100%",
			alignItems: "center",
			textAlign: "center",
		},
	},

	heroWelcome: {
		fontSize: "3.5rem",
		fontFamily: "Raleway",
		fontWeight: "800",
		lineHeight: "1.4",
		marginBottom: "30px",
		color: "#39364f",
		textShadow: "1px 2px 5px rgba(0,0,0,0.1)",
	},

	heroSub: {
		color: "#6F7287",
		marginRight: "50px",
		fontSize: "1.5rem",
		fontFamily: "Raleway",
		fontWeight: "500",

		textShadow: "1px 2px 5px rgba(0,0,0,0.1)",
		lineHeight: "1.3",
		width: "100%",
		[theme.breakpoints.down(890)]: {
			margin: 0,
			width: "80%",
			alignItems: "center",
			textAlign: "center",
		},
	},

	accentContainer: {
		position: "absolute",
		top: "25%",
		left: -100,
		alignSelf: "flex-end",
		width: "25%",
	},

	accent: {
		maxWidth: "100%",
		height: "100vh",
	},
}));

const capitalize = (str) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};

const Hero = () => {
	const classes = useStyles();
	const { loggedInParent } = useContext(parentContext);
	console.log(loggedInParent);

	if (loggedInParent)
		return (
			<Fragment>
				<Box className={classes.heroContainer}>
					<Box className={classes.heroText}>
						<Typography className={classes.heroWelcome}>
							Welcome,<br></br>
							{capitalize(loggedInParent.name)}
						</Typography>
						<Typography className={classes.heroSub}>
							{" "}
							get to connect with like minded parents in your area.
						</Typography>
						<Link to='/events' style={{ textDecoration: "none" }}>
							<HeroButton>Get started</HeroButton>
						</Link>
					</Box>
					<Box className={classes.heroImgContainer}>
						{/* <img
							className={classes.heroImg}
							src={heroMom}
							alt='woman child window'
						/> */}
					</Box>
				</Box>
			</Fragment>
		);
	else
		return (
			<div style={{ height: "100vh", width: "100%" }}>
				<Loader style={{ margin: "0 auto" }}></Loader>
			</div>
		);
};

export default Hero;
