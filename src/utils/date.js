import "date-fns";
import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
	MuiPickersUtilsProvider,
	KeyboardTimePicker,
	KeyboardDatePicker,
} from "@material-ui/pickers";

const DatePicker = ({ getTime }) => {
	const [selectedDate, setSelectedDate] = useState(new Date());

	const handleDateChange = (date) => {
		setSelectedDate(date);
		getTime(date);
	};

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<Grid container justify='flex-start'>
				<KeyboardDatePicker
					margin='normal'
					id='date-picker-dialog'
					label='Date picker dialog'
					format='MM/dd/yyyy'
					value={selectedDate}
					onChange={handleDateChange}
					KeyboardButtonProps={{
						"aria-label": "change date",
					}}
				/>
				<KeyboardTimePicker
					margin='normal'
					style={{ marginLeft: "25px" }}
					id='time-picker'
					label='Time picker'
					value={selectedDate}
					onChange={handleDateChange}
					KeyboardButtonProps={{
						"aria-label": "change time",
					}}
				/>
			</Grid>
		</MuiPickersUtilsProvider>
	);
};

export default DatePicker;
