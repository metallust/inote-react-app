import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = () => {
	const { addNote } = useContext(noteContext);
	const [note, setNote] = useState({ title: "", description: "", tags: "General" });
	const handleAdd = (e) => {
		console.log(note);
		e.preventDefault();
		addNote(note);
		setNote({ title: "", description: "", tags: "General" });
	};
	const onChange = (e) => {
		setNote({ ...note, [e.target.name]: e.target.value });
	};

	return (
		<>
			<h2>Add note</h2>
			<form>
				<div className="mb-3">
					<label htmlFor="title" className="form-label">
						Title
					</label>
					<input type="title" className="form-control" id="title" name="title" value={note.title} onChange={onChange} />
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
					<textarea className="form-control" id="description" name="description" value={note.description} onChange={onChange} rows="3"></textarea>
				</div>
				<button type="submit" className="btn btn-secondary" onClick={handleAdd}>
					Add
				</button>
			</form>
		</>
	);
};

export default AddNote;
