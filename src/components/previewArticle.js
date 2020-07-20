import React, { Fragment, useEffect, useState, useContext } from "react";

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
} from "@material-ui/core";
import { faPenSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

//ASSETS
import event from "../img/neigbourhood.svg";

//CONTEXTS
import parentContext from "./contexts/parentContext.js";

//UTILS
import Cookies from "js-cookie";
import { paretaClient, refresh } from "../utils/paretaClient";

import SkeletonCard from "../components/ui/SkeletonCard";

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

	card: {
		width: "100%",
		minWidth: "300px",
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

	containerMain: {
		padding: "50px",
	},

	containerSecond: {
		maxWidth: "1270px",
	},
	sectionTitle: {
		fontSize: "2rem",
		fontFamily: "Montserrat",
		marginBottom: "35px",
		marginTop: "25px",
	},

	cardContainer: {
		maxWidth: "300px",
		margin: "5px 5px",
		width: "100%",
		marginBottom: "15px",
	},

	cardImage: {
		height: 0,
		paddingTop: "56.25%", // 16:9,
		marginTop: "30",
	},
	cardContent: { background: "white", minHeight: "130px" },

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
		WebkitLineClamp: 4,
		WebkitBoxOrient: "vertical",
		overflow: "hidden",
	},

	avatar: { width: 35, height: 35 },
	aGroup: {
		marginTop: "15px",
		position: "absolute",
		bottom: "0",
		marginBottom: "20px",
	},

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
}));

const ArticlePreview = () => {
	const classes = useStyles();
	const [articles, setArticles] = useState(null);

	const { randomAvatars } = useContext(parentContext);
	//GET ARTICLES
	useEffect(() => {
		const token = Cookies.get("parent-token");
		if (token) {
			refresh();
			paretaClient
				.get("/articles/preview")
				.then((res) => {
					setArticles(res);
				})
				.catch((err) => console.log(err));
		}
	}, []);

	return (
		<Fragment>
			<Grid
				direction='column'
				alignItems='center'
				container
				justify='center'
				style={{ marginBottom: "25px" }}
			>
				<Grid item xs={12} className={classes.containerMain}>
					<Grid container justify='center' style={{ maxWidth: "1270px" }}>
						<Grid item xs={12}>
							<Typography className={classes.sectionTitle}>
								Latest Experiences
							</Typography>
						</Grid>
						<Grid item xs={12} container>
							<Grid container justify='center' style={{ margin: "0, auto" }}>
								{articles !== null ? (
									articles.data.slice(0, 7).map((item, i) => {
										return (
											<Grid
												item
												container
												justify='center'
												key={item._id}
												xs={12}
												sm={6}
												md={4}
												lg={3}
												className={classes.cardContainer}
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
																className={classes.aGroup}
															>
																<Avatar
																	className={classes.avatar}
																	src={
																		randomAvatars
																			? randomAvatars[i++].picture.thumbnail
																			: null
																	}
																>
																	{item.author.name.slice(0, 1).toUpperCase()}
																</Avatar>

																<Typography className={classes.authorName}>
																	{item.author.name}
																</Typography>
															</Grid>
														</CardContent>
													</CardActionArea>
												</Card>
											</Grid>
										);
									})
								) : (
									<SkeletonCard />
								)}

								{/* Add New Article Card */}
								<Grid
									item
									className={classes.cardContainer}
									style={{ minHeight: "150px" }}
									container
									alignItems='center'
									xs={12}
									sm={6}
									md={4}
									lg={3}
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
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Fragment>
	);
};

export default ArticlePreview;
