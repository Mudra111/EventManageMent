import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	// const [error, setError] = useState(null);
	// const [success, setSuccess] = useState(null);

	const handleLogin = async (e) => {
		e.preventDefault();

		const options = {
			method: "POST",
			body: JSON.stringify({
				email: email,
				password: password,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		};

		console.log(options);

		try {
			let p = await fetch("http://localhost:3005/login", options);
			console.log(p);
			let response = await p.json();
			console.log(response);
			if (response.success) {
				localStorage.setItem("uid", response.user.session.access_token);
				alert("login Successfully..");
				window.location.reload();
			} else {
				alert(response.msg);
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="loginMain">
			<div className="subDivLogin">
				<h1 className="loginH1">LogIn</h1>
				<form onSubmit={handleLogin}>
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						className="loginEmailInput"
					/>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						className="loginPassworInput"
					/>
					<button type="submit" className="loginBtn">
						Login
					</button>
				</form>
				<div className="lastDivLogin">
					Don't have an account? <Link to="/register">Register here</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
