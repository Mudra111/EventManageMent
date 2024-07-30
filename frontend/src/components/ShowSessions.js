import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./showSessions.css";

export default function ShowSessions() {
	const [sessions, setSessions] = useState([]);
	useEffect(() => {
		if (localStorage.getItem("uid")) {
			fetchSessions();
		}
	}, [localStorage.getItem("uid")]);
	const fetchSessions = async () => {
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
				"https://eventmanagement-elnt.onrender.com/sessions",
				options
			);
			console.log(p);
			let response = await p.json();
			console.log(response.sessions);
			if (response.success) {
				console.log("Sessions Fetched Successfully..");
			} else {
				alert(response.msg);
			}
			setSessions(response.sessions);
		} catch (err) {
			if (err == "Unauthorized") {
				alert("Session expired. Please log in again.");
				window.location.href = "/";
			}
			console.log(err);
		}
	};
	const formatDate = (dateString) => {
		if (dateString) {
			const date = new Date(dateString);
			return date.toISOString().slice(0, 10);
		}
		return;
	};
	return (
		<div className="showSessionMainDiv">
			<span className="goBackLinkShowSession">
				<Link to="/">&larr; Go Back</Link>
			</span>
			<div className="ShowSessionTableDiv">
				<table className="ShowSessionTable">
					<thead>
						<th className="ShowSessionTableHead">LogIn Time</th>
						<th className="ShowSessionTableHead">IP Address</th>
						<th className="ShowSessionTableHead">LogOut Time</th>
					</thead>
					<tbody className="ShowSessionTableBody">
						{sessions.map((session) => (
							<tr key={session._id}>
								<td>
									<p>{formatDate(session.loginTime)}</p>
								</td>
								<td>
									<p>{session.ipAddress}</p>
								</td>
								<td>
									<p>{formatDate(session.logoutTime)}</p>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
