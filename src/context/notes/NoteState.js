import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
	const [notes, setNotes] = useState([]);
	const [authToken, setAuthToken] = useState(
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjRkN2Q4NTcxMDUyODQ3OWI0MDYyNzc3IiwiaWF0IjoxNjkxODY3MjQ5fQ.dg1fKp-YE8QuZpoY21vZ7TmTQXkn_qbGz1M3C0CIa6c"
	);
	const host = "http://localhost:5000";

	const fetchnotes = async () => {
		let option = {
			method: "GET",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
				"auth-token": authToken,
			},
		};
		const response = await fetch(host + "/api/notes/fetchallnotes", option);
		const notes = await response.json();
		setNotes(notes);
	};

	const addNote = async (note) => {
		let option = {
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
				"auth-token": authToken,
			},
			body: JSON.stringify(note),
		};
		console.log(option.body);
		const response = await fetch(host + "/api/notes/addnote", option);
		const savednotes = await response.json();

		// setNotes(notes);
		setNotes(notes.concat(savednotes));
	};

	const deleteNote = async (id) => {
		// make del request to local:5000/api/deletenote/:id
		let option = {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
				"auth-token": authToken,
			},
		};
		const response = await fetch(host + "/api/notes/deletenote/" + id, option);
		const savednotes = await response.json();
		console.log(savednotes);

		setNotes(notes.filter((element) => element._id !== id));
	};
	const updateNote = async (note) => {
		// make put request to local:5000/api/updatenote/:id
		let option = {
			method: "PUT",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
				"auth-token": authToken,
			},
			body: JSON.stringify({ title: note.title, description: note.description, tags: note.tags }),
		};
		const response = await fetch(host + "/api/notes/updatenote/" + note._id, option);
		const result = await response.json();
		// console.log(updatednote);

		// client side
		setNotes(notes.map((element) => (element._id === note._id ? note : element)));
	};
	return <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, updateNote, fetchnotes, authToken, setAuthToken }}>{props.children}</NoteContext.Provider>;
};

export default NoteState;
