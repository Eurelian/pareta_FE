import React, { Fragment, useContext, useEffect, useState } from "react";

//COMPONENTS
import NavBar from "../navbar";
import Footer from "../footer";
import Loader from "../ui/loader";

//PACKAGES
import { Grid, Typography, TextField, Avatar } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@material-ui/core/styles";
import Cookies from "js-cookie";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

//UTILS
import { paretaClient, refresh } from "../../utils/paretaClient";

//CONTEXTS
import parentContext from "../../components/contexts/parentContext";

//MUI STYLES
const useStyles = makeStyles((theme) => ({
	chatContainer: {
		maxWidth: "1270px",
		marginTop: "50px",
		width: "100%",
		margin: "0 auto",
		borderRadius: "12px",
		marginBottom: "50px",
		boxShadow: "2px 3px 15px 2px rgba(0,0,0,0.1)",
		[theme.breakpoints.down(1080)]: {
			maxWidth: "100%",
			marginTop: "0",
		},
	},

	parentContainer: {
		[theme.breakpoints.down(750)]: {
			marginBottom: "100px",
		},
	},

	userContainer: {
		width: "100%",
		minHeight: "80vh",
		maxHeight: "100%",
		border: "solid 1px #F5EFFB",
		borderRadius: "12px 0 0 12px",
		overflow: "auto",
	},
	textContainer: {
		width: "800px",
		height: "auto",
		border: "solid 1px #F5EFFB",
		borderRadius: "12px",
	},
	userData: {
		padding: "30px 20px",
		borderRadius: "12px 0 0 0",
		background: "#53237d",
		boxShadow: "0 2px 10px 1px rgba(0,0,0,0.4)",
		zIndex: 100,
		height: "100px",
		[theme.breakpoints.down(1080)]: { padding: "15px 7px" },
	},

	userName: {
		marginLeft: "15px",
		fontSize: "1rem",
		fontFamily: "Montserrat",
		color: "white",
		[theme.breakpoints.down(1080)]: { display: "none" },
	},
	textPreview: {
		marginLeft: "15px",
		fontSize: "0.7rem",
		marginTop: "5px",
		fontFamily: "Montserrat",
		fontStyle: "italic",
		color: "#6F7287",
		[theme.breakpoints.down(1080)]: { display: "none" },
	},
	favoriteName: {
		marginLeft: "15px",
		fontSize: "0.9rem",
		fontFamily: "Montserrat",
		color: "#39364f",
		[theme.breakpoints.down(1080)]: { display: "none" },
	},

	selectedUserName: {
		marginLeft: "15px",
		fontSize: "1rem",
		fontFamily: "Montserrat",
		color: "#39364f",
		[theme.breakpoints.down(1080)]: { fontSize: "0.8rem" },
	},

	avatarSize: {
		width: theme.spacing(3),
		height: theme.spacing(3),
		[theme.breakpoints.down(1080)]: {
			width: theme.spacing(5),
			height: theme.spacing(5),
			margin: "0 auto",
		},
	},

	favoriteData: {
		background: "#F5EFFB",
		border: "solid 1px #F5EFFB",
		borderRadius: "0 0 12px 12px",
		maxHeight: "100%",
		overflow: "auto",
		[theme.breakpoints.down(1080)]: { maxHeight: "400px", marginTop: "0" },
	},
	parentData: {
		background: "#F5EFFB",
		height: "100px",
		padding: "30px 20px",
		boxShadow: "0 5px 10px 1px rgba(0,0,0,0.1)",
		zIndex: 100,
		borderRadius: "0 12px 0 0",
	},
	messageArea: {
		height: "75vh",
	},
	messages: { maxHeight: "75vh", overflow: "auto" },
	inputField: {
		padding: "30px 30px",
		border: "solid 1px #F5EFFB",
		borderRadius: "0 0 12px 0",
		overflow: "auto",
	},
	input: { fontFamily: "Montserrat", padding: "5px 10px" },
	parentSelect: {
		cursor: "pointer",
		padding: "20px 5px 10px 10px",
	},
	parentSelected: {
		background: "#D6BEEF",
		cursor: "pointer",
		padding: "20px 5px 10px 10px",
		borderRadius: "12px",
	},
	messageField: {
		width: "90%",
		[theme.breakpoints.down(1080)]: { width: "70%" },
	},
	messageUser: {
		color: "#f5f5f5",
		maxWidth: "50%",
		background: "#53237D",
		padding: "5px 10px 5px 20px",
		fontFamily: "Montserrat",
		fontSize: "0.8rem",
		borderRadius: "12px 3px 12px 12px",
		marginBottom: "5px",
		lineHeight: "1.8",
		letterSpacing: "1px",
		boxShadow: "2px 2px 15px 1px rgba(0,0,0,0.1)",
	},
	messageFavorite: {
		color: "#39364f",
		maxWidth: "50%",
		background: "#EADEF7",
		padding: "5px 20px 5px 10px",
		fontFamily: "Montserrat",
		fontSize: "0.8rem",
		borderRadius: "12px 3px 12px 12px",
		marginBottom: "5px",
		lineHeight: "1.8",
		letterSpacing: "0.8",
		boxShadow: "2px 2px 1px rgba(0,0,0,0.1)",
	},

	sendBtn: {
		transition: "all 0.3s ease",
		color: "#D6BEEF",
		marginRight: "15px",
		"&:hover": { color: "#53237D", transform: "rotate(35deg)" },
	},
}));

const ParentChat = () => {
	const classes = useStyles();

	//Logged In Data
	const { loggedInParent, randomAvatars, parentAvatar } = useContext(
		parentContext
	);

	const [isActive, setIsActive] = useState(null);

	const [favoriteParents, setFavoriteParents] = useState(null);
	// const [currentConversation, setCurrentConversation] = useState(null);
	const [messages, setMessages] = useState(null);
	const [selectedParent, setSelectedParent] = useState(null);
	const [newMessage, setNewMessage] = useState(null);

	const selectConversation = (e) => {
		// setCurrentConversation(e.currentTarget.id);
		setIsActive(e.currentTarget.id);
	};

	//Get Current Conversation
	useEffect(() => {
		const token = Cookies.get("parent-token");
		if (token) {
			console.log(isActive);
			refresh();
			paretaClient
				.get(`/messages/received/${isActive}`)
				.then((res) => {
					setMessages(res.data);
					console.log(res);
				})
				.catch((err) => console.log(err));
		}
	}, [isActive]);

	//Get Selected Parent

	useEffect(() => {
		const token = Cookies.get("parent-token");
		if (token) {
			refresh();
			paretaClient
				.get(`/dashboard/parent/${isActive}`)
				.then((res) => {
					setSelectedParent(res.data);
					console.log(res);
				})
				.catch((err) => console.log(err));
		}
	}, [isActive]);

	//Get Favorite Parents
	useEffect(() => {
		const token = Cookies.get("parent-token");
		if (token) {
			refresh();
			paretaClient
				.get(`/dashboard/favorite-parents`)
				.then((res) => {
					setFavoriteParents(res.data.parents_favorite);
					console.log(res);
				})
				.catch((err) => console.log(err));
			paretaClient
				.get(`/dashboard/parent/${isActive}`)
				.then((res) => {
					setSelectedParent(res.data);
					console.log(res);
				})
				.catch((err) => console.log(err));
		}
	}, [isActive]);

	//Get New Message Input
	const handleInput = (e) => {
		setNewMessage(e.target.value);
	};

	//Submit New Message
	const handleSubmit = (e) => {
		e.preventDefault();
		const token = Cookies.get("parent-token");
		if (token) {
			refresh();
			paretaClient
				.post("messages", { id: isActive, text: newMessage })
				.then((res) => console.log(res))
				.catch((err) => console.log(err));
			setNewMessage("");
		}

		console.log("works");
	};
	return (
		<Fragment>
			<NavBar></NavBar>
			<Grid
				container
				alignItems='center'
				direction='column'
				className={classes.parentContainer}
				style={{
					width: "100%",
				}}
			>
				<Grid item xs={12}>
					<Grid container className={classes.chatContainer}>
						{loggedInParent ? (
							<>
								<Grid item xs className={classes.userContainer}>
									<Grid container>
										<Grid item xs={12} className={classes.userData} container>
											<Grid container alignItems='center'>
												<Avatar
													className={classes.avatarSize}
													src={parentAvatar ? parentAvatar : "null"}
												>
													{loggedInParent.name.slice(0, 1).toUpperCase()}
												</Avatar>
												<Typography className={classes.userName}>
													{loggedInParent.name}
												</Typography>
											</Grid>
										</Grid>
										<Grid item xs={12} className={classes.favoriteData}>
											<Grid container direction='column'>
												{favoriteParents ? (
													favoriteParents.map((item, i) => {
														return (
															<div
																onClick={(e) => selectConversation(e)}
																id={item._id}
																key={i++}
															>
																<Grid
																	key={item._id}
																	container
																	direction='column'
																	className={
																		isActive === item._id
																			? classes.parentSelected
																			: classes.parentSelect
																	}
																>
																	<Grid
																		item
																		xs={12}
																		container
																		alignItems='center'
																	>
																		<Avatar
																			className={classes.avatarSize}
																			src={
																				randomAvatars
																					? randomAvatars[i++].picture.thumbnail
																					: null
																			}
																		></Avatar>
																		<Typography
																			className={classes.favoriteName}
																		>
																			{item.name}
																		</Typography>
																	</Grid>
																	<Grid item xs={12}>
																		<Typography className={classes.textPreview}>
																			Last Message Preview
																		</Typography>
																	</Grid>
																</Grid>
															</div>
														);
													})
												) : (
													<div>Loading...</div>
												)}
											</Grid>
										</Grid>
									</Grid>
								</Grid>
								<Grid item xs={9} className={classes.textContainer}>
									<Grid container>
										<Grid item xs={12} className={classes.parentData}>
											<Grid container justify='flex-start'>
												{selectedParent === null || !selectedParent.name ? (
													<div>{console.log(selectedParent)}</div>
												) : (
													<>
														<Grid item container alignItems='center' xs>
															{" "}
															<Avatar
																src={
																	randomAvatars
																		? randomAvatars[15].picture.thumbnail
																		: null
																}
															></Avatar>
															<Typography className={classes.selectedUserName}>
																{selectedParent.name}
															</Typography>
														</Grid>
													</>
												)}
												<Grid item xs={8}></Grid>
											</Grid>
										</Grid>

										<Grid
											item
											xs={12}
											className={classes.messageArea}
											container
											alignItems='flex-end'
										>
											<Grid container>
												<SimpleBar
													style={{
														maxHeight: "75vh",
														width: "100%",
														margin: "0 15px 0 0",
														padding: "0 20px 0 10px",
													}}
												>
													{messages ? (
														messages.map((message) => (
															<Grid
																container
																item
																xs={12}
																justify={
																	loggedInParent._id === message.sender._id
																		? "flex-end"
																		: "flex-start"
																}
															>
																<div
																	className={
																		loggedInParent._id === message.sender._id
																			? classes.messageUser
																			: classes.messageFavorite
																	}
																	key={message._id}
																>
																	{message.text}
																</div>
															</Grid>
														))
													) : (
														<div
															style={{
																width: "100%",
																height: "75vh",
																display: "flex",
																justifyContent: "center",
																alignItems: "center",
															}}
														>
															<Loader></Loader>
														</div>
													)}
												</SimpleBar>
											</Grid>
										</Grid>

										<Grid item xs={12} className={classes.inputField}>
											<form onSubmit={(e) => handleSubmit(e)}>
												<Grid
													container
													alignItems='center'
													justify='space-between'
												>
													<TextField
														disabled={
															selectedParent === null || !selectedParent.name
																? true
																: false
														}
														onChange={(e) => handleInput(e)}
														placeholder='Type a message'
														className={classes.messageField}
														InputProps={{ className: classes.input }}
														value={newMessage}
													></TextField>
													<div
														onClick={
															selectedParent === null || !selectedParent.name
																? null
																: (e) => handleSubmit(e)
														}
														style={{ cursor: "pointer" }}
													>
														<FontAwesomeIcon
															size='lg'
															className={classes.sendBtn}
															icon={faPaperPlane}
														></FontAwesomeIcon>
													</div>
												</Grid>
											</form>
										</Grid>
									</Grid>
								</Grid>
							</>
						) : (
							<div>
								<Loader></Loader>
							</div>
						)}
					</Grid>
				</Grid>
			</Grid>
			<Footer></Footer>
		</Fragment>
	);
};

export default ParentChat;
