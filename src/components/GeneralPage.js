import React, { Fragment, useContext, useEffect, useState } from "react";

//COMPONENTS
import NavBar from "./navbar";
import Footer from "./footer";
import NearMeMap from "../utils/nearmeMap";

//UTILS
import { handleDate } from "../utils/dateConversion";
import Cookies from "js-cookie";
import { paretaClient, refresh } from "../utils/paretaClient";

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
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FadeIn from "react-fade-in";

//ASSETS
import event from "../img/neigbourhood.svg";

//utils
import SkeletonCard from "../components/ui/SkeletonCard";

//Contexts

import eventContext from "./contexts/eventContext";

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
	},

	gridContainer: { padding: "50px" },

	container: {
		maxWidth: "1270px",
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
		transition: "all 0.4s ease",
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
	cardContent: {
		background: "white",
		minHeight: "200px",
		position: "relative",
	},

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

	avatarIcon: { width: 35, height: 35 },
	aGroup: {
		marginTop: "15px",
		position: "absolute",
		bottom: "0",
		marginBottom: "20px",
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

	eventCardContainer: {},

	cardAction: {
		"& .Mui-focusVisible": {
			display: "none",
		},

		"& .MuiCardActionArea-focusHighlight": {
			background: "#8F4BD2",
		},
	},
	authorName: {
		fontFamily: "Montserrat",
		color: "#292929",
		marginLeft: "15px",
	},
}));

const EventsPage = () => {
	const classes = useStyles();

	const [page, setPage] = useState(1);

	const {
		eventData,
		setEventData,
		setEventsCreated,
		setIsCreated,
		eventsCreated,
		eventsSubscribed,
		setEventsSubscribed,
		eventSearch,
		setEventSearch,
		isResult,
		setIsResult,
		randomAvatars,
	} = useContext(eventContext);

	//SET PAGINATION
	const handleChangePage = (e, value) => {
		setPage(value);
	};

	const handleSlice = (events) => {
		const start = page === 1 ? 0 : (page - 1) * 8;
		const end = page * 8;
		return events.slice(start, end);
	};

	//Get Created Events
	useEffect(() => {
		const token = Cookies.get("parent-token");
		if (token) {
			refresh();
			paretaClient
				.get("/dashboard/events/created")
				.then((res) => {
					setEventsCreated(res.data.events_created);
					console.log(res);
				})
				.catch((err) => console.log(err));
		}
	}, [setEventsCreated]);

	//SEARCH FOR EVENT

	const handleSearchSubmit = (e) => {
		e.preventDefault();

		const token = Cookies.get("parent-token");
		if (token) {
			refresh();
			paretaClient
				.post(`/events/search`, { query: eventSearch })
				.then((res) => {
					if (res.data.length < 1) {
						console.log(isResult);
						return setIsResult(false);
					}
					setIsResult(true);
					console.log(res.data);
					setEventData(res.data);
				})
				.catch((err) => console.log(err));
		}
	};

	//GET EVENTS SUBSCRIBED
	useEffect(() => {
		const token = Cookies.get("parent-token");
		if (token) {
			refresh();
			paretaClient
				.get("dashboard/events/subscribed")
				.then((res) => {
					console.log(res.data.events_subscribed);
					setEventsSubscribed(res.data.events_subscribed);
				})
				.catch((err) => console.log(err));
		}
	}, [setEventsSubscribed]);

	return (
		<Fragment>
			<NavBar></NavBar>
			<Grid container direction='column'>
				{!eventData || eventData !== null || eventData.length > 0 ? (
					<>
						{/* CREATED EVENTS */}

						<Grid item container className={classes.gridContainer} xs={12}>
							<Grid container className={classes.container}>
								<Grid item xs={12}>
									<Typography className={classes.sectionTitle}>
										{eventsCreated !== null
											? `Create an event`
											: `Events you created`}{" "}
									</Typography>
								</Grid>
								{eventsCreated ? (
									<>
										<Grid container justify='flex-start'>
											{eventsCreated.map((item, i) => {
												return (
													<>
														<FadeIn>
															<Grid
																key={i++}
																item
																className={classes.cardContainer}
																xs={3}
															>
																<Card className={classes.card}>
																	<CardActionArea
																		className={classes.cardAction}
																		component={Link}
																		to={`/events/${item._id}`}
																	>
																		<CardMedia
																			className={classes.cardImage}
																			image={event}
																		></CardMedia>
																		<CardContent
																			className={classes.cardContent}
																		>
																			<Typography className={classes.cardDate}>
																				{handleDate(item.date)}
																			</Typography>
																			<Typography className={classes.cardTitle}>
																				{item.name}
																			</Typography>
																			<Typography
																				className={classes.cardSubtext}
																			>
																				{item.description}
																			</Typography>
																		</CardContent>
																	</CardActionArea>
																</Card>
															</Grid>
														</FadeIn>
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
													to='/new-event'
												>
													<FontAwesomeIcon
														className={classes.addIcon}
														icon={faCalendarPlus}
														size='3x'
													></FontAwesomeIcon>
												</Fab>
											</Grid>
										</Grid>
										<Grid item xs={12}>
											<div className={classes.divider}></div>
										</Grid>
									</>
								) : (
									<SkeletonCard></SkeletonCard>
								)}
							</Grid>
						</Grid>

						{/* SUBSCRIBED TO */}
						{!eventsSubscribed ||
						eventsSubscribed === null ||
						eventsSubscribed.length < 1 ? null : (
							<Grid item container className={classes.gridContainer} xs={12}>
								<Grid container className={classes.container}>
									<>
										<Grid item xs={12}>
											<Typography className={classes.sectionTitle}>
												Events You are Attending{" "}
											</Typography>
										</Grid>
										<Grid item container justify='flex-start'>
											{eventsSubscribed.map((item, i) => {
												return (
													<>
														<Grid
															key={i++}
															className={classes.cardContainer}
															xs={3}
														>
															<Card className={classes.card}>
																<CardActionArea
																	className={classes.cardAction}
																	component={Link}
																	to={`/events/${item._id}`}
																	onClick={() => setIsCreated(false)}
																>
																	<CardMedia
																		className={classes.cardImage}
																		image={event}
																	></CardMedia>
																	<CardContent className={classes.cardContent}>
																		<Typography className={classes.cardDate}>
																			{handleDate(item.date)}
																		</Typography>
																		<Typography className={classes.cardTitle}>
																			{item.name}
																		</Typography>
																		<Typography className={classes.cardSubtext}>
																			{item.description}
																		</Typography>

																		<Grid
																			container
																			alignItems='center'
																			className={classes.aGroup}
																		>
																			<Avatar
																				src={
																					randomAvatars[
																						Math.floor(Math.random() * 49) + 1
																					].picture.thumbnail
																				}
																			></Avatar>
																			<Typography
																				className={classes.authorName}
																			>
																				{item.organizer.name}
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

						{/* EVENTS NEAR USER */}
						<Grid item container className={classes.gridContainer} xs={12}>
							<Grid container className={classes.container}>
								<Grid
									item
									container
									justify='space-between'
									alignItems='center'
									xs={12}
								>
									<Typography className={classes.sectionTitle}>
										Events Near You{" "}
									</Typography>
								</Grid>
								<Grid
									item
									container
									style={{ maxHeight: "500px", marginBottom: "50px" }}
								>
									<NearMeMap></NearMeMap>
								</Grid>
							</Grid>
						</Grid>

						{/* LATEST EVENTS */}
						<Grid item container className={classes.gridContainer} xs={12}>
							<Grid container className={classes.container}>
								<Grid
									item
									container
									justify='space-between'
									alignItems='center'
									xs={12}
								>
									<Typography className={classes.sectionTitle}>
										Latest Events{" "}
									</Typography>
									<form onSubmit={(e) => handleSearchSubmit(e)}>
										<TextField
											onChange={(e) => setEventSearch(e.target.value)}
											placeholder='Search Events...'
										></TextField>
									</form>
								</Grid>
								<Grid
									item
									container
									className={classes.eventCardContainer}
									justify='flex-start'
								>
									{!isResult ? (
										<div
											style={{
												display: "flex",
												height: "400px",
												width: "100%",
												alignItems: "center",
												justifyContent: "center",
											}}
										>
											<div
												style={{
													margin: "0 auto",
													fontFamily: "Montserrat",
													fontWeight: "bold",
													opacity: "0.5",
													fontSize: "2rem",
												}}
											>
												No Events Found
											</div>
										</div>
									) : isResult && eventData ? (
										handleSlice(eventData).map((item, i) => {
											return (
												<Grid
													key={i++}
													item
													className={classes.cardContainer}
													xs={3}
												>
													<Card className={classes.card}>
														<CardActionArea
															className={classes.cardAction}
															component={Link}
															to={`/events/${item._id}`}
														>
															<CardMedia
																className={classes.cardImage}
																image={event}
															></CardMedia>
															<CardContent className={classes.cardContent}>
																<Typography className={classes.cardDate}>
																	{handleDate(item.date)}
																</Typography>
																<Typography className={classes.cardTitle}>
																	{item.name}
																</Typography>
																<Typography className={classes.cardSubtext}>
																	{item.description}
																</Typography>
																<Grid
																	container
																	alignItems='center'
																	className={classes.aGroup}
																>
																	<Avatar
																		src={
																			randomAvatars[
																				Math.floor(Math.random() * 49) + 1
																			].picture.thumbnail
																		}
																	>
																		{item.organizer.name
																			.slice(0, 1)
																			.toUpperCase()}
																	</Avatar>
																	<Typography className={classes.authorName}>
																		{item.organizer.name}
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
								</Grid>
								<Grid item container justify='center'>
									{eventData && (
										<>
											<Pagination
												count={Math.ceil(eventData.length / 8)}
												onChange={handleChangePage}
												style={{ marginTop: "35px" }}
											></Pagination>
										</>
									)}
								</Grid>
							</Grid>
						</Grid>

						{/* end */}
					</>
				) : (
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
				)}
			</Grid>
			<Footer />
		</Fragment>
	);
};

export default EventsPage;
