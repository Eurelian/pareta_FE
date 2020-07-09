import React, { Fragment } from "react";
import { Grid, Typography } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	background: {
		background: "#53237D",
		minHeight: "50px",
		marginTop: "auto",
		padding: "0 30px",
		position: "absolute",
		bottom: "0",
		display: "flex",
	},

	text: {
		color: "white",
		fontFamily: "Montserrat",
		fontSize: "0.7rem",
		opacity: "0.5",
	},
	textContainer: {
		[theme.breakpoints.down(550)]: {
			order: 2,
			marginBottom: "20px",
			marginTop: "20px",
		},
	},
	linkContainer: {
		[theme.breakpoints.down(550)]: {
			order: 3,
			marginBottom: "20px",
			marginTop: "20px",
		},
	},

	linksContainer: {
		[theme.breakpoints.down(550)]: {
			order: 1,
			grow: 1,
			marginTop: "20px",
		},
	},

	link: {
		color: "white",
		marginLeft: "30px",
		cursor: "pointer",
		fontFamily: "Montserrat",
		fontSize: "0.8rem",
		transition: "all 0.4s ease",
		textDecoration: "none",
		"&:hover": { transform: "translateY(-2px)" },
	},
}));

const Footer = () => {
	const classes = useStyles();
	return (
		<Fragment>
			<Grid
				container
				className={classes.background}
				alignItems='center'
				justify='space-between'
			>
				<Grid item className={classes.textContainer}>
					<Typography className={classes.text}>© 2020 Pareta</Typography>
				</Grid>
				<Grid item>
					<Grid container className={classes.linksContainer}>
						<Typography component={Link} to='/posts' className={classes.link}>
							Experiences
						</Typography>
						<Typography component={Link} to='/events' className={classes.link}>
							Events
						</Typography>
						<Typography component={Link} to='/parents' className={classes.link}>
							Talk
						</Typography>
					</Grid>
				</Grid>
				<Grid item className={classes.linkContainer}>
					{" "}
					<Typography className={classes.text}>
						Built by:{" "}
						<a
							href='http://sumoctavian.com'
							className={classes.link}
							style={{ marginLeft: "10px" }}
						>
							Sum Octavian
						</a>
					</Typography>
				</Grid>
			</Grid>
		</Fragment>
	);
};

export default Footer;
