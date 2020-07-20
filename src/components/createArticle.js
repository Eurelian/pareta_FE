import React, { Fragment, useState, useContext } from "react";
import { Grid, TextField, Paper } from "@material-ui/core/";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import NavBar from "./navbar";
import { Editor } from "@tinymce/tinymce-react";
import ButtonLight from "./ui/ButtonLight";
import Cookies from "js-cookie";
import { paretaClient, refresh } from "../utils/paretaClient";
import { Link, useHistory } from "react-router-dom";
import articleContext from "./contexts/articleContext";
import Footer from "./footer";

const useStyles = makeStyles((theme) => ({
	text: {
		fontSize: "3rem",
		paddingLeft: "15px",
		paddingBottom: "15px",
		fontFamily: "Raleway",
		color: "#39364f",
	},

	background: {
		maxWidth: "1270px",
		width: "100%",
		padding: "30px 50px",
		borderRadius: "20px",
		boxShadow: "2px 2px 20px 2px rgba(0,0,0,0.1)",
		marginBottom: "150px",
	},
}));

const InputTitle = withStyles({
	root: {
		width: "100%",
		marginTop: "30px",
		"& .MuiInput-underline:after": {
			borderWidth: "1px",
		},
		"& .MuiInput-underline": {
			borderWidth: "0px",
		},
		"& label.Mui-focused": {
			fontFamily: "Raleway",
			fontSize: "1.2rem",
		},

		marginBottom: "50px",
	},
})(TextField);

const CreateArticle = () => {
	const classes = useStyles();
	const [blog, setBlog] = useState({ title: "", text: "" });
	const [isSubmitted, setIsSubmitted] = useState(false);
	const history = useHistory();

	const { setArticlesCreated } = useContext(articleContext);

	const handleEditorChange = (e) => {
		setBlog({ ...blog, text: e.target.getContent() });
	};

	const handleTitle = (e) => {
		setBlog({ ...blog, title: e.target.value });
	};

	const articleSubmit = () => {
		const token = Cookies.get("parent-token");
		if (token) {
			refresh();
			paretaClient
				.post("/dashboard/posts", {
					title: blog.title,
					text: blog.text,
				})
				.then((res) => {
					setBlog({ title: "", text: "" });
					setArticlesCreated(res.data.articles_created);
					setIsSubmitted(true);
					history.push("/posts");
				})
				.catch((err) => console.log(err));
		}
	};

	return (
		<Fragment>
			<NavBar></NavBar>
			<Grid container>
				<Grid item xs={2}></Grid>
				<Grid item xs={8} style={{ marginTop: "150px" }}>
					<Paper className={classes.background}>
						<Grid container>
							<Grid item xs={12}>
								<InputTitle
									onChange={(e) => handleTitle(e)}
									InputProps={{ className: classes.text }}
									placeholder='Name your experience...'
								></InputTitle>
							</Grid>
							<Grid item xs={12}>
								<Editor
									style={{ fontFamily: "Montserrat" }}
									apiKey='tyhadidpx0uoffabp2p22ez2jfxaxbhm9l4636ejfv7yd1kk'
									body_class='text-style'
									init={{
										placeholder: "Share your experience in more detail...",
										height: 500,
										menubar: false,
										toolbar_location: "bottom",
										icons: "material",
										skin: "naked",
										content_style: `p{font-family: "Montserrat", font-size: 40px}`,
										plugins: [
											"advlist autolink lists link image",
											"charmap print preview anchor help",
											"searchreplace visualblocks code",
											"insertdatetime media table paste wordcount",
										],
										toolbar:
											"bold italic underline fontsizeselect formatselect | bullist numlist | spellchecker ",
									}}
									onChange={handleEditorChange}
								/>
							</Grid>
							<Grid item xs={12}>
								<Link
									to={isSubmitted && "/dashboard"}
									style={{ textDecoration: "none" }}
								>
									<div
										style={{
											width: "50%",
											margin: "0 auto",
											marginTop: "50px",
											marginBottom: "150px",
										}}
										onClick={(e) => articleSubmit(e)}
									>
										<ButtonLight text={"Share"}></ButtonLight>
									</div>
								</Link>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
				<Grid item xs={2}></Grid>
				<Footer></Footer>
			</Grid>
		</Fragment>
	);
};

export default CreateArticle;
