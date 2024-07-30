import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./deleteEvent.css";

export default function ShowEventForDelete() {
	const [events, setEvents] = useState([]);
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
			let p = await fetch("http://localhost:3005/events", options);
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

	const deleteEvent = async (id) => {
		const token = localStorage.getItem("uid");
		const options = {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		};

		try {
			let p = await fetch(`http://localhost:3005/events/${id}`, options);
			console.log(p);
			let response = await p.json();
			console.log(response);
			if (response.success) {
				alert("Event Deleted Successfully..");
			} else {
				alert(response.msg);
			}
		} catch (err) {
			console.log(err);
			if (err == "Unauthorized") {
				alert("Session expired. Please log in again.");
				window.location.href = "/";
			}
		}

		fetchEvents();
	};

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toISOString().slice(0, 10);
	};

	return (
		<div className="deleteEventMainDiv">
			<span className="goBackLinkDLT">
				<Link to="/">&larr; Go Back</Link>
			</span>
			<div className="deleteETableDiv">
				<table className="deleteETable">
					<thead>
						<th className="deleteETableHead">Name</th>
						<th className="deleteETableHead">Description</th>
						<th className="deleteETableHead">Booking Date</th>
						<th className="deleteETableHead">Location</th>
						<th className="deleteETableHead">Update Event</th>
					</thead>
					<tbody className="deleteETableBody">
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
											deleteEvent(event._id);
										}}
										className="DeleteEBtn"
									>
										Delete
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
