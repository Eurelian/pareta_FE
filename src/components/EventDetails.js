import React, { Fragment, useContext, useEffect } from "react";
import NavBar from "./navbar";
import { useParams } from "react-router-dom";
import eventContext from "./contexts/eventContext";
import { Grid, Typography, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ButtonDark from "./ui/ButtonDark";
import { paretaClient, refresh } from "../utils/paretaClient";
import Cookies from "js-cookie";
import AvatarGroup from "@material-ui/lab/AvatarGroup";

const useStyles = makeStyles((theme) => ({
	container: { height: "auto" },
	title: { fontSize: "3rem", fontFamily: "Raleway" },
	description: { overflowWrap: "break-word" },
}));

const EventDetails = () => {
	const { id } = useParams();

	//EVENT SUBSCRIBE
	const handleEventSubscribe = () => {
		const token = Cookies.get("parent-token");
		if (token) {
			paretaClient
				.post("/events/subscribe", { id: id })
				.then((res) => console.log(res))
				.catch((err) => console.log(err));
		}
	};

	const classes = useStyles();
	const { eventData } = useContext(eventContext);
	const events = eventData.data;
	const event = events.filter((item) => item._id === id);
	console.log(event);
	return (
		<Fragment>
			<NavBar></NavBar>
			{eventData ? (
				<Grid container className={classes.container}>
					<Grid item xs={2}></Grid>
					<Grid item xs={8}>
						<Grid container style={{ marginTop: "150px" }}>
							<Grid item xs={12}>
								<Grid container alignItems='center'>
									<Grid item xs={8}>
										<Typography className={classes.title}>
											{event[0].name}
										</Typography>
									</Grid>
									<Grid item xs={4}>
										<div onClick={() => handleEventSubscribe()}>
											<ButtonDark text={"Attend"}></ButtonDark>
										</div>
									</Grid>
								</Grid>
							</Grid>

							<Grid item xs={12}>
								<Grid container wrap='wrap'>
									<Grid item xs={8}>
										<Grid container wrap='wrap'>
											<Grid item xs={12}>
												<Typography className={classes.description}>
													{event[0].description}
												</Typography>
											</Grid>
										</Grid>
									</Grid>
									<Grid item xs={4}>
										<Grid container wrap='wrap'>
											<Grid item xs={12}>
												{" "}
												Map{" "}
											</Grid>
											<Grid item xs={12}>
												{event[0].date}
											</Grid>
											<Grid item xs={12}>
												{event[0].organizer.name}
											</Grid>
											<Grid item xs={12}>
												<Typography>Attending</Typography>
												<AvatarGroup max={3}>
													{event[0].attending.map((item) => (
														<Avatar>
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
