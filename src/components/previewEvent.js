import React, { Fragment, useState, useEffect, useContext } from "react";

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
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

//ASSETS
import event from "../img/neigbourhood.svg";

//CONTEXTS
import eventContext from "./contexts/eventContext";

//UTILS
import Cookies from "js-cookie";
import { paretaClient, refresh } from "../utils/paretaClient";
import { handleDate } from "../utils/dateConversion";
import SkeletonCard from "../components/ui/SkeletonCard";

//STYLES
const useStyles = makeStyles((theme) => ({
	divider: {
		margin: "0 auto",
		marginTop: "20px",
		minWidth: "150px",
		maxWidth: "250px",
		width: "100%",
		height: "1px",
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
	container: {
		marginBottom: "25px",
		[theme.breakpoints.down("sm")]: { marginBottom: "0px" },
	},

	containerMain: {
		padding: "50px",
	},

	containerSecond: {
		maxWidth: "1270px",
	},

	cardContainer: {
		maxWidth: "300px",
		margin: "5px 5px",
		width: "100%",
		marginBottom: "15px",
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
	authorName: {
		fontFamily: "Montserrat",
		color: "#292929",
		marginLeft: "15px",
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

	cardAction: {
		"& .Mui-focusVisible": {
			display: "none",
		},

		"& .MuiCardActionArea-focusHighlight": {
			background: "#8F4BD2",
		},
	},
}));

const EventPreview = () => {
	const classes = useStyles();

	const [events, setEvents] = useState(null);

	//Get Event Data
	useEffect(() => {
		const token = Cookies.get("parent-token");
		if (token) {
			refresh();
			paretaClient
				.get("/events")
				.then((res) => {
					setEvents(res.data.slice(0, 7));
					console.log(res.data);
				})
				.catch((err) => console.log(err));
		}
	}, []);

	const { randomAvatars } = useContext(eventContext);

	return (
		<Fragment>
			<Grid
				container
				direction='column'
				alignItems='center'
				justify='center'
				className={classes.container}
			>
				<Grid item xs={12} className={classes.containerMain}>
					<Grid container justify='center' className={classes.containerSecond}>
						<Grid item xs={12}>
							<Typography className={classes.sectionTitle}>
								Latest Events
							</Typography>
						</Grid>

						<Grid container justify='center' style={{ margin: "0, auto" }}>
							{events ? (
								events.map((item, i) => {
									return (
										<Grid
											item
											container
											justify='center'
											xs={12}
											sm={6}
											md={4}
											lg={3}
											className={classes.cardContainer}
										>
											<Card className={classes.card}>
												<CardActionArea
													component={Link}
													to={`/events/${item._id}`}
													className={classes.cardAction}
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
																	randomAvatars
																		? randomAvatars[i++].picture.thumbnail
																		: null
																}
															>
																{item.organizer.name.slice(0, 1).toUpperCase()}
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

							{/* Add New Event Card */}

							<Grid
								item
								className={classes.cardContainer}
								container
								alignItems='center'
								style={{ minHeight: "150px" }}
								xs={12}
								sm={6}
								md={4}
								lg={3}
							>
								<Fab
									component={Link}
									to='/new-event'
									className={classes.addbtn}
								>
									<FontAwesomeIcon
										className={classes.addIcon}
										icon={faCalendarPlus}
										size='3x'
									></FontAwesomeIcon>
								</Fab>
							</Grid>
						</Grid>
					</Grid>
				</Grid>

				<Grid item xs={12}>
					<div className={classes.divider}></div>
				</Grid>
			</Grid>
		</Fragment>
	);
};

export default EventPreview;
