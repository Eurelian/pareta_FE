import React, { Fragment, useRef, useState, useEffect } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

const LocationMap = ({ getCoord }) => {
	const [hasLocation, setHasLocation] = useState(false);
	const [latlng, setLatlng] = useState({ lat: 0, lng: 0, zoom: 0 });

	const mapRef = useRef(null);

	useEffect(() => {
		const map = mapRef.current;
		if (map != null) {
			map.leafletElement.locate({ setView: true });
		}
	}, []);

	const handleClick = (e) => {
		const map = mapRef.current;
		if (map != null) {
			console.log(e.latlng);
			setHasLocation(true);
			setLatlng({ ...latlng, lat: e.latlng.lat, lng: e.latlng.lng, zoom: 17 });
			getCoord(e.latlng.lat, e.latlng.lng);
		}
	};

	const marker = hasLocation ? (
		<Marker position={latlng}>
			<Popup>Event Location</Popup>
		</Marker>
	) : null;

	return (
		<Fragment>
			<Map
				ref={mapRef}
				onClick={handleClick}
				center={latlng}
				zoom={latlng.zoom > 0 ? latlng.zoom : 13}
				style={{
					height: "40vh",
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
			</Map>
		</Fragment>
	);
};

export default LocationMap;
