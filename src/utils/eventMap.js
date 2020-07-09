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
				attribution='&amp;copy <a href="http://osm.org/copyright"></a> contributors'
				url='https://api.mapbox.com/styles/v1/eurelian/ckcauyasf14191it8sp7l42wb/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZXVyZWxpYW4iLCJhIjoiY2tjYXY2YnRpMXlubDJ2bWdrdGpzeGZpcyJ9.sdU919fikTtC6bDXCi1b4g
'
			/>
			<Marker position={position}>
				<Popup>Event Location</Popup>
			</Marker>
		</Map>
	);
};
export default EventMap;
