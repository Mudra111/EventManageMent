// import React from "react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./showEventForUpdate.css";

export default function ShowEventForUpdate({ onValueChange }) {
	const [events, setEvents] = useState([]);
	const navigate = useNavigate();
	const [i_d, setId] = useState(null);
	useEffect(() => {
		if (localStorage.getItem("uid")) {
			fetchEvents();
		}
	}, [localStorage.getItem("uid")]);
	const fetchEvents = async () => {
		const token = localStorage.getItem("uid");
		const options = {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		};

		try {
			let p = await fetch(
				"https://eventmanagement-elnt.onrender.com/events",
				options
			);
			console.log(p);
			let response = await p.json();
			console.log(response);
			if (response.success) {
				console.log("Events Fetched Successfully..");
			} else {
				alert(response.msg);
			}
			setEvents(response.events);
		} catch (err) {
			if (err == "Unauthorized") {
				alert("Session expired. Please log in again.");
				window.location.href = "/";
			}
			console.log(err);
		}
	};
	const handleClick = (id) => {
		onValueChange(id);
		navigate("/updateEvent");
	};
	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toISOString().slice(0, 10);
	};
	return (
		<div className="EventSFUMainDiv">
			<span className="goBackLinkUP">
				<Link to="/">&larr; Go Back</Link>
			</span>
			<div className="EventSFUTableDiv">
				<table className="EventSFUTable">
					<thead>
						<th className="EventSFUTableHead">Name</th>
						<th className="EventSFUTableHead">Description</th>
						<th className="EventSFUTableHead">Booking Date</th>
						<th className="EventSFUTableHead">Location</th>
						<th className="EventSFUTableHead">Update Event</th>
					</thead>
					<tbody className="EventSFUTableBody">
						{events.map((event) => (
							<tr key={event._id}>
								<td>
									<p>{event.event_name}</p>
								</td>
								<td>
									<p>{event.description}</p>
								</td>
								<td>
									<p>{formatDate(event.BookFor)}</p>
								</td>
								<td>
									<p>{event.location}</p>
								</td>
								<td>
									<button
										onClick={() => {
											setId(event._id);
											handleClick(event._id);
										}}
										className="EventSFUUpdateBtn"
									>
										Update
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
