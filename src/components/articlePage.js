import React, { Fragment, useEffect, useState, useContext } from "react";

//COMPONENTS
import NavBar from "./navbar";
import Footer from "./footer";

//PACKAGES
import { useParams, useHistory } from "react-router-dom";

import { Grid, Typography, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Cookies from "js-cookie";
import parse from "html-react-parser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

//UTILS
import { paretaClient, refresh } from "../utils/paretaClient";
import { handleArticleDate } from "../utils/dateConversion";
import SkeletonPage from "../components/ui/SkeletonPage";

//CONTEXT
import articleContext from "./contexts/articleContext";
import parentContext from "./contexts/parentContext";

const useStyles = makeStyles((theme) => ({
	title: {
		fontFamily: "Raleway",
		fontSize: "3rem",
		fontWeight: "bold",
		lineHeight: "1.6",
		marginBottom: "30px",
		color: "#39364f",
		[theme.breakpoints.down(750)]: { fontSize: "2rem" },
	},
	subtitle: {
		fontFamily: "Montserrat",
		fontSize: "0.8rem",
		marginBottom: "10px",
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
		marginBottom: "10px",
		"&:hover": {
			background: "#53237d",
			color: "white",
			transform: "translateY(-4px)",
		},
	},

	textBody: {
		fontFamily: "Montserrat",
		fontSize: "1rem",
		lineHeight: "1.8",
		marginTop: "70px",
		[theme.breakpoints.down(750)]: { fontSize: "0.8rem" },
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

	const [isParent, setIsParent] = useState(false);

	const {
		article,

		setArticle,

		setArticlesFavorite,
		randomAvatars,
	} = useContext(articleContext);

	const { loggedInParent } = useContext(parentContext);

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
					if (loggedInParent._id === res.data.author._id) setIsParent(true);
					else setIsParent(false);
				})
				.catch((err) => console.log(err));
		}
	}, [id, loggedInParent._id, setArticle]);

	//CHECK IF ARTICLE IS FAVORITE
	useEffect(() => {
		const token = Cookies.get("parent-token");
		if (token) {
			paretaClient
				.get(`/dashboard/posts/favorite/${id}`)
				.then((res) => {
					setIsBookmarked(res.data);
				})
				.catch((err) => console.log(err));
		}
	}, [id]);

	//ARTICLE ADD TO FAVORITE
	const handleBookmark = () => {
		const token = Cookies.get("parent-token");
		if (token) {
			refresh();
			paretaClient
				.post(`/articles/favorite`, { id: id })
				.then((res) => {
					setIsBookmarked(true);
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
				})
				.catch((err) => console.log(err));
		}
	};

	return (
		<Fragment>
			<NavBar></NavBar>

			<Grid container style={{ marginTop: "150px", marginBottom: "100px" }}>
				<Grid item xs md={3}></Grid>
				<Grid item xs={10} md={6}>
					<Grid container justify='center'>
						{article === null || article.title.length < 0 ? (
							<>
								<SkeletonPage></SkeletonPage>
							</>
						) : (
							<>
								<Grid item xs={12}>
									<Typography className={classes.title}>
										{article.title}
									</Typography>
								</Grid>
								<Grid item xs={12}>
									<Grid container justify='space-between'>
										<Grid item xs={6}>
											<Grid container alignItems='center'>
												<Avatar
													size='4x'
													src={
														randomAvatars
															? randomAvatars[13].picture.thumbnail
															: null
													}
												>
													{article.author.name.slice(0, 1).toUpperCase()}
												</Avatar>

												<Grid item>
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
																<Grid
																	item
																	xs
																	style={{
																		flexGrow: 0,
																		display: `${isParent ? "none" : null}`,
																	}}
																>
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
															<Typography
																style={{
																	fontFamily: "Montserrat",
																	fontSize: "0.8rem",
																}}
															>
																{handleArticleDate(article.createdAt)}
															</Typography>
														</Grid>
													</Grid>
												</Grid>

												<Grid item xs={4}></Grid>
											</Grid>
										</Grid>
										<Grid item xs={6}>
											<Grid container justify='flex-end' alignItems='center'>
												<Grid
													item
													xs
													style={{
														flexGrow: 0,
														display: `${isParent ? "none" : null}`,
													}}
												>
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
							</>
						)}
					</Grid>
				</Grid>
				<Grid xs md={3}></Grid>
			</Grid>

			<Footer></Footer>
		</Fragment>
	);
};

export default ArticlePage;
