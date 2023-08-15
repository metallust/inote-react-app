import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp(props) {
	const [info, setInfo] = useState({ name: "", email: "", password: "", confirmpassword: "" });
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
				name: info.name,
				email: info.email,
				password: info.password,
			}),
		};
		const response = await fetch(host + "/api/auth/createuser", option);
		const content = await response.json();
		if (!content.success) {
			props.showAlert("Email is already register", "danger");
		} else {
			localStorage.setItem("token", content.authtoken);
			props.showAlert("User created successfully", "success");
			navigate("/");
		}
	};
	const onchange = (e) => {
		setInfo({ ...info, [e.target.name]: e.target.value });
	};
	return (
		<>
			<div className="container">
				<h1>Create new account</h1>
				<form
					onSubmit={onSubmit}
					onInput={() => {
						const up2 = document.querySelector("#password2");
						const up = document.querySelector("#password1");
						up2.setCustomValidity(up2.value !== up.value ? "Passwords do not match." : "");
					}}
				>
					<div className="mb-3">
						<label htmlFor="username" className="form-label">
							Name
						</label>
						<input className="form-control" required name="name" value={info.name} onChange={onchange} />
					</div>
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

					<div className="mb-3">
						<label htmlFor="password2" className="form-label">
							Confirm password:
						</label>
						<input id="password2" type="password" className="form-control" name="confirmpassword" value={info.confirmpassword} onChange={onchange} />
					</div>
					<button type="submit" className="btn btn-secondary">
						Submit
					</button>
				</form>
			</div>
		</>
	);
}

export default SignUp;
