const handleDate = (date) => {
	let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	let months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	const dt = new Date(date);
	let year = dt.getFullYear();
	let month = months[dt.getMonth()];
	let hours = dt.getHours();
	let minutes = dt.getMinutes();
	let dayN = dt.getDate();
	let day = days[dt.getDay()];

	if (hours < 10) {
		hours = "0" + hours;
	}
	if (minutes < 10) {
		minutes = "0" + minutes;
	}

	if (dayN < 10) {
		dayN = "0" + dayN;
	}
	// if (month < 10) {
	// 	month = "0" + month;
	// }

	return `${day}, ${month} ${dayN}, ${year} ${hours}:${minutes}`;
};

const handleArticleDate = (date) => {
	let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	let months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	const dt = new Date(date);
	let year = dt.getFullYear();
	let month = months[dt.getMonth()];
	let hours = dt.getHours();
	let minutes = dt.getMinutes();
	let dayN = dt.getDate();
	let day = days[dt.getDay()];

	if (hours < 10) {
		hours = "0" + hours;
	}
	if (minutes < 10) {
		minutes = "0" + minutes;
	}

	if (dayN < 10) {
		dayN = "0" + dayN;
	}
	// if (month < 10) {
	// 	month = "0" + month;
	// }

	return `${day}, ${month} ${dayN}, ${year}`;
};

export { handleDate, handleArticleDate };
