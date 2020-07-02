import React, { Fragment, useState, useContext, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import NavBar from "./navbar";
import {
	Grid,
	Box,
	TextField,
	Typography,
	useEventCallback,
} from "@material-ui/core";
import Selector from "../utils/selector";
import LocationMap from "../utils/map";
import DatePicker from "../utils/date";
import DarkButton from "../components/ui/ButtonDark";
import LightButton from "../components/ui/ButtonLight";
import { Link } from "react-router-dom";

//Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Context
import eventContext from "./contexts/eventContext";

const Input = withStyles({
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
	},
})(TextField);

const useStyles = makeStyles((theme) => ({
	container: { marginTop: "50px" },
	title: {
		fontSize: "2.5rem",
		fontFamily: "Raleway",
		fontWeight: "600",
		marginBottom: "-50px",
	},
	subtitle: { fontSize: "1.5rem", fontFamily: "Raleway", fontWeight: "600" },
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
		toast(`${errorMessage}`, {
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
	}, [errorMessage]);

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
			<Grid container>
				<Grid item xs={2}></Grid>
				<Grid className={classes.container} item xs={8}>
					<Grid container>
						<Grid item xs={6}>
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
										<Grid container alignItems='flex-end'>
											<Grid item xs={1}>
												<Typography className={classes.helperText}>
													From:
												</Typography>
											</Grid>
											<Grid item xs={3}>
												<Selector
													handleClick={handleAge}
													nameValue={"Years"}
													value={event.age_group.from}
													id={"from"}
													selectorValues={ageArray}
												/>
											</Grid>
											<Grid item xs={1}>
												<Typography className={classes.helperText}>
													to:
												</Typography>
											</Grid>
											<Grid item xs={3}>
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
											style={{ width: "40%" }}
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
											rows={8}
											placeholder='Describe your event in a few words'
											variant='outlined'
											label='Event Description'
											onChange={handleInput}
										></Input>
									</Grid>
								</Grid>
							</form>
						</Grid>
						<Grid item xs={6}>
							<Grid container>
								<Grid item xs={12} style={{ height: "50vh", width: "100%" }}>
									<Typography className={classes.subtitle}>
										{" "}
										Where will the event take place?
									</Typography>
									<LocationMap getCoord={getCoord} />
								</Grid>
								<Grid item xs={12}>
									<Typography className={classes.subtitle}>
										{" "}
										When will the event take place?
									</Typography>
									<DatePicker getTime={getTime}></DatePicker>
								</Grid>
								<Grid item xs={12} style={{ width: "80%" }}>
									<Grid container justify='space-around'>
										<Grid item xs={6} style={{ paddingLeft: "50px" }}>
											<LightButton text={"Back"}></LightButton>
										</Grid>
										<Grid item xs={6} style={{ paddingLeft: "50px" }}>
											<div onClick={(e) => handleEventSubmit(e)}>
												<Link to={isSubmitted && "/dashboard"}>
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
				<Grid item xs={2}></Grid>
			</Grid>
		</Fragment>
	);
};

export default CreateEvent;
