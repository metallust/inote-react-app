import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
	const [info, setInfo] = useState({ email: "", password: "" });
	let navigate = useNavigate();
	const host = "http://localhost:5000";

	const onSubmit = async (e) => {
		e.preventDefault();
		let option = {
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
			body: JSON.stringify({
				email: info.email,
				password: info.password,
			}),
		};
		const response = await fetch(host + "/api/auth/login", option);
		const content = await response.json();
		if (!content.success) {
			props.showAlert("Invalid credentials", "danger");
		} else {
			localStorage.setItem("token", content.authtoken);
			props.showAlert("Logged In successfully", "success");
			navigate("/");
		}
	};
	const onchange = (e) => {
		setInfo({ ...info, [e.target.name]: e.target.value });
	};

	return (
		<div className="container">
			<h1>Login</h1>
			<form onSubmit={onSubmit}>
				<div className="mb-3">
					<label htmlFor="username" className="form-label">
						Email address
					</label>
					<input id="username" type="email" className="form-control" required name="email" value={info.email} onChange={onchange} />
				</div>
				<div className="mb-3">
					<label htmlFor="password1" className="form-label">
						Password:
					</label>
					<input id="password1" type="password" className="form-control" minLength={5} maxLength={8} required name="password" value={info.password} onChange={onchange} />
				</div>
				<button type="submit" className="btn btn-secondary">
					Login
				</button>
			</form>
		</div>
	);
}

export default Login;
