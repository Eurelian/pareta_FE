import React, {
	Fragment,
	useRef,
	useState,
	useEffect,
	useContext,
} from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Typography, Avatar, Grid } from "@material-ui/core/";
import ButtonLight from "../components/ui/ButtonLight";
import { Link } from "react-router-dom";

import eventContext from "../components/contexts/eventContext";

const NearMeMap = ({ getCoord }) => {
	const [hasLocation, setHasLocation] = useState(false);
	const [latlng, setLatlng] = useState({ lat: 0, lng: 0, zoom: 0 });

	const { eventData } = useContext(eventContext);
	const mapRef = useRef(null);

	useEffect(() => {
		const map = mapRef.current;
		if (map != null) {
			map.leafletElement.locate({ setView: true, maxZoom: 16 });
		}
	}, []);

	const handleLocationFound = (e) => {
		setHasLocation(true);
		setLatlng(e.latlng);
	};

	const marker = hasLocation ? (
		<Marker style={{ background: "red" }} position={latlng}>
			<Popup>
				<Grid container direction='column' alignItems='center'>
					<Typography style={{ margin: "0 auto" }}>
						<span role='img'>👪</span>
					</Typography>
					<Typography>You are here</Typography>
				</Grid>
			</Popup>
		</Marker>
	) : null;

	return (
		<Fragment>
			{console.log(eventData)}
			<Map
				ref={mapRef}
				onLocationfound={handleLocationFound}
				center={latlng}
				zoom={latlng.zoom > 0 ? latlng.zoom : 13}
				style={{
					height: "60vh",
					width: "100%",
					marginBottom: "50px",
					marginTop: "25px",
					borderRadius: "20px",
				}}
			>
				<TileLayer
					attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url='https://api.mapbox.com/styles/v1/eurelian/ckcauyasf14191it8sp7l42wb/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZXVyZWxpYW4iLCJhIjoiY2tjYXY2YnRpMXlubDJ2bWdrdGpzeGZpcyJ9.sdU919fikTtC6bDXCi1b4g'
				/>
				{marker}
				{eventData
					? eventData
							.filter((event) => event.geometry.coordinates !== undefined)
							.map((event) => (
								<>
									<Marker
										position={[
											event.geometry.coordinates[0],
											event.geometry.coordinates[1],
										]}
									>
										<Popup>
											<Grid container direction='column' alignItems='center'>
												<Typography
													style={{
														fontFamily: "Raleway",
														fontWeight: "bold",
														alignText: "center",
														color: "#39364f",
													}}
												>
													"{event.name}"
												</Typography>
												<Typography
													style={{ fontFamily: "Montserrat", color: "#39364f" }}
												>
													{event.size - event.attending.length} spots left
												</Typography>
												<Grid item xs>
													<Grid container alignItems='center'>
														<Avatar
															style={{
																width: "25px",
																height: "25px",
																margin: 0,
															}}
														>
															{event.organizer.name.slice(0, 1).toUpperCase()}
														</Avatar>
														<Typography
															style={{
																fontFamily: "Montserrat",
																fontSize: "0.8rem",
																marginLeft: "10px",
																color: "#39364f",
															}}
														>
															{event.organizer.name}
														</Typography>
													</Grid>
												</Grid>
												<Link
													to={`/events/${event._id}`}
													style={{
														textDecoration: "none",
														width: "50%",
														padding: "20px",
													}}
												>
													<ButtonLight
														// style={{
														// 	background: "#E2CFF2",
														// 	color: "white",
														// 	fontFamily: "Montserrat",
														// 	fontWeight: "400",
														// 	"&:hover": { background: "red" },
														// }}
														text={"Details"}
													></ButtonLight>
												</Link>
											</Grid>
										</Popup>
									</Marker>
								</>
							))
					: null}
			</Map>
		</Fragment>
	);
};

export default NearMeMap;
