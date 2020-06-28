import React, { Fragment } from "react";
import {
	Box,
	Grid,
	Typography,
	Card,
	CardContent,
	CardMedia,
	Avatar,
} from "@material-ui/core";
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import event from "../img/neigbourhood.svg";

const useStyles = makeStyles((theme) => ({
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
	container: { width: "100%", height: "auto", display: "flex" },
}));

const EventPreview = () => {
	const classes = useStyles();
	return (
		<Fragment>
			<Grid container justify='center' direction='column'>
				<Grid item xs={12}>
					<div className={classes.divider}></div>
				</Grid>
				<Grid item container xs={12}>
					<Grid item xs={2}></Grid>
					<Grid item container className={classes.container} xs={8}>
						<Grid item xs={12}>
							<Typography className={classes.sectionTitle}>Events</Typography>
						</Grid>
						<Grid item container xs={12}>
							{/* CARD */}
							<Grid item className={classes.cardContainer} xs={3}>
								<Card className={classes.card} raised={true}>
									<CardMedia
										className={classes.cardImage}
										image={event}
									></CardMedia>
									<CardContent className={classes.cardContent}>
										<Typography className={classes.cardDate}>
											MON, JUL 29, 6:00 PM
										</Typography>
										<Typography className={classes.cardTitle}>
											Neighbourhood Meet Up afsfafasf afa sfaf asf afaas faf s
										</Typography>
										<Typography className={classes.cardSubtext}>
											Let's all meet at the Palm Strasse Playground to have some
											fun{" "}
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
								</Card>
							</Grid>
							{/* CARD */}
							<Grid item className={classes.cardContainer} xs={3}>
								<Card className={classes.card} raised={true}>
									<CardMedia
										className={classes.cardImage}
										image={event}
									></CardMedia>
									<CardContent className={classes.cardContent}>
										<Typography className={classes.cardDate}>
											MON, JUL 29, 6:00 PM
										</Typography>
										<Typography className={classes.cardTitle}>
											Neighbourhood Meet Up
										</Typography>
										<Typography className={classes.cardSubtext}>
											Let's all meet at the Palm Strasse Playground to have some
											fun{" "}
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
								</Card>
							</Grid>

							{/* CARD */}
							<Grid item className={classes.cardContainer} xs={3}>
								<Card className={classes.card} raised={true}>
									<CardMedia
										className={classes.cardImage}
										image={event}
									></CardMedia>
									<CardContent className={classes.cardContent}>
										<Typography className={classes.cardDate}>
											MON, JUL 29, 6:00 PM
										</Typography>
										<Typography className={classes.cardTitle}>
											Neighbourhood Meet Up
										</Typography>
										<Typography className={classes.cardSubtext}>
											Let's all meet at the Palm Strasse Playground to have some
											fun{" "}
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
								</Card>
							</Grid>

							{/* CARD */}
							<Grid item className={classes.cardContainer} xs={3}>
								<Card className={classes.card} raised={true}>
									<CardMedia
										className={classes.cardImage}
										image={event}
									></CardMedia>
									<CardContent className={classes.cardContent}>
										<Typography className={classes.cardDate}>
											MON, JUL 29, 6:00 PM
										</Typography>
										<Typography className={classes.cardTitle}>
											Neighbourhood Meet Up
										</Typography>
										<Typography className={classes.cardSubtext}>
											Let's all meet at the Palm Strasse Playground to have some
											fun{" "}
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
								</Card>
							</Grid>
							{/* Add New Event Card */}
							<Grid item className={classes.cardContainer} xs={3}>
								<Card
									className={classes.cardNew}
									component={Link}
									to='/new-event'
									raised={true}
								>
									<FontAwesomeIcon
										className={classes.addIcon}
										icon={faCalendarPlus}
										size='3x'
									></FontAwesomeIcon>
								</Card>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={2}></Grid>
				</Grid>
			</Grid>
		</Fragment>
	);
};

export default EventPreview;
