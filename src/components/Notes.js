import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import { useNavigate } from "react-router-dom";

function Notes(props) {
	const navigate = useNavigate();
	const { notes, fetchnotes, updateNote } = useContext(noteContext);
	const ref = useRef(null);
	const [newNote, setNewNote] = useState({ title: "", description: "", tags: "" });
	useEffect(() => {
		console.log("use effect in notes.js", localStorage.getItem("token"));
		if (localStorage.getItem("token")) fetchnotes();
		else navigate("/login");
		// eslint-disable-next-line
	}, []);

	const editNote = (note) => {
		ref.current.click();
		setNewNote(note);
	};

	const onChange = (e) => {
		setNewNote({ ...newNote, [e.target.name]: e.target.value });
	};
	return (
		<>
			<button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
				Launch demo modal
			</button>

			<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="exampleModalLabel">
								Edit Note
							</h1>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<div className="mb-3">
								<label htmlFor="title" className="form-label">
									Title
								</label>
								<input type="title" className="form-control" id="title" name="title" value={newNote.title} onChange={onChange} />
							</div>
							<div className="mb-3">
								<label htmlFor="tags" className="form-label">
									Tags
								</label>
								<input type="tags" className="form-control" id="tags" name="tags" value={newNote.tags} onChange={onChange} />
							</div>
							<div className="mb-3">
								<label htmlFor="description" className="form-label">
									Description
								</label>
								<textarea className="form-control" id="description" name="description" value={newNote.description} onChange={onChange} rows="3"></textarea>
							</div>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
								Close
							</button>
							<button
								type="button"
								className="btn btn-primary"
								data-bs-dismiss="modal"
								onClick={() => {
									updateNote(newNote);
									props.showAlert("Updated note successfully", "success");
								}}
							>
								Save changes
							</button>
						</div>
					</div>
				</div>
			</div>

			<h2>Your Notes</h2>
			<div className="row my-3">
				{notes.map((note, index) => (
					<Noteitem note={note} key={index} editNote={() => editNote(note)} showAlert={props.showAlert} />
				))}
			</div>
		</>
	);
}

export default Notes;
