import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
	const { addNote } = useContext(noteContext);
	const [note, setNote] = useState({ title: "", description: "", tags: "General" });
	const handleAdd = (e) => {
		e.preventDefault();
		addNote(note);
		setNote({ title: "", description: "", tags: "General" });
		props.showAlert("Note added successfully", "success");
	};
	const onChange = (e) => {
		setNote({ ...note, [e.target.name]: e.target.value });
	};

	return (
		<>
			<h2>Add note</h2>
			<form onSubmit={handleAdd}>
				<div className="mb-3">
					<label htmlFor="title" className="form-label">
						Title
					</label>
					<input type="title" className="form-control" id="title" name="title" value={note.title} onChange={onChange} minLength={3} required />
				</div>
				<div className="mb-3">
					<label htmlFor="tags" className="form-label">
						Tags
					</label>
					<input type="tags" className="form-control" id="tags" name="tags" value={note.tags} onChange={onChange} />
				</div>
				<div className="mb-3">
					<label htmlFor="description" className="form-label">
						Description
					</label>
					<textarea className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={3} required rows="3"></textarea>
				</div>
				<button type="submit" className="btn btn-secondary">
					Add
				</button>
			</form>
		</>
	);
};

export default AddNote;
