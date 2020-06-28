import React, { Fragment, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import NavBar from "./navbar";
import { Grid, Box, TextField, Typography } from "@material-ui/core";
import Selector from "../utils/selector";
import LocationMap from "../utils/map";
import DatePicker from "../utils/date";

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

	const [event, setEvent] = useState({
		event_name: "",
		age: { from: 0, to: 0 },
		event_size: 0,
		event_description: "",
		event_location: null,
		event_date: null,
	});

	const handleInput = (e) => {
		setEvent({
			...event,
			[e.target.name]: e.target.value,
			age: { ...event.age, [e.target.name]: e.target.value },
		});
		console.log(event);
	};

	const getCoord = (lat, lng) => {
		setEvent({
			...event,
			location: { ...event.location, lat: lat, lng: lng },
		});
		console.log(event);
	};

	const getTime = (date) => {
		setEvent({ ...event, event_date: date });
		console.log(event);
	};

	return (
		<Fragment>
			<NavBar></NavBar>
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
													handleClick={handleInput}
													nameValue={"Years"}
													value={event.age.from}
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
													handleClick={handleInput}
													id={"to"}
													value={event.age.to}
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
								<Grid item xs={12} style={{ height: "50vh", width: "80%" }}>
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
