import { createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";

export default createMuiTheme({
	palette: {
		primary: {
			main: purple[500],
		},
		secondary: {
			main: green[500],
		},
	},

	breakpoints: {
		values: {
			xs: 0,
			sm: 650,
			md: 1055,
			lg: 1280,
			xl: 1920,
		},
	},
});
