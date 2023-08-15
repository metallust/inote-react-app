import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import SignUp from "./components/SignUp";
import NoteState from "./context/notes/NoteState";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Alert from "./components/Alert";
import Login from "./components/Login";
import { useState } from "react";

function App() {
	const [alert, setAlert] = useState({});
	const showAlert = (msg, type) => {
		setAlert({
			msg: msg,
			type: type,
		});
		setTimeout(() => {
			setAlert(null);
		}, 1500);
	};
	return (
		<>
			<NoteState>
				<BrowserRouter>
					<Navbar />
					<Alert alert={alert} />
					<Routes>
						<Route exact path="/" element={<Home showAlert={showAlert} />} />
						<Route exact path="/login" element={<Login showAlert={showAlert} />} />
						<Route exact path="/signup" element={<SignUp showAlert={showAlert} />} />
						<Route exact path="/about" element={<About />} />
					</Routes>
				</BrowserRouter>
			</NoteState>
		</>
	);
}

export default App;
