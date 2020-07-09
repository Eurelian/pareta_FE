import React, { Fragment, useState, useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import { withStyles, makeStyles, useTheme } from "@material-ui/core/styles";
import {
	Typography,
	Box,
	Menu,
	MenuItem,
	Avatar,
	Grid,
	Divider,
	useMediaQuery,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import actionsContext from "./contexts/actionsContext";
import parentContext from "./contexts/parentContext";

const Nav = withStyles((theme) => ({
	root: {
		background: "#F0F0FA",
		height: "75px",
		boxShadow: "2px 2px 20px 2px rgba(0,0,0,0.1)",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
}))(AppBar);

const useStyles = makeStyles((theme) => ({
	wrapper: {
		width: "60%",
		display: "flex",
		justifyContent: "space-between",
	},
	brand: {
		color: "#53237D",
		fontWeight: "bold",
		fontSize: "2.4rem",
		fontFamily: "Pacifico",
		alignSelf: "flex-start",
		cursor: "pointer",
	},
	navLinks: {
		listStyleType: "none",
		display: "flex",
	},
	link: {
		color: "#53237D",
		fontFamily: "Montserrat",
		fontSize: "0.8rem",
		fontWeight: "600",
		marginLeft: "60px",
		cursor: "pointer",
		textDecoration: "none",
	},
	menuItem: {
		fontFamily: "Montserrat",
		fontSize: "0.8rem",
		letterSpacing: "0.7px",
		lineHeight: "1.8",
		borderRadius: "10px",
		transition: "all 0.2s ease",
		"&:hover": {
			background: "#53237D",
			color: "white",
		},
	},

	displayMenu: {
		display: "block",
	},
	dontDisplayMenu: {
		display: "none",
	},

	icon: { color: "#53237D", marginLeft: "60px", cursor: "pointer" },
}));

const NavBar = () => {
	const [menuAnchor, setMenuAnchor] = useState(null);
	const handleProfileClick = (e) => {
		setMenuAnchor(e.currentTarget);
	};

	const handleMenuClose = () => {
		setMenuAnchor(null);
	};
	const { parentLogout } = useContext(actionsContext);
	const { parentAvatar, loggedInParent } = useContext(parentContext);

	const classes = useStyles();
	const theme = useTheme();
	const displayLinks = useMediaQuery("(max-width: 750px)");
	return (
		<Fragment>
			<Nav>
				<Box className={classes.wrapper}>
					<Typography
						component={Link}
						to='/dashboard'
						style={{ textDecoration: "none" }}
						className={classes.brand}
					>
						Pareta
					</Typography>
					<ul className={classes.navLinks}>
						<li>
							<Typography
								className={
									displayLinks ? classes.dontDisplayMenu : classes.link
								}
								component={Link}
								to='/posts'
							>
								EXPERIENCES
							</Typography>
						</li>
						<li>
							<Typography
								className={
									displayLinks ? classes.dontDisplayMenu : classes.link
								}
								component={Link}
								to='/events'
							>
								EVENTS
							</Typography>
						</li>
						<li>
							<Typography
								className={
									displayLinks ? classes.dontDisplayMenu : classes.link
								}
								component={Link}
								to='/parents'
							>
								TALK
							</Typography>
						</li>
						<li>
							<FontAwesomeIcon
								className={classes.icon}
								icon={faUserCircle}
								size='lg'
								onClick={handleProfileClick}
							/>
							<Menu
								anchorEl={menuAnchor}
								onClose={handleMenuClose}
								open={Boolean(menuAnchor)}
								keepMounted
							>
								<MenuItem>
									<Grid
										container
										style={{ marginTop: "5px" }}
										alignItems='center'
									>
										<Avatar
											style={{ width: "35px", height: "35px" }}
											src={parentAvatar ? parentAvatar : "null"}
										></Avatar>
										<Grid item>
											<Grid Container>
												<Typography
													style={{
														fontFamily: "Montserrat",
														fontWeight: "bold",
														fontSize: "0.6rem",
														color: "#53237d",
														marginLeft: "7px",

														marginBottom: "3px",
													}}
												>
													MEMBER
												</Typography>
												<Typography
													style={{
														fontFamily: "Montserrat",
														fontWeight: "bold",

														fontSize: "0.7rem",
														color: "#39364f",
														marginLeft: "7px",
													}}
												>
													{loggedInParent && loggedInParent.name}
												</Typography>
											</Grid>
										</Grid>
									</Grid>
								</MenuItem>

								{/* @screen Breakpoint 845px */}
								<div
									className={
										displayLinks ? classes.displayMenu : classes.dontDisplayMenu
									}
								>
									<Divider
										style={{
											margin: "0 auto",
											marginTop: "8px",
											marginBottom: "8px",

											background: "#53237d",
											opacity: "0.2",
										}}
										light
									></Divider>
									<MenuItem
										component={Link}
										to='/posts'
										className={classes.menuItem}
									>
										Experiences
									</MenuItem>
									<MenuItem
										component={Link}
										to='/events'
										className={classes.menuItem}
									>
										Events
									</MenuItem>
									<MenuItem
										component={Link}
										to='/parents'
										className={classes.menuItem}
									>
										Talk
									</MenuItem>
								</div>

								{/* end @screen Breakpoint 845px */}

								<Divider
									style={{
										margin: "0 auto",
										marginTop: "8px",
										marginBottom: "8px",

										background: "#53237d",
										opacity: "0.2",
									}}
									light
								></Divider>
								<MenuItem
									component={Link}
									to='/dashboard'
									className={classes.menuItem}
								>
									Dashboard
								</MenuItem>
								<MenuItem
									component={Link}
									to='/new-event'
									className={classes.menuItem}
								>
									New Event
								</MenuItem>
								<MenuItem
									component={Link}
									to='/new-article'
									className={classes.menuItem}
								>
									New Experience
								</MenuItem>
								<MenuItem
									onClick={() => parentLogout()}
									component={Link}
									to='/'
									className={classes.menuItem}
								>
									Log Out
								</MenuItem>
							</Menu>
						</li>
					</ul>
				</Box>
			</Nav>
			<Box style={{ margin: "75px" }}></Box>
		</Fragment>
	);
};

export default NavBar;
