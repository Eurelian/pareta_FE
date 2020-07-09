import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

const MyLightButton = withStyles((theme) => ({
	root: {
		backgroundColor: "#F5EFFB",
		color: "#53237D",
		fontWeight: "bold",
		letterSpacing: "2px",
		width: "100%",
		borderRadius: "20px",
		height: "5vh",

		padding: "30px 40px",
		boxShadow: "3px 3px 10px 2px rgba(0,0,0,0.1)",
		transition: "all 0.5s ease",
		"&:hover": {
			backgroundColor: "#53237D",
			transform: "translateY(-4px)",
			boxShadow: "3px 3px 15px 2px rgba(0,0,0,0.2)",
			color: "#F5EFFB",
		},
	},
}))(Button);

const ButtonDark = ({ text }) => {
	return <MyLightButton>{text}</MyLightButton>;
};

export default ButtonDark;
