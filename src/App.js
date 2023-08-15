import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Alert from "./components/Alert";

function App() {
	return (
		<>
			<NoteState>
				<BrowserRouter>
					<Navbar />
					<Alert alert={{ msg: "this is alert", type: "primary" }} />
					<Routes>
						<Route exact path="/" element={<Home />} />
						<Route exact path="/about" element={<About />} />
					</Routes>
				</BrowserRouter>
			</NoteState>
		</>
	);
}

export default App;
