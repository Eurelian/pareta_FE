import React, { Fragment, useContext, useEffect, useState } from "react";
import { Grid, Typography, TextField, Paper, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import NavBar from "../navbar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import { paretaClient, refresh } from "../../utils/paretaClient";

import parentContext from "../../components/contexts/parentContext";

const useStyles = makeStyles((theme) => ({
	userContainer: {
		width: "100%",
		height: "auto",
		border: "solid 1px #F5EFFB",
		borderRadius: "12px",
		overflow: "auto",
	},
	textContainer: {
		width: "100%",
		height: "auto",
		border: "solid 1px #F5EFFB",
		borderRadius: "12px",
	},
	userData: {
		background: "green",
		padding: "30px 20px",
		border: "solid 1px #F5EFFB",
		borderRadius: "12px",
	},
	favoriteData: {
		background: "yellow",
		border: "solid 1px #F5EFFB",
		borderRadius: "12px",
	},
	parentData: {
		background: "red",
		padding: "30px 20px",
		border: "solid 1px #F5EFFB",
		borderRadius: "12px",
	},
	messageArea: {
		background: "blue",
		padding: "30px 20px",
		height: "75vh",
		overflow: "auto",
	},
	messages: { maxHeight: "75vh", overflow: "auto" },
	inputField: {
		padding: "30px 20px",
		border: "solid 1px #F5EFFB",
		borderRadius: "12px",
		overflow: "auto",
	},
	parentSelect: {
		cursor: "pointer",
		padding: "10px 5px",
		cursor: "pointer",
		// "&:hover": {
		// 	background: "red",
		// },
	},
	parentSelected: {
		background: "red",
		cursor: "pointer",
		padding: "10px 5px",
	},

	messageField: { width: "80%" },
	sendBtn: { marginRight: "30px" },
}));

const ParentChat = () => {
	const classes = useStyles();

	//Logged In Data
	const { loggedInParent } = useContext(parentContext);

	const [isActive, setIsActive] = useState(null);

	const [favoriteParents, setFavoriteParents] = useState(null);
	const [currentConversation, setCurrentConversation] = useState(null);
	const [messages, setMessages] = useState(null);
	const [selectedParent, setSelectedParent] = useState(null);
	const [newMessage, setNewMessage] = useState(null);

	const selectConversation = (e) => {
		setCurrentConversation(e.currentTarget.id);
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
	}, []);

	//Get New Message Input
	const handleInput = (e) => {
		setNewMessage(e.target.value);
		console.log(newMessage);
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
				style={{ height: "90vh", width: "60%", margin: "0 auto" }}
			>
				{loggedInParent ? (
					<>
						<Grid item xs={3} className={classes.userContainer}>
							<Grid container>
								<Grid item xs={12} className={classes.userData}>
									<Grid container alignItems='center'>
										<Avatar>
											{loggedInParent.name.slice(0, 1).toUpperCase()}
										</Avatar>

										<Typography>{loggedInParent.name}</Typography>
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
															<Grid item xs={12} container alignItems='center'>
																<Avatar></Avatar>
																<Typography>{item.name}</Typography>
															</Grid>
															<Grid item xs={12}>
																<Typography>Last Message Preview</Typography>
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
										{selectedParent ? (
											<>
												<Grid item xs>
													{" "}
													<Avatar></Avatar>
												</Grid>
												<Grid item xs>
													{" "}
													{selectedParent.name}
												</Grid>
											</>
										) : (
											<div>Loading...</div>
										)}
										<Grid item xs={8}></Grid>
									</Grid>
								</Grid>
								<Grid item xs={12} className={classes.messageArea}>
									<Grid item xs={12}>
										{messages ? (
											messages.map((message) => (
												<div key={message._id}>{message.text}</div>
											))
										) : (
											<div>Loading...</div>
										)}
									</Grid>
								</Grid>
								<Grid item xs={12} className={classes.inputField}>
									<form onSubmit={(e) => handleSubmit(e)}>
										<Grid container alignItems='center' justify='space-between'>
											<TextField
												onChange={(e) => handleInput(e)}
												placeholder='Type a message'
												className={classes.messageField}
												value={newMessage}
											></TextField>
											<div
												onClick={(e) => handleSubmit(e)}
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
					<div>Loading..</div>
				)}
			</Grid>
		</Fragment>
	);
};

export default ParentChat;
