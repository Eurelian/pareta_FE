import React, { Fragment, useState } from "react";
import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

const MyDarkButton = withStyles((theme) => ({
	root: {
		backgroundColor: "#53237D",
		color: "#f5f5f5",
		fontWeight: "bold",
		letterSpacing: "2px",
		borderRadius: "20px",
		height: "5vh",

		width: "100%",
		padding: "30px 40px",
		boxShadow: "3px 3px 10px 2px rgba(0,0,0,0.1)",
		transition: "all 0.5s ease",
		"&:hover": {
			backgroundColor: "#F5EFFB",
			transform: "translateY(-4px)",
			boxShadow: "3px 3px 15px 2px rgba(0,0,0,0.2)",
			color: "#53237D",
		},
	},
}))(Button);

const ButtonDark = ({ text, isDisabled }) => {
	return <MyDarkButton>{text}</MyDarkButton>;
};

export default ButtonDark;
