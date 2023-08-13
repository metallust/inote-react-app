import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
	const [notes, setNotes] = useState([
		{
			_id: "64d7dcc7d50a87d921aa220a",
			user: "64d7d85710528479b4062777",
			title: "My goals",
			description: "to master linus",
			tags: "personal",
			__v: 0,
		},
		{
			_id: "64d7dcc8d50a87d921aa220c",
			user: "64d7d85710528479b4062777",
			title: "My goals",
			description: "to master linus",
			tags: "personal",
			__v: 0,
		},
		{
			_id: "64d7dcc9d50a87d921aa220e",
			user: "64d7d85710528479b4062777",
			title: "My goals",
			description: "to master linus",
			tags: "personal",
			__v: 0,
		},
		{
			_id: "64d7dccad50a87d921aa2210",
			user: "64d7d85710528479b4062777",
			title: "My goals",
			description: "to master linus",
			tags: "personal",
			__v: 0,
		},
		{
			_id: "64d7dccad50a87d921aa2210",
			user: "64d7d85710528479b4062777",
			title: "My goals",
			description: "to master linus",
			tags: "personal",
			__v: 0,
		},
		{
			_id: "64d7dccad50a87d921aa2210",
			user: "64d7d85710528479b4062777",
			title: "My goals",
			description: "to master linus",
			tags: "personal",
			__v: 0,
		},
		{
			_id: "64d7dccad50a87d921aa2210",
			user: "64d7d85710528479b4062777",
			title: "My goals",
			description: "to master linus",
			tags: "personal",
			__v: 0,
		},
		{
			_id: "64d7dccad50a87d921aa2210",
			user: "64d7d85710528479b4062777",
			title: "My goals",
			description: "to master linus",
			tags: "personal",
			__v: 0,
		},
		{
			_id: "64d7dccad50a87d921aa2210",
			user: "64d7d85710528479b4062777",
			title: "My goals",
			description: "to master linus",
			tags: "personal",
			__v: 0,
		},
		{
			_id: "64d7dccad50a87d921aa2210",
			user: "64d7d85710528479b4062777",
			title: "My goals",
			description: "to master linus",
			tags: "personal",
			__v: 0,
		},
	]);
	return <NoteContext.Provider value={{ notes, setNotes }}>{props.children}</NoteContext.Provider>;
};

export default NoteState;
