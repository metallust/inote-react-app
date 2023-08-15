import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
	const [notes, setNotes] = useState([]);
	const host = "http://localhost:5000";

	const fetchnotes = async () => {
		let option = {
			method: "GET",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
				"auth-token": localStorage.getItem("token"),
			},
		};
		const response = await fetch(host + "/api/notes/fetchallnotes", option);
		const content = await response.json();
		if (content.success) setNotes(content.notes);
		// else alert
	};

	const addNote = async (note) => {
		let option = {
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
				"auth-token": localStorage.getItem("token"),
			},
			body: JSON.stringify(note),
		};
		const response = await fetch(host + "/api/notes/addnote", option);
		const content = await response.json();
		if (content.success) setNotes(notes.concat(content.note));
		// else alert
	};

	const deleteNote = async (id) => {
		// make del request to local:5000/api/deletenote/:id
		let option = {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
				"auth-token": localStorage.getItem("token"),
			},
		};
		const response = await fetch(host + "/api/notes/deletenote/" + id, option);
		const content = await response.json();
		if (content.success) setNotes(notes.filter((element) => element._id !== id));
		// else alert
	};
	const updateNote = async (note) => {
		// make put request to local:5000/api/updatenote/:id
		let option = {
			method: "PUT",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
				"auth-token": localStorage.getItem("token"),
			},
			body: JSON.stringify({ title: note.title, description: note.description, tags: note.tags }),
		};
		const response = await fetch(host + "/api/notes/updatenote/" + note._id, option);
		const content = await response.json();
		if (content.success) setNotes(notes.map((element) => (element._id === note._id ? note : element)));
		// else alert
	};
	return <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, updateNote, fetchnotes }}>{props.children}</NoteContext.Provider>;
};

export default NoteState;
