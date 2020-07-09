import React, { Fragment, useContext, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import NavBar from "./navbar";
import { Grid, TextField, Typography } from "@material-ui/core";
import Selector from "../utils/selector";
import LocationMap from "../utils/map";
import DatePicker from "../utils/date";
import DarkButton from "../components/ui/ButtonDark";
import LightButton from "../components/ui/ButtonLight";
import { Link } from "react-router-dom";
import Footer from "./footer";

//Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Context
import eventContext from "./contexts/eventContext";

const Input = withStyles((theme) => ({
	root: {
		width: "80%",
		marginTop: "15px",
		"& .MuiInput-underline:after": {
			borderWidth: "2px",
		},
		"& .MuiInput-underline:hover": {
			borderWidth: "2px",
		},
		"& label.Mui-focused": {
			fontFamily: "Raleway",
			fontSize: "1.2rem",
		},
		[theme.breakpoints.down(1058)]: {
			width: "100%",
		},
	},
}))(TextField);

const useStyles = makeStyles((theme) => ({
	container: {
		marginBottom: "25px",
		[theme.breakpoints.down("sm")]: { marginBottom: "0px" },
	},

	containerMain: {
		padding: "50px",
	},
	underMap: {
		marginBottom: "100px",
		[theme.breakpoints.down(1058)]: {
			marginTop: "100px",
			marginBottom: "50px",
		},
	},

	btn: {
		textDecoration: "none",
		maxWidth: "400px",
		padding: "20px",
		[theme.breakpoints.down(1058)]: {
			margin: "0",
			marginBottom: "10px",
		},
		[theme.breakpoints.down(1058)]: {
			margin: "0",
			marginBottom: "10px",
		},
	},
	btnContainer: {
		maxHeight: "300px",
	},
	containerSecond: {
		maxWidth: "1270px",
	},
	title: {
		fontSize: "2.5rem",

		fontFamily: "Raleway",
		fontWeight: "600",
		marginBottom: "-50px",
		color: "#39364f",
	},
	subtitle: {
		fontSize: "1.5rem",
		fontFamily: "Raleway",
		fontWeight: "600",
		color: "#39364f",
		[theme.breakpoints.down(1058)]: {
			marginTop: "50px",
		},
	},
	fieldGroup: { marginTop: "50px" },

	input: { fontFamily: "Raleway", fontSize: "2rem" },
	textArea: { fontFamily: "Montserrat", fontSize: "1rem" },
	helperText: {
		fontFamily: "Montserrat",
		fontSize: "1rem",
		paddingBottom: "10px",
	},

	map: { height: "30vh" },
}));

//Selector Controls
const ageArray = [...Array(12).keys()];
console.log(ageArray);

const CreateEvent = () => {
	const classes = useStyles();
	const {
		event,
		setEvent,
		handleEventSubmit,
		isSubmitted,
		errorMessage,
		setErrorMessage,
	} = useContext(eventContext);

	//GET TITLE, DESCRIPTION, SIZE
	const handleInput = (e) => {
		setEvent({
			...event,
			[e.target.name]: e.target.value,
		});
	};

	const handleAge = (e) => {
		setEvent({
			...event,
			age_group: { ...event.age_group, [e.target.name]: e.target.value },
		});
	};

	const getCoord = (lat, lng) => {
		setEvent({
			...event,
			location: {
				...event.location,
				lat: lat,
				lng: lng,
			},
		});
	};

	const getTime = (date) => {
		setEvent({ ...event, event_date: date });
	};

	const notify = () =>
		toast.error(`🙊${errorMessage}`, {
			position: "top-center",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	useEffect(() => {
		if (errorMessage) notify();
		setErrorMessage("");
	}, [errorMessage]);

	const CHARACTER_LIMIT_MAX = 255;

	return (
		<Fragment>
			<NavBar></NavBar>
			<ToastContainer
				position='top-right'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			<Grid
				container
				direction='column'
				alignItems='center'
				justify='center'
				className={classes.container}
			>
				<Grid item xs={12} className={classes.containerMain}>
					<Grid container justify='center' className={classes.containerSecond}>
						<Grid item xs={12} md={6}>
							<form>
								<Grid container direction='column'>
									<Grid item xs={12}>
										<Typography className={classes.title}>
											Create a New Event
										</Typography>
									</Grid>
									<Grid item xs={12} className={classes.fieldGroup}>
										<Input
											name='event_name'
											InputProps={{ className: classes.input }}
											label='Event Name'
											placeholder='Name your Event'
											onChange={handleInput}
										></Input>
									</Grid>

									<Grid item xs={12} className={classes.fieldGroup}>
										<Typography className={classes.subtitle}>
											How old should the children be?
										</Typography>
										<Grid
											container
											alignItems='flex-end'
											justify='space-around'
										>
											<Grid item xs={6} md={1}>
												<Typography className={classes.helperText}>
													From:
												</Typography>
											</Grid>
											<Grid item xs={6} md={3}>
												<Selector
													handleClick={handleAge}
													nameValue={"Years"}
													value={event.age_group.from}
													id={"from"}
													selectorValues={ageArray}
												/>
											</Grid>
											<Grid item xs={6} md={1}>
												<Typography className={classes.helperText}>
													to:
												</Typography>
											</Grid>
											<Grid item xs={6} md={3}>
												<Selector
													handleClick={handleAge}
													id={"to"}
													value={event.age_group.to}
													nameValue={"Years"}
													selectorValues={ageArray}
												/>
											</Grid>
											<Grid item xs={4}></Grid>
										</Grid>
									</Grid>
									<Grid item xs={12} className={classes.fieldGroup}>
										<Typography className={classes.subtitle}>
											How big is your event?
										</Typography>
										<Input
											name='event_size'
											label='Event Size'
											placeholder='Expected no. of participants'
											type='number'
											InputProps={{ style: { fontFamily: "Montserrat" } }}
											onChange={handleInput}
										></Input>
									</Grid>
									<Grid item xs={12} className={classes.fieldGroup}>
										<Typography className={classes.subtitle}>
											What's your event about?
										</Typography>
										<Input
											multiline
											name='event_description'
											InputProps={{ className: classes.textArea }}
											value={event.event_description}
											helperText={`${event.event_description.length}/${CHARACTER_LIMIT_MAX}`}
											rows={10}
											inputProps={{ maxLength: CHARACTER_LIMIT_MAX }}
											placeholder='Describe your event in a few words'
											variant='outlined'
											label='Event Description'
											onChange={handleInput}
										></Input>
									</Grid>
								</Grid>
							</form>
						</Grid>
						<Grid item xs={12} md={6}>
							<Grid container>
								<Grid item xs={12} style={{ height: "50vh", width: "100%" }}>
									<Typography className={classes.subtitle}>
										{" "}
										Where will the event take place?
									</Typography>

									<LocationMap getCoord={getCoord} />
								</Grid>
								<Grid item xs={12} className={classes.underMap}>
									<Typography className={classes.subtitle}>
										{" "}
										When will the event take place?
									</Typography>
									<DatePicker getTime={getTime}></DatePicker>
								</Grid>
								<Grid item xs={12}>
									<Grid
										container
										alignItems='center'
										className={classes.btnContainer}
									>
										<Grid item xs md className={classes.btn}>
											<LightButton text={"Back"}></LightButton>
										</Grid>
										<Grid item xs md className={classes.btn}>
											<div onClick={(e) => handleEventSubmit(e)}>
												<Link
													style={{ textDecoration: "none" }}
													to={isSubmitted && "/dashboard"}
												>
													<DarkButton text={"Create Event"} />
												</Link>
											</div>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>

				<Footer></Footer>
			</Grid>
		</Fragment>
	);
};

export default CreateEvent;
