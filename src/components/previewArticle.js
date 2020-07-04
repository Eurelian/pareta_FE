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
	Fab,
} from "@material-ui/core";
import { faPenSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import event from "../img/neigbourhood.svg";
import { DateTime } from "luxon";
import Cookies from "js-cookie";
import { paretaClient, refresh } from "../utils/paretaClient";
import parse from "html-react-parser";

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

	sectionTitle: { fontSize: "2rem", fontFamily: "Montserrat" },

	gridContainer: { padding: "0 20px" },

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

	container: {
		width: "100%",
		maxWidth: "1270px",
		height: "auto",
		display: "flex",
		margin: "0 auto",
	},
	sectionTitle: {
		fontSize: "2rem",
		fontFamily: "Montserrat",
		marginBottom: "35px",
		marginTop: "25px",
	},

	cardContainer: {
		maxWidth: "300px",
		minWidth: "250px",

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
	AvatarGroup: {
		marginTop: "15px",
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

	useEffect(() => {
		const token = Cookies.get("parent-token");
		if (token) {
			refresh();
			paretaClient
				.get("/articles/preview")
				.then((res) => {
					setArticles(res);
					console.log(res);
				})
				.catch((err) => console.log(err));
		}
	}, []);

	return (
		<Fragment>
			<Grid container direction='column'>
				<Grid item xs={12}>
					<div className={classes.divider}></div>
				</Grid>
				<Grid item container className={classes.gridContainer} xs={12}>
					<Grid container className={classes.container}>
						<Grid item xs={12}>
							<Typography className={classes.sectionTitle}>
								Latest Experiences
							</Typography>
						</Grid>
						<Grid container justify='flex-start'>
							{articles ? (
								articles.data.map((item) => {
									return (
										<Grid
											item
											container
											justify='center'
											key={item._id}
											xs={3}
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
								<div>Loading</div>
							)}

							{/* Add New Article Card */}
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
					</Grid>
				</Grid>
			</Grid>
		</Fragment>
	);
};

export default ArticlePreview;
