import React from "react";
import { Grid, Box, Typography, Avatar } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

const SkeletonPage = () => {
	const array = Array.from(Array(8).keys());
	return (
		<>
			<Grid
				style={{
					maxWidth: "60%",

					height: "100vh",
					margin: "0 auto",
					marginTop: "50px",
					width: "100%",
					marginBottom: "15px",
				}}
			>
				<Typography variant='h1'>
					<Skeleton></Skeleton>
				</Typography>
				<Box display='flex' alignItems='center'>
					<Box margin={1}>
						<Skeleton variant='circle'>
							<Avatar></Avatar>
						</Skeleton>
					</Box>
					<Box width='15%'>
						<Skeleton width='100%'>
							<Typography>.</Typography>
						</Skeleton>
					</Box>
				</Box>
				{array.map((i) => {
					return (
						<Skeleton key={i} width='100%'>
							<Typography>.</Typography>
						</Skeleton>
					);
				})}
				<Typography variant='h1'>
					<Skeleton width='50%'></Skeleton>
				</Typography>
				{array.map((i) => {
					return (
						<Skeleton key={i} width='100%'>
							<Typography>.</Typography>
						</Skeleton>
					);
				})}
				{array.map((i) => {
					return (
						<Skeleton key={i} width='100%'>
							<Typography>.</Typography>
						</Skeleton>
					);
				})}
				<Typography variant='h1'>
					<Skeleton width='50%'></Skeleton>
				</Typography>
			</Grid>
		</>
	);
};

export default SkeletonPage;
