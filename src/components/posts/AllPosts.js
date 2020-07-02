import React, { Fragment, useEffect, useState } from "react";
import NavBar from "../navbar";

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
import event from "../../img/neigbourhood.svg";
import Cookies from "js-cookie";
import { paretaClient, refresh } from "../../utils/paretaClient";

const useStyles = makeStyles({
	container: { marginTop: "50px" },
	sectionTitle: { fontSize: "2rem", fontFamily: "Montserrat" },
	wrapper: {
		width: "60%",
		margin: "0 auto",
	},

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

	gridContainer: { marginTop: "30px" },

	card: {
		width: "100%",
		background: "red",
		borderRadius: "15px",
	},

	cardNew: {
		order: "1",
		width: "100%",
		borderRadius: "15px",
		height: "160px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		transition: "all 0.4s ease",
		cursor: "pointer",
		"&:hover": { transform: "translateY(-5px)" },
		"&:hover $addIcon": { color: "#53237D" },
	},

	addIcon: { color: "#EBEBEB", transition: "all 0.3s ease" },

	cardContainer: {
		width: "100%",
		height: "auto",
		padding: "15px",
		marginBottom: "15px",
	},

	cardImage: {
		height: 0,
		paddingTop: "56.25%", // 16:9,
		marginTop: "30",
	},
	cardContent: { background: "white", height: "100%" },

	cardDate: {
		color: "#8638C9",
		fontFamily: "Montserrat",
		fontWeight: "600",
		fontSize: "1rem",
	},

	cardTitle: {
		fontFamily: "Raleway",
		fontSize: "1.2rem",
		fontWeight: "600",
		display: "-webkit-box",
		WebkitLineClamp: 2,
		WebkitBoxOrient: "vertical",
		overflow: "hidden",
	},

	cardSubtext: {
		fontFamily: "Montserrat",
		fontSize: "0.9rem",
		marginTop: "10px",
		display: "-webkit-box",
		WebkitLineClamp: 3,
		WebkitBoxOrient: "vertical",
		overflow: "hidden",
	},

	avatar: { width: 35, height: 35 },
	AvatarGroup: {
		marginTop: "15px",
	},
});

const AllPosts = () => {
	const classes = useStyles();
	const [articles, setArticles] = useState(null);
	const [favorite, setFavorite] = useState(null);
	const [created, setCreated] = useState(null);

	useEffect(() => {
		const token = Cookies.get("parent-token");
		if (token) {
			refresh();
			paretaClient
				.get(`dashboard/posts/favorite`)
				.then((res) => {
					setFavorite(res.data.articles_favorite);
				})
				.catch((err) => console.log(err));
		}
	}, []);

	useEffect(() => {
		const token = Cookies.get("parent-token");
		if (token) {
			refresh();
			paretaClient
				.get(`articles`)
				.then((res) => {
					setArticles(res.data);
				})
				.catch((err) => console.log(err));
		}
	}, []);

	useEffect(() => {
		const token = Cookies.get("parent-token");
		if (token) {
			refresh();
			paretaClient
				.get(`dashboard/posts`)
				.then((res) => {
					setCreated(res.data.articles_created);
					console.log(res.data.articles_created);
				})
				.catch((err) => console.log(err));
		}
	}, []);

	return (
		<Fragment>
			<NavBar></NavBar>
			<Grid container>
				<Grid item xs={2}></Grid>
				<Grid item xs={8} className={classes.container}>
					<Grid item xs={12} style={{ marginTop: "50px" }}>
						<Grid container>
							<Grid item xs={12}>
								<Typography className={classes.sectionTitle}>
									Your Shared Experiences{" "}
								</Typography>
							</Grid>
							<Grid item container xs={12}>
								{created ? (
									created.map((item) => {
										return (
											<Grid item className={classes.cardContainer} xs={3}>
												<Card className={classes.card} raised={true}>
													<CardActionArea
														component={Link}
														to={`/posts/${item._id}`}
													>
														<CardMedia
															className={classes.cardImage}
															image={event}
														></CardMedia>
														<CardContent className={classes.cardContent}>
															<Typography className={classes.cardTitle}>
																{item.title}
															</Typography>
														</CardContent>
													</CardActionArea>
												</Card>
											</Grid>
										);
									})
								) : (
									<div>Loading...</div>
								)}
							</Grid>
						</Grid>
					</Grid>

					<Grid item xs={12} style={{ marginTop: "50px" }}>
						<Grid container>
							<Grid item xs={12}>
								<Typography className={classes.sectionTitle}>
									Your Favorite Experiences{" "}
								</Typography>
							</Grid>
							<Grid item container xs={12}>
								{favorite ? (
									favorite.map((item) => {
										return (
											<Grid item className={classes.cardContainer} xs={3}>
												<Card className={classes.card} raised={true}>
													<CardActionArea
														component={Link}
														to={`/posts/${item._id}`}
													>
														<CardMedia
															className={classes.cardImage}
															image={event}
														></CardMedia>
														<CardContent className={classes.cardContent}>
															<Typography className={classes.cardTitle}>
																{item.title}
															</Typography>
															<Grid
																container
																alignItems='center'
																style={{ marginTop: "20px" }}
															>
																<Grid item xs={3}>
																	<Avatar className={classes.avatar} alt='Remy'>
																		{item.author.name.slice(0, 1).toUpperCase()}
																	</Avatar>
																</Grid>
																<Grid item xs={9}>
																	<Typography>{item.author.name}</Typography>
																</Grid>
															</Grid>
														</CardContent>
													</CardActionArea>
												</Card>
											</Grid>
										);
									})
								) : (
									<div>Loading...</div>
								)}
							</Grid>
						</Grid>
					</Grid>

					<Grid item xs={12} style={{ marginTop: "50px" }}>
						<Grid container>
							<Grid item xs={12}>
								<Typography className={classes.sectionTitle}>
									Latest Experiences{" "}
								</Typography>
							</Grid>
							<Grid item container xs={12}>
								{articles ? (
									articles.map((item) => {
										return (
											<Grid item className={classes.cardContainer} xs={3}>
												<Card className={classes.card} raised={true}>
													<CardActionArea
														component={Link}
														to={`/posts/${item._id}`}
													>
														<CardMedia
															className={classes.cardImage}
															image={event}
														></CardMedia>
														<CardContent className={classes.cardContent}>
															<Typography className={classes.cardTitle}>
																{item.title}
															</Typography>
															<Grid
																container
																alignItems='center'
																style={{ marginTop: "20px" }}
															>
																<Grid item xs={3}>
																	<Avatar className={classes.avatar} alt='Remy'>
																		{item.author.name.slice(0, 1).toUpperCase()}
																	</Avatar>
																</Grid>
																<Grid item xs={9}>
																	<Typography>{item.author.name}</Typography>
																</Grid>
															</Grid>
														</CardContent>
													</CardActionArea>
												</Card>
											</Grid>
										);
									})
								) : (
									<div>Loading...</div>
								)}
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={2}></Grid>
			</Grid>
		</Fragment>
	);
};

export default AllPosts;
