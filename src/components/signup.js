import React, { Fragment, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import loginImage from "../img/login.svg";
import axios from "axios";
import { Link } from "react-router-dom";

//STYLING
const BackToLogin = withStyles((theme) => ({
	root: {
		backgroundColor: "#F5EFFB",
		color: "#53237D",
		fontWeight: "bold",
		letterSpacing: "2px",
		width: "500px",
		borderRadius: "20px",
		height: "5vh",
		marginTop: "50px",
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

const Register = withStyles((theme) => ({
	root: {
		backgroundColor: "#53237D",
		color: "#f5f5f5",
		fontWeight: "bold",
		letterSpacing: "2px",
		borderRadius: "20px",
		height: "5vh",
		marginTop: "50px",
		width: "500px",
		padding: "30px 40px",
		marginLeft: "20px",
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
	root: { width: "50%", marginBottom: "30px", borderRadius: "20px" },
}))(TextField);

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		justifyContent: "flex-start",
		alignItems: "center",
		width: "80%",
		height: "80vh",
		borderRadius: "25px",
		margin: "0 auto",
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
		alignItems: "flex-start",
		alignSelf: "center",
		marginLeft: "50px",
		width: "100%",
		height: "100%",
	},

	title: {
		width: "50%",
		fontSize: "1.5rem",
		zIndex: 2,
		marginBottom: "50px",
	},

	subtitle: {
		marginTop: "30px",
		marginBottom: "50px",
		fontSize: "0.8rem",
	},

	error: {
		marginTop: "10px",
		marginBottom: "10px",
		fontSize: "0.8rem",
		color: "red",
	},

	imgContainer: {
		width: "50%",
	},
	img: {
		maxWidth: "100%",
		maxHeight: "100vh",
	},

	btnContainer: {
		display: "flex",
		alignItems: "center",
		alignContent: "space-around",

		width: "50%",
	},
}));

const Login = ({ handleSignUp, handleSignUpSubmit }) => {
	const classes = useStyles();

	return (
		<Fragment>
			<Box className={classes.container}>
				<Card className={classes.root}>
					<CardContent>
						<form
							className={classes.form}
							onSubmit={(e) => handleSignUpSubmit(e)}
						>
							<Typography className={classes.title}>
								<span style={{ fontSize: "3.5rem" }}>Register,</span>
								<br /> Create an account below to start using Pareta
							</Typography>
							<InputField
								id='name'
								label='Name'
								onChange={(e) => handleSignUp(e)}
							/>
							<InputField
								id='email'
								label='E-mail'
								onChange={(e) => handleSignUp(e)}
							/>
							<InputField
								id='password'
								type='password'
								label='Password'
								onChange={(e) => handleSignUp(e)}
							/>

							<Box className={classes.btnContainer}>
								<BackToLogin component={Link} to='/'>
									Back to Login
								</BackToLogin>

								<Register type='submit' className={classes.btnSignUp}>
									Register New Account
								</Register>
							</Box>
							{/* {errorMessage && (
								<Typography className={classes.error}>
									{errorMessage}
								</Typography>
							)} */}
						</form>
					</CardContent>
					<Box className={classes.imgContainer}>
						<img className={classes.img} src={loginImage} alt='login_img'></img>
					</Box>
				</Card>
			</Box>
		</Fragment>
	);
};

export default Login;
