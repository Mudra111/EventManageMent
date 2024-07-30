import React from "react";
import "./eventManagement.css";
// import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";
import Img from "./Images/event-planning-tradeshow-1536x1024.jpg";

export default function EventManagement() {
	const logOut = async () => {
		const token = localStorage.getItem("uid");
		const options = {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		};

		try {
			let p = await fetch("http://localhost:3005/logout", options);
			console.log(p);
			let response = await p.json();
			console.log(response);
			if (response.success) {
				alert("Logout Successfully..");
				localStorage.removeItem("uid");
				window.location.reload();
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
	};

	return (
		<div className="eventManagementMainDiv">
			<div className="suvDivEventManagement">
				<div className="flexDiv1EM">
					<img src={Img} alt="Flower Pot" className="ImageFlexdiv1EM" />
					<button className="logoutBtn" onClick={logOut}>
						Logout
					</button>
				</div>
				<div className="flexDiv2EM">
					<button className="addEventBtn">
						<Link to="/bookEvent">Book Event</Link>
					</button>
					<button className="updateEventBtn">
						<Link to="/events_update">Update Event</Link>
					</button>
					<button className="deleteEventBtn">
						<Link to="/deleteEvent">Delete Event</Link>
					</button>
					<button className="showEventBtn">
						<Link to="/showEvent">Show Events</Link>
					</button>
					<button className="getSessionBtn">
						<Link to="/showSessions">Get Sessions</Link>
					</button>
				</div>
			</div>
		</div>
	);
}
