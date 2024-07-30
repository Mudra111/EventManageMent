import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./bookEvent.css";

export default function BookEvent() {
	const [description, setDescription] = useState("");
	const [event_name, setEventName] = useState("");
	const [bookFor, setBookFor] = useState("");
	const [location, setLocation] = useState("");
	const [weather, setWeather] = useState("");
	const [weatherMsg, setWeatherMsg] = useState("");
	const BookEvent = async (e) => {
		e.preventDefault();

		const token = localStorage.getItem("uid");
		console.log(token);
		const options = {
			method: "POST",
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
			let p = await fetch("http://localhost:3005/events", options);
			console.log(p);
			let response = await p.json();
			console.log(response);
			if (response.success) {
				alert("Event Booked Successfully..");
				window.location.href = "/";
			} else {
				alert(response.msg);
			}
		} catch (err) {
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
			// console.log(response);
			if (response) {
				console.log("Weather Fetched Successfully..");
				setWeather(`${response.temperature} Celsius`);
			} else {
			}
		} catch (err) {
			// alert(response.msg);
			if (err == "Unauthorized") {
				alert("Session expired. Please log in again.");
				window.location.href = "/";
			}
			setWeatherMsg("Please Enter valid Location!!");
		}

		// setLocation("");
	};
	return (
		<div className="bookEventMainDiv">
			<div className="bookEventSubDiv">
				<span className="goBackLink">
					<Link to="/">&larr; Go Back</Link>
				</span>
				<h1 className="bookEventH1">Book Event</h1>
				<form onSubmit={BookEvent}>
					<input
						type="text"
						placeholder="Event"
						value={event_name}
						onChange={(e) => setEventName(e.target.value)}
						required
						className="bookEventNameInput"
					/>
					<input
						type="text"
						placeholder="Description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						required
						className="bookEventDescrInput"
					/>
					<input
						type="date"
						placeholder="Booking Date"
						value={bookFor}
						onChange={(e) => setBookFor(e.target.value)}
						required
						className="bookEventbookDateInput"
					/>
					<input
						type="text"
						placeholder="Location"
						value={location}
						onChange={(e) => {
							setLocation(e.target.value);
						}}
						required
						className="bookEventLocationInput"
					/>
					<p style={{ color: "white" }}>{weatherMsg}</p>
					<div className="getWeatherDiv">
						<p>
							<a onClick={getWeather}>Get Weather :</a>
						</p>
						<p>{weather}</p>
					</div>
					<button type="submit" className="bookEventBtn">
						Book
					</button>
				</form>
			</div>
		</div>
	);
}
