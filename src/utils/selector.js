import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
	button: {
		display: "block",
		marginTop: theme.spacing(2),
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
}));

const Selector = ({ nameValue, selectorValues, handleClick, id, value }) => {
	const classes = useStyles();
	const [age, setAge] = React.useState("");
	const [open, setOpen] = React.useState(false);

	const handleChange = (event) => {
		setAge(event.target.value);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	return (
		<div>
			<FormControl className={classes.formControl}>
				<InputLabel id='demo-controlled-open-select-label'>
					{nameValue}
				</InputLabel>
				<Select
					name={id}
					open={open}
					onClose={handleClose}
					onOpen={handleOpen}
					value={value}
					onChange={(e) => handleClick(e)}
					style={{ textAlign: "center" }}
				>
					<MenuItem value=''>
						<em>None</em>
					</MenuItem>
					{selectorValues.map((value) => (
						<MenuItem key={value} value={value}>
							{value}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
};

export default Selector;
