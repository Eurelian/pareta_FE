import React, { Fragment, useState, useEffect } from "react";

//PACKAGES
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
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

//ASSETS
import event from "../img/neigbourhood.svg";

//UTILS
import Cookies from "js-cookie";
import { paretaClient, refresh } from "../utils/paretaClient";
import { handleDate } from "../utils/dateConversion";

//STYLES
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
	gridContainer: { padding: "0 20px" },
	sectionTitle: {
		fontSize: "2rem",
		fontFamily: "Montserrat",
		marginBottom: "35px",
		marginTop: "25px",
	},

	gridContainer: { marginTop: "30px" },

	container: {
		width: "100%",
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
	cardContent: { background: "white", minHeight: "200px" },

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
								Latest Events
							</Typography>
						</Grid>
						<Grid container justify='flex-start'>
							{events ? (
								events.map((item) => {
									return (
										<Grid
											item
											container
											justify='center'
											xs={3}
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
														<AvatarGroup></AvatarGroup>
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
							<Grid
								item
								className={classes.cardContainer}
								container
								alignItems='center'
								xs={3}
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
			</Grid>
		</Fragment>
	);
};

export default EventPreview;
