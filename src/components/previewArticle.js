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
		WebkitLineClamp: 4,
		WebkitBoxOrient: "vertical",
		overflow: "hidden",
	},

	avatar: { width: 35, height: 35 },
	AvatarGroup: {
		marginTop: "15px",
	},
	container: { width: "100%", height: "auto", display: "flex" },
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
			<Grid container justify='center' direction='column'>
				<Grid item xs={12}>
					<div className={classes.divider}></div>
				</Grid>
				<Grid item container xs={12}>
					<Grid item xs={2}></Grid>
					<Grid item container className={classes.container} xs={8}>
						<Grid item xs={12}>
							<Typography className={classes.sectionTitle}>
								Latest Experiences
							</Typography>
						</Grid>
						<Grid item container xs={12}>
							{articles ? (
								articles.data.map((item) => {
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
								<div>Loading</div>
							)}

							{/* Add New Event Card */}
							<Grid item className={classes.cardContainer} xs={3}>
								<Card
									className={classes.cardNew}
									component={Link}
									to='/new-article'
									raised={true}
								>
									<FontAwesomeIcon
										className={classes.addIcon}
										icon={faPenSquare}
										size='3x'
									></FontAwesomeIcon>
								</Card>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={2}></Grid>
				</Grid>
			</Grid>
		</Fragment>
	);
};

export default ArticlePreview;
