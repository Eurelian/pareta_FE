import React, { useState } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

const EventMap = ({ coord }) => {
	// const position = [lat, lng];
	const position = [coord[0], coord[1]];
	return (
		<Map
			center={position}
			zoom={13}
			style={{
				height: "250px",
				width: "100%",
				marginBottom: "50px",
				marginTop: "25px",
				borderRadius: "20px",
			}}
		>
			<TileLayer
				attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
			/>
			<Marker position={position}>
				<Popup>Event Location</Popup>
			</Marker>
		</Map>
	);
};
export default EventMap;
