import React, { Fragment, useContext } from "react";
import { Box, Typography, Button } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import heroMom from "../img/hero_mom_window.svg";
import flowerAccent from "../img/flower_accent.svg";

import parentContext from "./contexts/parentContext";

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
		marginLeft: "15%",
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
	heroContainer: { width: "100%", display: "flex", position: "relative" },
	heroImgContainer: {
		width: "50%",
		position: "relative",
	},

	heroImg: {
		maxWidth: "100%",
		height: "100vh",
	},

	heroText: {
		width: "50%",
		display: "flex",
		justifyContent: "center",
		flexDirection: "column",
	},

	heroWelcome: {
		fontSize: "3.2rem",
		fontFamily: "Raleway",
		fontWeight: "800",
		lineHeight: "1.2",
		textShadow: "1px 2px 5px rgba(0,0,0,0.2)",
	},

	heroSub: {
		marginLeft: "15%",
		marginRight: "50px",
		fontSize: "2rem",
		fontFamily: "Raleway",
		fontWeight: "500",
		lineHeight: "1.2",
		textShadow: "1px 2px 5px rgba(0,0,0,0.2)",
		lineHeight: "1.3",
		width: "60%",
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
						<Typography className={classes.heroSub}>
							<span className={classes.heroWelcome}>
								{`Welcome ${capitalize(loggedInParent.name)}`},
							</span>
							<br />
							get to connect with like minded parents in your area.
						</Typography>
						<HeroButton>Get started</HeroButton>
					</Box>
					<Box className={classes.heroImgContainer}>
						<img
							className={classes.heroImg}
							src={heroMom}
							alt='woman child window'
						/>
					</Box>
				</Box>
			</Fragment>
		);
	else return <div>Loading...</div>;
};

export default Hero;
