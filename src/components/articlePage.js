import React, { Fragment, useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import NavBar from "./navbar";
import { Grid, Typography, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Cookies from "js-cookie";
import { paretaClient, refresh } from "../utils/paretaClient";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
import parse from "html-react-parser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

//CONTEXT
import articleContext from "./contexts/articleContext";

const useStyles = makeStyles((theme) => ({
	title: {
		fontFamily: "Raleway",
		fontSize: "3rem",
		fontWeight: "bold",
		lineHeight: "1.6",
		marginBottom: "30px",
	},
	subtitle: {
		fontFamily: "Montserrat",
		fontSize: "0.8rem",
	},
	followbtn: {
		fontFamily: "Montserrat",
		fontSize: "0.6rem",
		fontWeight: 600,
		cursor: "pointer",
		color: "#53237d",
		border: "solid 2px #53237d",
		borderRadius: "10px",
		padding: "3px 6px",
		textAlign: "center",
		transition: "all 0.4s ease",
		marginLeft: "10px",
		minWidth: "50px",
		maxWidth: "50px",
		"&:hover": {
			background: "#53237d",
			color: "white",
			transform: "translateY(-4px)",
		},
	},
	orange: {
		color: theme.palette.getContrastText(deepOrange[500]),
		backgroundColor: deepOrange[500],
	},

	textBody: {
		fontFamily: "Montserrat",
		fontSize: "1rem",
		lineHeight: "1.8",
		marginTop: "70px",
	},
	bookmark: {
		color: "#E2CFF2",
		cursor: "pointer",
		transition: "all 0.4s ease",
		"&:hover": {
			transform: "translateY(-2px)",
		},
	},
}));

const ArticlePage = () => {
	const classes = useStyles();
	const history = useHistory();
	const { id } = useParams();

	const {
		article,
		articles,
		setArticle,
		setArticles,
		setArticlesFavorite,
	} = useContext(articleContext);

	const [isBookmarked, setIsBookmarked] = useState(null);

	//GET ARTICLE DATA
	useEffect(() => {
		const token = Cookies.get("parent-token");
		if (token) {
			refresh();
			paretaClient
				.get(`/articles/${id}`)
				.then((res) => {
					setArticle(res.data);
				})
				.catch((err) => console.log(err));
		}
	}, []);

	//CHECK IF ARTICLE IS FAVORITE
	useEffect(() => {
		const token = Cookies.get("parent-token");
		if (token) {
			paretaClient
				.get(`/dashboard/posts/favorite/${id}`)
				.then((res) => {
					setIsBookmarked(res.data);

					console.log(res);
				})
				.catch((err) => console.log(err));
		}
	}, []);

	//ARTICLE ADD TO FAVORITE
	const handleBookmark = () => {
		const token = Cookies.get("parent-token");
		if (token) {
			refresh();
			paretaClient
				.post(`/articles/favorite`, { id: id })
				.then((res) => {
					setIsBookmarked(true);
					console.log(res);
				})
				.catch((err) => console.log(err));
		}
	};

	//ARTICLE REMOVE FROM FAVORITE
	const handleBookmarkRemove = () => {
		const token = Cookies.get("parent-token");
		if (token) {
			refresh();
			paretaClient
				.delete(`/dashboard/post/favorite/${id}`)
				.then((res) => {
					setIsBookmarked(false);
					setArticlesFavorite(res.data.articles_favorite);
					console.log(res);
				})
				.catch((err) => console.log(err));
		}
	};

	const handleFavorite = () => {
		const token = Cookies.get("parent-token");
		if (token) {
			refresh();
			paretaClient
				.post(`/dashboard/favorite-parent`, { id: article.author._id })
				.then((res) => {
					history.push("/parents");
					console.log(res);
				})
				.catch((err) => console.log(err));
		}
	};

	if (article)
		return (
			<Fragment>
				<NavBar></NavBar>
				<Grid container style={{ marginTop: "150px" }}>
					<Grid item xs={3}></Grid>
					<Grid item xs={6}>
						<Grid container justify='center'>
							<Grid item xs={12}>
								<Typography className={classes.title}>
									{article.title}
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<Grid container justify='space-between'>
									<Grid item xs={6}>
										<Grid container justify='center' alignItems='center'>
											<Grid item xs>
												<Avatar size='4x' className={classes.orange}>
													{article.author.name.slice(0, 1).toUpperCase()}
												</Avatar>
											</Grid>
											<Grid item xs={6}>
												<Grid container direction='column'>
													<Grid item xs={12}>
														<Grid
															container
															justify='flex-start'
															alignItems='center'
														>
															<Grid item xs>
																<Typography className={classes.subtitle}>
																	{article.author.name}
																</Typography>
															</Grid>
															<Grid item xs>
																<div
																	onClick={() => handleFavorite()}
																	className={classes.followbtn}
																>
																	Message
																</div>
															</Grid>
														</Grid>
													</Grid>
													<Grid item xs={12}>
														Date
													</Grid>
												</Grid>
											</Grid>
											<Grid item xs={4}></Grid>
										</Grid>
									</Grid>
									<Grid item xs={6}>
										<Grid container justify='flex-end' alignItems='center'>
											<Grid item xs style={{ flexGrow: 0 }}>
												<FontAwesomeIcon
													onClick={
														isBookmarked
															? () => handleBookmarkRemove()
															: () => handleBookmark()
													}
													style={
														isBookmarked
															? { color: `#53237d` }
															: { color: `#E2CFF2` }
													}
													icon={faBookmark}
													size='lg'
													className={classes.bookmark}
												></FontAwesomeIcon>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Typography className={classes.textBody}>
									{parse(`${article.text}`)}
								</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={3}></Grid>
				</Grid>
			</Fragment>
		);
	else return <div>Loading...</div>;
};

export default ArticlePage;
