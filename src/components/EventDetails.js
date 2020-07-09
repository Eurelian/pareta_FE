import React, { Fragment, useContext, useEffect, useState } from "react";

//COMPONENTS
import NavBar from "./navbar";
import ButtonDark from "./ui/ButtonDark";
import ButtonLight from "./ui/ButtonLight";
import ButtonRed from "./ui/ButtonRed";
import EventMap from "../utils/eventMap";
import DividerBar from "../components/ui/Divider";
import DialogAlert from "../components/ui/Dialog";
import Footer from "./footer";
import SkeletonPage from "./ui/SkeletonPage";
import { Link } from "react-router-dom";

//PACKAGES
import { useParams, useHistory } from "react-router-dom";
import { Grid, Typography, Avatar, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AvatarGroup from "@material-ui/lab/AvatarGroup";

//CONTEXTS
import eventContext from "./contexts/eventContext";

//UTILS
import { paretaClient, refresh } from "../utils/paretaClient";
import Cookies from "js-cookie";
import { handleDate } from "../utils/dateConversion";

//MUI STYLES
const useStyles = makeStyles((theme) => ({
	container: {
		marginBottom: "25px",
		// [theme.breakpoints.down("sm")]: { marginBottom: "0px" },
	},

	containerMain: {
		padding: "50px",
	},

	containerSecond: {
		maxWidth: "1270px",
		width: "100%",
	},
	title: {
		fontSize: "2.8rem",
		fontFamily: "Raleway",
		color: "#f5f5f5",
		padding: "20px 50px",
		transition: "all 0.2s ease",
		[theme.breakpoints.down(1058)]: {
			padding: "0",
			margin: "0 20px",
		},
	},
	titleContainer: {
		background: "#53237D",
		borderRadius: "20px 0 0 20px",
		boxShadow: "2px 4px 15px 2px rgba(0,0,0,0.2)",
		width: "100%",
		[theme.breakpoints.down(1058)]: {
			textAlign: "center",
			borderRadius: "20px",
		},
	},
	subtitle: {
		fontFamily: "Raleway",
		color: "#39364f",
		textAlign: "center",
		fontSize: "1rem",
		marginBottom: "5px",
	},
	subtext: {
		fontFamily: "Montserrat",
		color: "#39364f",
		marginLeft: "15px",
		textAlign: "center",
	},
	date: {
		fontFamily: "Montserrat",
		color: "#53237D",
		fontSize: "1.1rem",
		fontWeight: "bold",
	},
	sectionTitle: {
		fontFamily: "Montserrat",
		fontSize: "1.7rem",
		fontWeight: "bold",
		color: "#39364f",
		marginBottom: "25px",
	},
	section: { marginTop: "50px" },
	organizer: { fontFamily: "Montserrat", color: "#39364f", marginLeft: "15px" },
	divider: {
		margin: "0 auto",
		marginTop: "50px",
		width: "10%",
		height: "3px",
		borderRadius: "200px",
		backgroundColor: "#53237D",
		boxShadow: "1px 1px 5px 1px rgba(0,0,0,0.1)",
	},
	description: {
		overflowWrap: "break-word",
		paddingRight: "25px",
		fontSize: "1.2rem",
		color: "#6F7287",
		lineHeight: "1.6",
	},
	btnContainer: {
		maxWidth: "350px",
		margin: "0 auto",
		[theme.breakpoints.down(1058)]: {
			order: 5,
			marginTop: "50px",
		},
	},
	mapContainer: {
		// maxWidth: "350px",
		width: "100%",
		maxHeight: "400px",
		margin: "0 auto",
	},
	background: {
		maxWidth: "1270px",
		width: "100%",
		padding: "30px 50px",
		borderRadius: "20px",
		boxShadow: "2px 2px 20px 2px rgba(0,0,0,0.1)",
		marginBottom: "150px",
	},
}));

const EventDetails = () => {
	const history = useHistory();
	const { id } = useParams();
	const classes = useStyles();
	const {
		setEventsSubscribed,
		setIsCreated,
		isCreated,

		singleEvent,
		setSingleEvent,
		randomAvatars,
	} = useContext(eventContext);

	const [isSubscribed, setIsSubscribed] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [isFull, setIsFull] = useState(false);

	const dialogToggle = () => {
		setIsOpen(!isOpen);
	};

	const handleFavorite = () => {
		const token = Cookies.get("parent-token");
		if (token) {
			refresh();
			paretaClient
				.post(`/dashboard/favorite-parent`, { id: singleEvent.organizer._id })
				.then((res) => {
					history.push("/parents");
				})
				.catch((err) => console.log(err));
		}
	};

	//EVENT SINGLE GET
	useEffect(() => {
		const token = Cookies.get("parent-token");
		if (token) {
			paretaClient
				.get(`events/${id}`)
				.then((res) => {
					setSingleEvent(res.data);
					if (res.data.attending.length === res.data.size) setIsFull(true);
					else setIsFull(false);
					console.log(res.data);
				})
				.catch((err) => console.log(err));
		}
	}, [id]);

	//EVENT IS SUBSCRIBED GET
	useEffect(() => {
		const token = Cookies.get("parent-token");
		if (token) {
			paretaClient
				.get(`dashboard/events/subscribed/${id}`)
				.then((res) => {
					setIsSubscribed(res.data);
				})
				.catch((err) => console.log(err));
		}
	}, [id]);

	//EVENT IS CREATED GET
	useEffect(() => {
		const token = Cookies.get("parent-token");
		if (token) {
			paretaClient
				.get(`dashboard/events/created/${id}`)
				.then((res) => {
					setIsCreated(true);
				})
				.catch((err) => console.error(err));
		}
	}, [id]);

	//EVENT SUBSCRIBE POST
	const handleEventSubscribe = () => {
		const token = Cookies.get("parent-token");
		if (token) {
			paretaClient
				.post("/events/subscribe", { id: id })
				.then((res) => {
					setIsSubscribed(true);
					setEventsSubscribed(res.data.events_subscribed);
				})
				.catch((err) => console.log(err));
		}
	};

	//EVENT DELETE

	const handleEventDelete = () => {
		const token = Cookies.get("parent-token");
		if (token) {
			paretaClient
				.delete(`/events/${id}`)
				.then((res) => {
					setIsCreated(res.data.events_created);
					history.push("/events");
				})
				.catch((err) => console.log(err));
		}
	};

	//EVENT UNSUBSCRIBE
	const handleEventUnsubscribe = () => {
		const token = Cookies.get("parent-token");
		if (token) {
			refresh();
			paretaClient
				.delete(`dashboard/events/${id}`)
				.then((res) => {
					setIsSubscribed(false);
					setEventsSubscribed(res.data.events_subscribed);
				})
				.catch((err) => console.log(err));
		}
	};

	return (
		<Fragment>
			<NavBar></NavBar>
			<DialogAlert
				open={isOpen}
				handleOpen={dialogToggle}
				handleDelete={handleEventDelete}
			></DialogAlert>
			<Grid
				container
				direction='column'
				alignItems='center'
				justify='center'
				className={classes.container}
			>
				<Grid item xs={12} className={classes.containerMain}>
					<Grid container justify='center' className={classes.containerSecond}>
						<Paper className={classes.background}>
							{singleEvent === null || singleEvent.length < 1 ? (
								<>
									{" "}
									<SkeletonPage />
								</>
							) : (
								<>
									<Grid item xs={12}>
										<Grid container alignItems='center' wrap='wrap'>
											<Grid
												item
												xs={12}
												md={8}
												container
												wrap='wrap'
												className={classes.titleContainer}
											>
												<Typography className={classes.title}>
													{singleEvent.name}
												</Typography>
											</Grid>
											<Grid
												item
												xs={12}
												md={4}
												container
												wrap='wrap'
												className={classes.mapContainer}
											>
												<EventMap
													coord={singleEvent.geometry.coordinates}
												></EventMap>
											</Grid>
										</Grid>
									</Grid>

									<Grid item xs={12}>
										<Grid container wrap='wrap'>
											<Grid item xs={12} md={8}>
												<Grid container>
													<Grid item xs={12}>
														<DividerBar></DividerBar>
													</Grid>
													<Grid item xs={12}>
														<Typography className={classes.sectionTitle}>
															Details
														</Typography>
														<Typography className={classes.description}>
															{singleEvent.description}
														</Typography>
													</Grid>
												</Grid>
											</Grid>
											<Grid item xs={12} md={4}>
												<Grid item xs={12}>
													<Grid
														container
														direction='column'
														alignItems='center'
													>
														{isCreated ? (
															<Grid item className={classes.btnContainer}>
																<div onClick={dialogToggle}>
																	<ButtonRed text={"Delete Event"}></ButtonRed>
																</div>
															</Grid>
														) : (
															<Grid item className={classes.btnContainer}>
																{isSubscribed ? (
																	<div onClick={() => handleEventUnsubscribe()}>
																		<ButtonLight
																			text={"Don't Attend"}
																		></ButtonLight>
																	</div>
																) : (
																	<div
																		style={{
																			display: `${isFull ? "none" : null}`,
																		}}
																		onClick={() => handleEventSubscribe()}
																	>
																		<ButtonDark text={"Attend"}></ButtonDark>
																	</div>
																)}
															</Grid>
														)}

														<Grid item xs={12} className={classes.section}>
															<Typography className={classes.date}>
																{" "}
																{handleDate(singleEvent.date)}
															</Typography>
														</Grid>
														<Grid item xs={12} className={classes.section}>
															<Typography className={classes.subtitle}>
																Hosted by
															</Typography>
															<Grid
																container
																alignItems='center'
																onClick={() => handleFavorite()}
																component={Link}
															>
																<Avatar
																	size='xs'
																	src={randomAvatars[0].picture.thumbnail}
																></Avatar>
																<Typography className={classes.organizer}>
																	{singleEvent.organizer.name}
																</Typography>
															</Grid>
														</Grid>
														<Grid item xs={12} className={classes.section}>
															<Typography className={classes.subtitle}>
																Attending
															</Typography>
															<AvatarGroup max={3}>
																{singleEvent.attending &&
																	singleEvent.attending.map((item, i) => (
																		<Avatar
																			key={i++}
																			src={
																				randomAvatars[
																					Math.floor(Math.random() * 49) + 1
																				].picture.thumbnail
																			}
																		>
																			{item.name.slice(0, 1).toUpperCase()}
																		</Avatar>
																	))}
															</AvatarGroup>
														</Grid>
														<Grid item xs={12} className={classes.section}>
															<Typography className={classes.subtitle}>
																Children Age Group
															</Typography>
															<Typography className={classes.subtext}>
																{singleEvent.age_group[0].from} -{" "}
																{singleEvent.age_group[0].to} years
															</Typography>
														</Grid>
														<Grid item xs={12} className={classes.section}>
															<Typography className={classes.subtitle}>
																Event Size
															</Typography>
															<Typography className={classes.subtext}>
																{singleEvent.size} spots
															</Typography>
														</Grid>
														<Grid item xs={12} className={classes.section}>
															<Typography className={classes.subtitle}>
																Places Left
															</Typography>
															<Typography className={classes.subtext}>
																{singleEvent.size -
																	singleEvent.attending.length <
																0
																	? "Fully Booked"
																	: singleEvent.size -
																	  singleEvent.attending.length}{" "}
															</Typography>
														</Grid>
													</Grid>
												</Grid>
											</Grid>
										</Grid>
									</Grid>
								</>
							)}
						</Paper>
					</Grid>
				</Grid>

				<Footer></Footer>
			</Grid>
		</Fragment>
	);
};

export default EventDetails;
