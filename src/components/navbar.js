import React, { Fragment, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Typography, Box, Menu, MenuItem } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

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
	icon: { color: "#53237D", marginLeft: "60px", cursor: "pointer" },
}));

const NavBar = ({ parentLogout }) => {
	const [menuAnchor, setMenuAnchor] = useState(null);
	const handleProfileClick = (e) => {
		setMenuAnchor(e.currentTarget);
	};

	const handleMenuClose = () => {
		setMenuAnchor(null);
	};

	const classes = useStyles();
	return (
		<Fragment>
			<Nav>
				<Box className={classes.wrapper}>
					<Typography className={classes.brand}>Pareta</Typography>
					<ul className={classes.navLinks}>
						<li>
							<Typography className={classes.link} component={Link} to='/posts'>
								POSTS
							</Typography>
						</li>
						<li>
							<Typography
								className={classes.link}
								component={Link}
								to='/events'
							>
								EVENTS
							</Typography>
						</li>
						<li>
							<Typography
								className={classes.link}
								component={Link}
								to='/parents'
							>
								PARENTS
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
								<MenuItem
									onClick={() => parentLogout()}
									component={Link}
									to='/'
								>
									LogOut
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
