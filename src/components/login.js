import React, { Fragment, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import loginImage from "../img/login.svg";
import axios from "axios";

import { Link } from "react-router-dom";

//STYLING
const SignInButton = withStyles((theme) => ({
	root: {
		backgroundColor: "#F5EFFB",
		color: "#53237D",
		fontWeight: "bold",
		letterSpacing: "2px",

		borderRadius: "20px",
		height: "5vh",
		marginTop: "50px",
		width: "70%",
		padding: "30px 40px",
		boxShadow: "3px 3px 10px 2px rgba(0,0,0,0.2)",
		transition: "all 0.5s ease",
		"&:hover": {
			backgroundColor: "#53237D",
			transform: "translateY(-4px)",
			color: "#F5EFFB",
		},
	},
}))(Button);

const SignUpButton = withStyles((theme) => ({
	root: {
		backgroundColor: "#53237D",
		color: "#f5f5f5",
		fontWeight: "bold",
		letterSpacing: "2px",

		borderRadius: "20px",
		height: "5vh",
		marginTop: "20px",
		width: "70%",
		padding: "30px 40px",

		boxShadow: "3px 3px 10px 2px rgba(0,0,0,0.2)",
		transition: "all 0.5s ease",
		"&:hover": {
			backgroundColor: "#F5EFFB",
			transform: "translateY(-4px)",
			color: "#53237D",
		},
	},
}))(Button);

const InputField = withStyles((theme) => ({
	root: { width: "70%", marginBottom: "30px", borderRadius: "20px" },
}))(TextField);

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: "550px",
		height: "700px",
		borderRadius: "25px",
		margin: "0 auto",
		flexGrow: 1,
		background:
			"linear-gradient(135deg, rgba(240,240,250,1) 0%, rgba(224,224,245,1) 100%, rgba(37,38,112,1) 0252670%)",
		[theme.breakpoints.down("sm")]: {
			margin: "20px",
		},
	},

	container: {
		width: "100%",
		height: "100vh",
		background: "grey",
		display: "flex",
		alignItems: "center",
	},

	form: {
		display: "flex",
		position: "relative",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		height: "100%",
	},

	title: {
		flexGrow: 2,
		color: "#53237D",
		alignSelf: "flex-start",
		marginTop: "20%",
		width: "80%",
		marginLeft: "60px",
		fontSize: "2rem",
		zIndex: 2,
		lineHeight: "1.3",
		marginBottom: "50px",
		fontFamily: "Raleway",
		textShadow: "1px 1px 4px rgba(0,0,0,0.1)",
	},

	subtitle: {
		flexGrow: 1,
		marginTop: "30px",
		marginBottom: "50px",
		fontSize: "0.8rem",
	},

	error: {
		flexGrow: 1,
		marginTop: "10px",
		marginBottom: "10px",
		fontSize: "0.8rem",
		color: "red",
	},

	input: { flexGrow: 2 },

	btnSignIn: { flexGrow: 1 },

	btnSignUp: { flexGrow: 1 },

	divider: { width: "200px" },

	imgContainer: {
		position: "absolute",
		top: "19%",
		left: "90%",
		transform: "translate(-50%, -50%)",
		width: "100%",
	},
	img: {
		maxWidth: "60%",
	},
}));

const Login = ({
	handleLoginData,
	handleLoginSubmit,
	errorMessage,
	loginData,
}) => {
	const classes = useStyles();

	return (
		<Fragment>
			<Box className={classes.container}>
				<Card className={classes.root}>
					<form className={classes.form}>
						<Box className={classes.imgContainer}>
							<img
								className={classes.img}
								src={loginImage}
								alt='login_img'
							></img>
						</Box>
						<Typography className={classes.title}>
							<span
								style={{
									fontSize: "3.8rem",
									fontWeight: "600",
									fontFamily: "Pacifico",
									color: "",
								}}
							>
								Welcome
							</span>
							,
							<br /> you parent you
						</Typography>
						<InputField
							id='email'
							label='E-mail'
							onChange={(e) => handleLoginData(e)}
							value={loginData.email}
						/>
						<InputField
							id='password'
							type='password'
							label='Password'
							onChange={(e) => handleLoginData(e)}
							value={loginData.password}
						/>

						<SignInButton
							className={classes.btnSignIn}
							onClick={(e) => handleLoginSubmit(e)}
							component={Link}
							to='/dashboard'
						>
							Sign In
						</SignInButton>

						<SignUpButton
							className={classes.btnSignUp}
							component={Link}
							to='/signup'
						>
							Sign Up
						</SignUpButton>
						{errorMessage && (
							<Typography className={classes.error}>{errorMessage}</Typography>
						)}
						<Typography className={classes.subtitle}>
							Forgot your password?
						</Typography>
						<Divider variant='middle' />
					</form>
				</Card>
			</Box>
		</Fragment>
	);
};

export default Login;
