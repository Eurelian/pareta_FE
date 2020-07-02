import React, { Fragment, useState } from "react";
import { Grid, Typography, TextField } from "@material-ui/core/";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import NavBar from "./navbar";
import { Editor } from "@tinymce/tinymce-react";
import ButtonLight from "./ui/ButtonLight";
import Cookies from "js-cookie";
import { paretaClient, refresh } from "../utils/paretaClient";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	text: {
		fontSize: "3.5rem",
		fontFamily: "Raleway",
		color: "black",
	},
}));

const InputTitle = withStyles({
	root: {
		width: "100%",
		marginTop: "15px",
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

	const handleEditorChange = (e) => {
		setBlog({ ...blog, text: e.target.getContent() });

		console.log(blog.text);
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
					console.log(res);
					setBlog({ title: "", text: "" });
					setIsSubmitted(true);
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
					<Grid container>
						<Grid item xs={12}>
							<InputTitle
								onChange={(e) => handleTitle(e)}
								InputProps={{ className: classes.text }}
								placeholder='Title'
							></InputTitle>
						</Grid>
						<Grid item xs={12}>
							<Editor
								apiKey='tyhadidpx0uoffabp2p22ez2jfxaxbhm9l4636ejfv7yd1kk'
								body_class='text-style'
								init={{
									placeholder: "Share your experience...",
									height: 500,
									menubar: false,
									toolbar_location: "bottom",
									skin: "naked",
									plugins: [
										"advlist autolink lists link image",
										"charmap print preview anchor help",
										"searchreplace visualblocks code",
										"insertdatetime media table paste wordcount",
									],
									toolbar:
										"bold italic underline | bullist numlist | spellchecker",
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
				</Grid>
				<Grid item xs={2}></Grid>
			</Grid>
		</Fragment>
	);
};

export default CreateArticle;
