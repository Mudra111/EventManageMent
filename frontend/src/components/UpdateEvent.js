import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./updateEvent.css";

export default function UpdateEvent({ value }) {
	console.log({ value });
	const [description, setDescription] = useState("");
	const [event_name, setEventName] = useState("");
	const [bookFor, setBookFor] = useState("");
	const [location, setLocation] = useState("");
	const [weather, setWeather] = useState("");
	const [weatherMsg, setWeatherMsg] = useState("");
	const updateEvent = async (e) => {
		e.preventDefault();

		const token = localStorage.getItem("uid");
		console.log(token);
		const options = {
			method: "PUT",
			body: JSON.stringify({
				event_name: event_name,
				description: description,
				BookFor: bookFor,
				location: location,
			}),
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		};

		try {
			let p = await fetch(`http://localhost:3005/events/${value}`, options);
			console.log(p);
			let response = await p.json();
			console.log(response);
			if (response.success) {
				alert("Event Updated Successfully..");
				window.location.href = "/events_update";
			} else {
				alert(response.msg);
			}
		} catch (err) {
			if (err == "Unauthorized") {
				alert("Session expired. Please log in again.");
				window.location.href = "/";
			}
			console.log(err);
		}

		setDescription("");
		setEventName("");
		setBookFor("");
		setLocation("");
	};

	const getWeather = async (e) => {
		// e.preventDefault();

		const token = localStorage.getItem("uid");
		console.log(token);
		const options = {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		};

		try {
			let p = await fetch(`http://localhost:3005/weather/${location}`, options);
			console.log(p);
			let response = await p.json();
			console.log(response.temperature);
			if (response) {
				console.log("Weather Fetched Successfully..");
				setWeather(response.temperature);
				setWeatherMsg("");
			} else {
			}
		} catch (err) {
			// alert(response.msg);
			setWeather("");
			setWeatherMsg("Please Enter valid Location!!");
		}
	};
	return (
		<div className="updateEventMainDiv">
			<div className="updateEventSubDiv">
				<span className="goBackLink">
					<Link to="/events_update">&larr; Go Back</Link>
				</span>
				<h1 className="updateEventH1">Update Event</h1>
				<form onSubmit={updateEvent}>
					<input
						type="text"
						placeholder="Event"
						value={event_name}
						onChange={(e) => setEventName(e.target.value)}
						required
						className="updateEventNameInput"
					/>
					<input
						type="text"
						placeholder="Description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						required
						className="updateEventDescrInput"
					/>
					<input
						type="date"
						placeholder="Booking Date"
						value={bookFor}
						onChange={(e) => setBookFor(e.target.value)}
						required
						className="updateEventbookDateInput"
					/>
					<input
						type="text"
						placeholder="Location"
						value={location}
						onChange={(e) => {
							setLocation(e.target.value);
						}}
						required
						className="updateEventLocationInput"
					/>
					<p style={{ color: "white" }}>{weatherMsg}</p>
					<div className="getWeatherDiv">
						<p>
							<a onClick={getWeather}>Get Weather :</a>
						</p>
						<p>{weather}</p>
					</div>
					<button type="submit" className="updateventBtn">
						Update
					</button>
				</form>
			</div>
		</div>
	);
}
