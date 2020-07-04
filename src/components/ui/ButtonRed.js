import React, { Fragment, useState } from "react";
import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

const MyRedButton = withStyles((theme) => ({
	root: {
		backgroundColor: "#ff9494",
		color: "white",
		fontWeight: "bold",
		letterSpacing: "1px",
		width: "100%",
		borderRadius: "20px",
		height: "5vh",

		padding: "30px 40px",
		boxShadow: "3px 3px 10px 2px rgba(0,0,0,0.1)",
		transition: "all 0.5s ease",
		"&:hover": {
			backgroundColor: "#FF1F1F",
			transform: "translateY(-4px)",
			boxShadow: "3px 3px 15px 2px rgba(0,0,0,0.2)",
			letterSpacing: "1.8px",
			color: "#F5EFFB",
		},
	},
}))(Button);

const ButtonRed = ({ text }) => {
	return <MyRedButton>{text}</MyRedButton>;
};

export default ButtonRed;
