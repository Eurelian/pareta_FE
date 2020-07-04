import React, { Fragment } from "react";
import image from "../img/404.svg";

const PageNotFound = () => {
	return (
		<Fragment>
			<div
				style={{
					height: "100vh",
					width: "100%",
					backgroundImage: `url(${image})`,
					backgroundSize: "cover",
					backgroundAttachment: "fixed",
					backgroundPosition: "center center",
					backgroundRepeat: "no-repeat",
				}}
			></div>
		</Fragment>
	);
};

export default PageNotFound;
