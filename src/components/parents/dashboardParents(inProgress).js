import React, { Fragment, useEffect, useState } from "react";
import {
	Box,
	Grid,
	Typography,
	Card,
	CardContent,
	CardMedia,
	CardActionArea,
	Avatar,
} from "@material-ui/core";

import AvatarGroup from "@material-ui/lab/AvatarGroup";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import Cookies from "js-cookie";
import { paretaClient, refresh } from "../utils/paretaClient";
import parse from "html-react-parser";

const useStyles = makeStyles((theme) => ({
	container: { width: "100%", height: "auto", display: "flex" },
	divider: {
		margin: "0 auto",
		marginTop: "50px",
		width: "10%",
		height: "3px",
		borderRadius: "200px",
		backgroundColor: "#53237D",
		boxShadow: "1px 1px 5px 1px rgba(0,0,0,0.1)",
	},

	sectionTitle: { fontSize: "2rem", fontFamily: "Montserrat" },

	avatar: { width: 35, height: 35 },
	AvatarGroup: {
		marginTop: "15px",
	},
}));

const DashboardParents = () => {
	const classes = useStyles();

	return (
		<Fragment>
			<Grid container justify='center' direction='column'>
				<Grid item xs={12}>
					<div className={classes.divider}></div>
				</Grid>
				<Grid item container xs={12}>
					<Grid item xs={2}></Grid>
					<Grid item container className={classes.container} xs={8}>
						<Grid item xs={12}>
							<Typography className={classes.sectionTitle}>
								Helpful Parents in You Area
							</Typography>
						</Grid>
						<Grid item container xs={12}>
							<Grid item xs={4}></Grid>
						</Grid>
					</Grid>
					<Grid item xs={2}></Grid>
				</Grid>
			</Grid>
		</Fragment>
	);
};

export default ArticlePreview;
