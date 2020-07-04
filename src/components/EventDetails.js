import React, { Fragment, useContext, useEffect, useState } from "react";
import NavBar from "./navbar";
import { useParams, useHistory } from "react-router-dom";
import eventContext from "./contexts/eventContext";
import { Grid, Typography, Avatar, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ButtonDark from "./ui/ButtonDark";
import ButtonLight from "./ui/ButtonLight";
import ButtonRed from "./ui/ButtonRed";
import EventMap from "../utils/eventMap";

import { paretaClient, refresh } from "../utils/paretaClient";
import Cookies from "js-cookie";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import { handleDate } from "../utils/dateConversion";
import DividerBar from "../components/ui/Divider";

import DialogAlert from "../components/ui/Dialog";

const useStyles = makeStyles((theme) => ({
	container: {
		height: "auto",
		background: "#F9F2FF",
		width: "100%",
		minHeight: "100vh",
		backgroundSize: "cover",
		backgroundAttachment: "fixed",
		backgroundPosition: "center center",
		backgroundRepeat: "no-repeat",
	},
	title: { fontSize: "3rem", fontFamily: "Raleway", color: "#39364f" },
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
	btnContainer: { maxWidth: "350px", margin: "0 auto" },
	mapContainer: {
		maxWidth: "350px",
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
		eventsSubscribed,
		singleEvent,
		setSingleEvent,
	} = useContext(eventContext);

	const [isSubscribed, setIsSubscribed] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const dialogToggle = () => {
		setIsOpen(!isOpen);
	};

	//EVENT SINGLE

	useEffect(() => {
		const token = Cookies.get("parent-token");
		if (token) {
			paretaClient
				.get(`events/${id}`)
				.then((res) => {
					setSingleEvent(res.data);
					console.log(res.data);
				})
				.catch((err) => console.log(err));
		}
	}, []);

	//EVENT IS SUBSCRIBED
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
	}, []);

	//EVENT IS CREATED
	useEffect(() => {
		const token = Cookies.get("parent-token");
		if (token) {
			paretaClient
				.get(`dashboard/events/created/${id}`)
				.then((res) => {
					setIsCreated(true);
					console.log(isCreated);
				})
				.catch((err) => console.log(err));
		}
	}, []);

	//EVENT SUBSCRIBE
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
			{singleEvent ? (
				<Grid container className={classes.container}>
					<Grid item xs={2}></Grid>
					<Grid item xs={8}>
						<Grid
							container
							style={{ marginTop: "150px", maxWidth: "1270px", width: "100%" }}
						>
							<Paper className={classes.background}>
								<Grid item xs={12}>
									<Grid container alignItems='center' wrap='wrap'>
										<Grid item xs container wrap='wrap'>
											<Typography className={classes.title}>
												{singleEvent.name}
											</Typography>
										</Grid>
										<Grid
											item
											xs
											container
											wrap='wrap'
											className={classes.mapContainer}
										>
											<EventMap></EventMap>
										</Grid>
									</Grid>
								</Grid>

								<Grid item xs={12}>
									<Grid container wrap='wrap'>
										<Grid item xs={8}>
											<Grid container>
												<Grid item xs={12}>
													<DividerBar></DividerBar>
												</Grid>
												<Grid item xs={12}>
													<Typography className={classes.description}>
														{singleEvent.description}
													</Typography>
												</Grid>
											</Grid>
										</Grid>
										<Grid item xs={4}>
											<Grid item xs={12}>
												<Grid container wrap='wrap'>
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
																<div onClick={() => handleEventSubscribe()}>
																	<ButtonDark text={"Attend"}></ButtonDark>
																</div>
															)}
														</Grid>
													)}

													<Grid item xs={12}>
														{handleDate(singleEvent.date)}
													</Grid>
													<Grid item xs={12}>
														{singleEvent.organizer.name}
													</Grid>
													<Grid item xs={12}>
														<Typography>Attending</Typography>
														<AvatarGroup max={3}>
															{singleEvent.attending &&
																singleEvent.attending.map((item, i) => (
																	<Avatar key={i++}>
																		{item.name.slice(0, 1).toUpperCase()}
																	</Avatar>
																))}
														</AvatarGroup>
													</Grid>
												</Grid>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
							</Paper>
						</Grid>
					</Grid>
					<Grid item xs={2}></Grid>
				</Grid>
			) : (
				<div>Loading...</div>
			)}
		</Fragment>
	);
};

export default EventDetails;
