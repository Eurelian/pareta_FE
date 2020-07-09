import React from "react";
import { Grid, Box, Typography, Avatar } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

const SkeletonCard = () => {
	const array = Array.from(Array(8).keys());
	return (
		<>
			{array.map((n) => {
				return (
					<Grid
						key={n}
						item
						xs={3}
						style={{
							maxWidth: "300px",
							minWidth: "250px",
							margin: "5px 5px",
							width: "100%",
							marginBottom: "15px",
						}}
					>
						<Skeleton variant='rect' width='100%'>
							<div style={{ paddingTop: "57%" }} />
						</Skeleton>
						<Skeleton width='100%'>
							<Typography>.</Typography>
							<Typography>.</Typography>
							<Typography>.</Typography>
						</Skeleton>
						<Skeleton width='100%'>
							<Typography>.</Typography>
							<Typography>.</Typography>
							<Typography>.</Typography>
						</Skeleton>
						<Box display='flex' alignItems='center'>
							<Box margin={1}>
								<Skeleton variant='circle'>
									<Avatar></Avatar>
								</Skeleton>
							</Box>
							<Box width='100%'>
								<Skeleton width='100%'>
									<Typography>.</Typography>
								</Skeleton>
							</Box>
						</Box>
					</Grid>
				);
			})}
		</>
	);
};

export default SkeletonCard;
