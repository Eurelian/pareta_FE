import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
	divider: {
		marginTop: "20px",
		marginBottom: "50px",
		maxWidth: "250px",
		height: "3px",
		borderRadius: "200px",
		backgroundColor: "#53237D",
		boxShadow: "1px 1px 5px 1px rgba(0,0,0,0.1)",
		opacity: 0.6,
	},
}));

const DividerBar = () => {
	const classes = useStyles();

	return (
		<div>
			<div className={classes.divider}></div>{" "}
		</div>
	);
};

export default DividerBar;
