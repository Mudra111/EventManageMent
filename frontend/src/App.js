import "./App.css";
import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import EventManagement from "./components/EventManagement";
import BookEvent from "./components/BookEvent";
import DeleteEvent from "./components/DeleteEvent";
import EventForUpdate from "./components/ShowEventForUpdate";
import UpdateEvent from "./components/UpdateEvent";
import ShowEvent from "./components/ShowEvent";
import ShowSessions from "./components/ShowSessions";

function App() {
	const [value, setValue] = useState(null);

	const token = localStorage.getItem("uid");
	const getUser = async () => {
		const { data: user, error } = await supabase.auth.getUser(token);
		if (error) {
			localStorage.removeItem("uid");
			console.log(user);
		}
	};
	useEffect(() => {
		setTimeout(() => {
			getUser();
		}, 1000);
	});

	const handleValueChange = (newValue) => {
		setValue(newValue);
	};

	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const offset = window.scrollY;
			if (offset > 100) {
				setScrolled(true);
			} else {
				setScrolled(false);
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);
	return (
		<div className="App">
			<Router>
				<h1 className={`mainHeading ${scrolled ? "scrolled" : ""}`}>
					Welcome to My Event Management Application
				</h1>
				{!localStorage.getItem("uid") ? (
					<Routes>
						<Route exact path="/register" element={<Register />} />
						<Route exact path="/" element={<Login />} />
					</Routes>
				) : (
					<Routes>
						<Route exact path="/" element={<EventManagement />} />
						<Route exact path="/bookEvent" element={<BookEvent />} />
						<Route exact path="/deleteEvent" element={<DeleteEvent />} />
						<Route exact path="/showEvent" element={<ShowEvent />} />
						<Route exact path="/showSessions" element={<ShowSessions />} />
						<Route
							exact
							path="/events_update"
							element={<EventForUpdate onValueChange={handleValueChange} />}
						/>
						<Route
							exact
							path="/updateEvent"
							element={<UpdateEvent value={value} />}
						/>
					</Routes>
				)}
			</Router>
		</div>
	);
}

export default App;
