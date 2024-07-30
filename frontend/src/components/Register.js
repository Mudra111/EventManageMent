import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";

const Register = () => {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	// const [error, setError] = useState(null);
	// const [success, setSuccess] = useState(null);

	const handleRegister = async (e) => {
		e.preventDefault();

		const options = {
			method: "POST",
			body: JSON.stringify({
				name: name,
				email: email,
				password: password,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		};

		console.log(options);

		try {
			let p = await fetch(
				"https://eventmanagement-elnt.onrender.com/register",
				options
			);
			console.log(p);
			let response = await p.json();
			console.log(response);
			if (response.success) {
				alert("Registered Successfully..");
			} else {
				alert(response.msg);
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="registerMain">
			<div className="registerSubDiv">
				<h1 className="registerH1">Register</h1>
				<form onSubmit={handleRegister}>
					<input
						type="text"
						placeholder="UserName"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
						className="registerNameInput"
					/>
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						className="registerEmailInput"
					/>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						className="registerPassworInput"
					/>
					<button type="submit" className="registerBtn">
						Register
					</button>
				</form>
				<div className="lastDivRegister">
					Already have an account? <Link to="/">Login here</Link>
				</div>
			</div>
		</div>
	);
};

export default Register;
