import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Fab } from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
	title: {
		fontFamily: "Raleway",
		marginTop: "25px",
		fontSize: "2rem",
		fontWeight: "bold",
		margin: "0 auto",
	},
	text: { fontFamily: "Montserrat", fontSize: "1rem", margin: "0 auto" },
	icon: { color: "white" },
	fabBtn: {
		background: "#ff9494",
		"&:hover": { background: "#FF1F1F" },
		marginBottom: "40px",
		marginTop: "30px",
	},
}));

export default function DialogAlert({ open, handleOpen, handleDelete }) {
	const classes = useStyles();
	// const [open, setOpen] = React.useState(false);

	// const handleClickOpen = () => {
	// 	setOpen(true);
	// };

	// const handleClose = () => {
	// 	setOpen(false);
	// };

	return (
		<div>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleOpen}
				aria-labelledby='alert-dialog-slide-title'
				aria-describedby='alert-dialog-slide-description'
			>
				<DialogTitle className={classes.title}>
					<p className={classes.title}>Delete event?</p>
				</DialogTitle>
				<DialogContent>
					<DialogContentText className={classes.text}>
						<p className={classes.text}>
							Are you sure you want to delete this event?
						</p>
					</DialogContentText>
				</DialogContent>
				<DialogActions style={{ margin: "0 auto" }}>
					<div onClick={handleOpen} color='primary'>
						<Fab onClick={() => handleDelete()} className={classes.fabBtn}>
							<FontAwesomeIcon
								icon={faTrashAlt}
								className={classes.icon}
								size='2x'
							></FontAwesomeIcon>
						</Fab>
					</div>
				</DialogActions>
			</Dialog>
		</div>
	);
}
