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
			<Grid container justify='space-between'>
				<KeyboardDatePicker
					margin='normal'
					id='date-picker-dialog'
					label='Set a date'
					format='MM/dd/yyyy'
					value={selectedDate}
					onChange={handleDateChange}
					InputProps={{ style: { fontFamily: "Montserrat" } }}
					KeyboardButtonProps={{
						"aria-label": "change date",
					}}
				/>
				<KeyboardTimePicker
					margin='normal'
					style={{ marginLeft: "35px" }}
					id='time-picker'
					label='Set a Time'
					value={selectedDate}
					onChange={handleDateChange}
					InputProps={{ style: { fontFamily: "Montserrat" } }}
					KeyboardButtonProps={{
						"aria-label": "change time",
					}}
				/>
			</Grid>
		</MuiPickersUtilsProvider>
	);
};

export default DatePicker;
