import React, { Fragment, useContext, useEffect } from "react";
import NavBar from "./navbar";

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
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import event from "../img/neigbourhood.svg";
import { DateTime } from "luxon";

import parentContext from "./contexts/parentContext";
import eventContext from "./contexts/eventContext";
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

const EventsPage = () => {
	const classes = useStyles();

	const { eventData } = useContext(eventContext);
	const { loggedInParent } = useContext(parentContext);

	const subscribed = loggedInParent.events_subscribed;
	const events = eventData.data;
	const preview = events.slice(0, 7);
	console.log(subscribed);
	return (
		<Fragment>
			<NavBar></NavBar>
			<Grid container>
				<Grid item xs={2}></Grid>
				<Grid item xs={8} className={classes.container}>
					<Grid item xs={12}>
						<Grid container>
							<Grid item xs={12}>
								<Typography className={classes.sectionTitle}>
									Subscribed Events{" "}
								</Typography>
							</Grid>
							<Grid item container xs={12}>
								{loggedInParent ? (
									subscribed.map((item) => {
										return (
											<Grid item className={classes.cardContainer} xs={3}>
												<Card className={classes.card} raised={true}>
													<CardActionArea
														component={Link}
														to={`/events/${item._id}`}
													>
														<CardMedia
															className={classes.cardImage}
															image={event}
														></CardMedia>
														<CardContent className={classes.cardContent}>
															<Typography className={classes.cardDate}>
																{item.date}
															</Typography>
															<Typography className={classes.cardTitle}>
																{item.name}
															</Typography>
															<Typography className={classes.cardSubtext}>
																{item.description}
															</Typography>
															<AvatarGroup
																className={classes.AvatarGroup}
																spacing='small'
																max={3}
																classes={classes.avatar}
															>
																<Avatar className={classes.avatar} alt='Remy'>
																	B
																</Avatar>
																<Avatar className={classes.avatar} alt='Remy'>
																	B
																</Avatar>
																<Avatar className={classes.avatar} alt='Remy'>
																	B
																</Avatar>
																<Avatar className={classes.avatar} alt='Remy'>
																	B
																</Avatar>
																<Avatar className={classes.avatar} alt='Remy'>
																	B
																</Avatar>
															</AvatarGroup>
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

					<Grid item xs={12}>
						<Grid container>
							<Grid item xs={12}>
								<Typography className={classes.sectionTitle}>
									Latest Events{" "}
								</Typography>
							</Grid>
							<Grid item container xs={12}>
								{eventData ? (
									events.map((item) => {
										return (
											<Grid item className={classes.cardContainer} xs={3}>
												<Card className={classes.card} raised={true}>
													<CardActionArea
														component={Link}
														to={`/events/${item._id}`}
													>
														<CardMedia
															className={classes.cardImage}
															image={event}
														></CardMedia>
														<CardContent className={classes.cardContent}>
															<Typography className={classes.cardDate}>
																{item.date}
															</Typography>
															<Typography className={classes.cardTitle}>
																{item.name}
															</Typography>
															<Typography className={classes.cardSubtext}>
																{item.description}
															</Typography>
															<AvatarGroup
																className={classes.AvatarGroup}
																spacing='small'
																max={3}
																classes={classes.avatar}
															>
																<Avatar className={classes.avatar} alt='Remy'>
																	B
																</Avatar>
																<Avatar className={classes.avatar} alt='Remy'>
																	B
																</Avatar>
																<Avatar className={classes.avatar} alt='Remy'>
																	B
																</Avatar>
																<Avatar className={classes.avatar} alt='Remy'>
																	B
																</Avatar>
																<Avatar className={classes.avatar} alt='Remy'>
																	B
																</Avatar>
															</AvatarGroup>
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

export default EventsPage;
