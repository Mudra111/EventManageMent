import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./showEvent.css";

export default function ShowEvent() {
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
	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toISOString().slice(0, 10);
	};
	return (
		<div className="showEventMainDiv">
			<span className="goBackLinkShowEvent">
				<Link to="/">&larr; Go Back</Link>
			</span>
			<div className="ShowEventTableDiv">
				<table className="ShowEventTable">
					<thead>
						<th className="ShowEventTableHead">Name</th>
						<th className="ShowEventTableHead">Description</th>
						<th className="ShowEventTableHead">Booking Date</th>
						<th className="ShowEventTableHead">Location</th>
					</thead>
					<tbody className="ShowEventTableBody">
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
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
