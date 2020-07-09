import React, { Fragment, useContext, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import playgroundImage from "../img/playground.svg";

import { Link } from "react-router-dom";

//Error Handling
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import eventContext from "./contexts/eventContext";

//STYLING
const BackToLogin = withStyles((theme) => ({
	root: {
		backgroundColor: "#F5EFFB",
		color: "#53237D",
		fontWeight: "bold",
		letterSpacing: "2px",
		maxWidth: "250px",
		width: "100%",
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
		maxWidth: "250px",
		width: "100%",
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
	root: {
		width: "80%",
		marginBottom: "30px",
		borderRadius: "20px",
		"& .MuiInputLabel-root": {
			fontFamily: "Montserrat",
			fontSize: "1.1rem",
		},
	},
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
		boxShadow: "3px 5px 15px 2px rgba(0,0,0,0.1)",
		background:
			"linear-gradient(135deg, rgba(240,240,250,1) 0%, rgba(224,224,245,1) 100%, rgba(37,38,112,1) 0252670%)",
		[theme.breakpoints.down("sm")]: {
			margin: "20px",
		},
	},

	container: {
		width: "100%",
		minHeight: "100vh",
		background: "#F9F2FF",
		display: "flex",
		alignItems: "center",
	},

	form: {
		marginLeft: "50px",
		marginBottom: "50px",
		width: "100%",
		height: "auto",
	},

	title: {
		width: "100%",
		fontSize: "1.5rem",
		zIndex: 2,
		marginBottom: "50px",
		color: "#292929",
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
		width: "100%",
		height: "auto",
	},
	img: {
		maxWidth: "100%",
		maxHeight: "auto",
	},
	input: {
		fontFamily: "Montserrat",
		fontSize: "1.3rem",
		padding: "5px 5px",
		width: "100%",
	},
}));

const SignUp = ({ handleSignUp, handleSignUpSubmit }) => {
	const classes = useStyles();
	const { errorMessage, setErrorMessage } = useContext(eventContext);

	// const notify = () =>
	// 	toast.error(`🙊 ${errorMessage}`, {
	// 		position: "top-center",
	// 		autoClose: 5000,
	// 		hideProgressBar: false,
	// 		closeOnClick: true,
	// 		pauseOnHover: true,
	// 		draggable: true,
	// 		progress: undefined,
	// 	});

	useEffect(() => {
		const notify = () =>
			toast.error(`🙊 ${errorMessage}`, {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		if (errorMessage) notify();
		setErrorMessage("");
	}, [setErrorMessage, errorMessage]);

	return (
		<Fragment>
			<ToastContainer
				position='top-center'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			<Box className={classes.container}>
				<Card className={classes.root}>
					<Grid container style={{ width: "100%" }}>
						<Grid item xs={6}>
							<form
								className={classes.form}
								onSubmit={(e) => handleSignUpSubmit(e)}
							>
								<Grid item xs={12}>
									<Typography className={classes.title}>
										<span
											style={{
												fontSize: "4.5rem",
												fontFamily: "Raleway",
												fontWeight: "bold",
												color: "#292929",
												textShadow: "2px 2px 3px rgba(0,0,0,0.2)",
											}}
										>
											Register,
										</span>
										<br /> Create an account below to start using Pareta
									</Typography>
								</Grid>
								<Grid item xs={12}>
									<InputField
										id='name'
										label='Name'
										onChange={(e) => handleSignUp(e)}
										InputProps={{ className: classes.input }}
									/>
								</Grid>
								<Grid item xs={12}>
									<InputField
										id='email'
										label='E-mail'
										onChange={(e) => handleSignUp(e)}
										InputProps={{ className: classes.input }}
									/>
								</Grid>
								<Grid item xs={12}>
									<InputField
										id='password'
										type='password'
										label='Password'
										onChange={(e) => handleSignUp(e)}
										InputProps={{ className: classes.input }}
									/>
								</Grid>
								<Grid item xs={12}>
									<Box className={classes.btnContainer}>
										<BackToLogin component={Link} to='/'>
											Back to Login
										</BackToLogin>

										<Register type='submit' className={classes.btnSignUp}>
											Register New Account
										</Register>
									</Box>
								</Grid>
							</form>
						</Grid>
						<Grid item xs={6} container alignItems='center'>
							<div className={classes.imgContainer}>
								<img
									className={classes.img}
									src={playgroundImage}
									alt='login_img'
								></img>
							</div>
						</Grid>
					</Grid>
				</Card>
			</Box>
		</Fragment>
	);
};

export default SignUp;
