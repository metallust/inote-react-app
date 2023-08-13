import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";

function Home() {
	const { notes, setNotes } = useContext(noteContext);
	return (
		<div className="container">
			<h2>Add note</h2>
			<form>
				<div className="mb-3">
					<label htmlFor="exampleFormControlInput1" className="form-label">
						Title
					</label>
					<input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Title" />
				</div>
				<div className="mb-3">
					<label htmlFor="exampleFormControlTextarea1" className="form-label">
						Description
					</label>
					<textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
				</div>
				<button type="submit" className="btn btn-secondary">
					Submit
				</button>
			</form>
			<h2>Your Notes</h2>
			<div className="row my-3">
				{notes.map((element, index) => (
					<Noteitem note={element} key={index} />
				))}
			</div>
		</div>
	);
}

export default Home;
