import React, { Fragment, useEffect, useContext } from "react";

//PACKAGES
import {
	Grid,
	Typography,
	Card,
	CardContent,
	CardMedia,
	CardActionArea,
	Avatar,
	Fab,
	TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import event from "../../img/neigbourhood.svg";
import Cookies from "js-cookie";
import { paretaClient, refresh } from "../../utils/paretaClient";
import { faPenSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FadeIn from "react-fade-in";

//COMPONENTS
import NavBar from "../navbar";
import Footer from "../footer";
import SkeletonCard from "../ui/SkeletonCard";

//CONTEXTS
import articleContext from "../contexts/articleContext";

//MUI STYLES
const useStyles = makeStyles((theme) => ({
	divider: {
		margin: "0 auto",
		marginTop: "50px",
		width: "10%",
		height: "3px",
		borderRadius: "200px",
		backgroundColor: "#53237D",
		boxShadow: "1px 1px 5px 1px rgba(0,0,0,0.1)",
	},

	sectionTitle: {
		fontSize: "2rem",
		fontFamily: "Montserrat",
		marginBottom: "35px",
		marginTop: "25px",
	},

	gridContainer: { padding: "50px", width: "100%" },

	container: {
		maxWidth: "1270px",
		width: "100%",
		height: "auto",
		display: "flex",
		margin: "0 auto",
	},

	cardContainer: {
		maxWidth: "300px",
		minWidth: "250px",
		margin: "5px 5px",
		width: "100%",
		marginBottom: "15px",
	},

	card: {
		width: "100%",
		minWidth: "250px",
		background: "#F9F2FF",
		borderRadius: "15px",
		transition: "all 0.4s ease",
		"&:hover": {
			transform: "translateY(-7px)",
			boxShadow: "2px 3px 15px 2px rgba(0,0,0,0.1)",
			zIndex: 100,
		},
	},

	addIcon: { color: "#DFACEC", transition: "all 0.3s ease" },

	cardImage: {
		height: 0,
		paddingTop: "56.25%",
		marginTop: "30",
	},
	cardContent: { background: "white", minHeight: "100px" },

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
		WebkitLineClamp: 2,
		WebkitBoxOrient: "vertical",
		overflow: "hidden",
	},

	avatar: { width: 35, height: 35 },
	AvatarGroup: {
		marginTop: "15px",
	},

	addbtn: {
		background: "#F9F2FF",
		width: "100px",
		height: "100px",
		margin: "0 auto",
		transition: "all 0.4s ease",
		boxShadow: "2px 3px 15px 2px rgba(0,0,0,0.2)",
		"&:hover $addIcon": { color: "#53237D" },
		"&:hover": {
			background: "#F9F2FF",
			transform: "translateY(-5px)",
			boxShadow: "2px 3px 20px 2px rgba(0,0,0,0.1)",
		},
	},
	authorInfo: { marginTop: "20px" },
	authorName: {
		fontFamily: "Montserrat",
		color: "#292929",
		marginLeft: "15px",
	},

	cardAction: {
		"& .Mui-focusVisible": {
			display: "none",
		},

		"& .MuiCardActionArea-focusHighlight": {
			background: "#8F4BD2",
		},
	},
}));

const AllPosts = () => {
	const classes = useStyles();

	const {
		articles,
		articleSearch,
		setArticles,
		setArticleSearch,
		articlesFavorite,
		setArticlesFavorite,
		articlesCreated,
		setArticlesCreated,
		isResult,
		setIsResult,
		randomAvatars,
	} = useContext(articleContext);

	//Get Favorite Articles done
	useEffect(() => {
		const token = Cookies.get("parent-token");
		if (token) {
			refresh();
			paretaClient
				.get(`dashboard/posts/favorite`)
				.then((res) => {
					setArticlesFavorite(res.data.articles_favorite);
					console.log(res.data.articles_favorite);
				})
				.catch((err) => console.log(err));
		}
	}, [setArticlesFavorite]);

	//SEARCH ARTICLES - done
	const handleSearchSubmit = (e) => {
		e.preventDefault();
		console.log("works");
		const token = Cookies.get("parent-token");
		if (token) {
			refresh();
			paretaClient
				.post(`articles/search`, { query: articleSearch })
				.then((res) => {
					if (res.data.length < 1) {
						console.log(isResult);
						return setIsResult(false);
					}
					setIsResult(true);
					setArticles(res.data);
				})
				.catch((err) => console.log(err));
		}
	};

	//Get Latest Articles
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
	}, [setArticles]);

	//Get Created Articles
	useEffect(() => {
		const token = Cookies.get("parent-token");
		if (token) {
			refresh();
			paretaClient
				.get(`dashboard/posts`)
				.then((res) => {
					setArticlesCreated(res.data.articles_created);
					console.log(res);
				})
				.catch((err) => console.log(err));
		}
	}, [setArticlesCreated]);

	return (
		<Fragment>
			<NavBar></NavBar>
			<Grid container direction='column'>
				{articles === null || articles.length < 1 ? (
					<>
						<Grid item container className={classes.gridContainer} xs={12}>
							<Grid container className={classes.container}>
								<SkeletonCard />
							</Grid>
						</Grid>
						<Grid item container className={classes.gridContainer} xs={12}>
							<Grid container className={classes.container}>
								<SkeletonCard />
							</Grid>
						</Grid>
					</>
				) : (
					<>
						{/* CREATED Articlees */}
						<Grid item container className={classes.gridContainer} xs={12}>
							<Grid container className={classes.container}>
								{articlesCreated ? (
									<>
										<FadeIn>
											<Grid item xs={12}>
												<Typography className={classes.sectionTitle}>
													Experiences You Shared{" "}
												</Typography>
											</Grid>
											<Grid container justify='flex-start'>
												{articlesCreated.map((item) => {
													return (
														<>
															<Grid
																key={item._id}
																item
																className={classes.cardContainer}
																xs={3}
															>
																<Card className={classes.card}>
																	<CardActionArea
																		className={classes.cardAction}
																		component={Link}
																		to={`/posts/${item._id}`}
																	>
																		<CardMedia
																			className={classes.cardImage}
																			image={event}
																		></CardMedia>
																		<CardContent
																			className={classes.cardContent}
																		>
																			<Typography className={classes.cardTitle}>
																				{item.title}
																			</Typography>
																		</CardContent>
																	</CardActionArea>
																</Card>
															</Grid>
														</>
													);
												})}
												<Grid
													item
													className={classes.cardContainer}
													container
													alignItems='center'
													xs={3}
												>
													<Fab
														className={classes.addbtn}
														component={Link}
														to='/new-article'
													>
														<FontAwesomeIcon
															className={classes.addIcon}
															icon={faPenSquare}
															size='3x'
														></FontAwesomeIcon>
													</Fab>
												</Grid>
											</Grid>
										</FadeIn>
										<Grid item xs={12}>
											<div className={classes.divider}></div>
										</Grid>
									</>
								) : null}
							</Grid>
						</Grid>

						{/* FAVORITED */}
						{articlesFavorite === null || articlesFavorite.length < 1 ? null : (
							<Grid item container className={classes.gridContainer} xs={12}>
								<Grid container className={classes.container}>
									<>
										<Grid item xs={12}>
											<Typography className={classes.sectionTitle}>
												Experiences You Liked{" "}
											</Typography>
										</Grid>
										<Grid container justify='flex-start'>
											{articlesFavorite.map((item, i) => {
												return (
													<>
														<Grid
															key={item._id}
															item
															className={classes.cardContainer}
															xs={3}
														>
															<Card className={classes.card}>
																<CardActionArea
																	className={classes.cardAction}
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
																			className={classes.authorInfo}
																		>
																			<Avatar
																				src={
																					randomAvatars
																						? randomAvatars[i++].picture
																								.thumbnail
																						: null
																				}
																			></Avatar>
																			<Typography
																				className={classes.authorName}
																			>
																				{item.author.name}
																			</Typography>
																		</Grid>
																	</CardContent>
																</CardActionArea>
															</Card>
														</Grid>
													</>
												);
											})}
										</Grid>
										<Grid item xs={12}>
											<div className={classes.divider}></div>
										</Grid>
									</>
								</Grid>
							</Grid>
						)}

						<Grid item container className={classes.gridContainer} xs={12}>
							<Grid container className={classes.container}>
								{!isResult ? (
									<div>No Articles Found</div>
								) : isResult && articles ? (
									<>
										<Grid item xs={12}>
											<Grid
												container
												justify='space-between'
												alignItems='center'
											>
												<Typography className={classes.sectionTitle}>
													Latest Experiences{" "}
												</Typography>
												<form onSubmit={(e) => handleSearchSubmit(e)}>
													<TextField
														onChange={(e) => setArticleSearch(e.target.value)}
														placeholder='Search Experience...'
													></TextField>
												</form>
											</Grid>
										</Grid>
										<Grid container justify='flex-start'>
											{articles.map((item, i) => {
												return (
													<>
														<Grid
															key={item._id}
															item
															className={classes.cardContainer}
															xs={3}
														>
															<Card className={classes.card}>
																<CardActionArea
																	className={classes.cardAction}
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
																			className={classes.authorInfo}
																		>
																			<Avatar
																				src={
																					randomAvatars
																						? randomAvatars[i++].picture
																								.thumbnail
																						: null
																				}
																			></Avatar>
																			<Typography
																				className={classes.authorName}
																			>
																				{item.author.name}
																			</Typography>
																		</Grid>
																	</CardContent>
																</CardActionArea>
															</Card>
														</Grid>
													</>
												);
											})}
										</Grid>
										<Grid item xs={12}>
											<div className={classes.divider}></div>
										</Grid>
									</>
								) : null}
							</Grid>
						</Grid>
						<Footer></Footer>
					</>
				)}
			</Grid>
		</Fragment>
	);
};

export default AllPosts;
