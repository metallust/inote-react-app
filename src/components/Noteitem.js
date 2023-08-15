import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

function Noteitem(props) {
	const { note, editNote } = props;
	const { deleteNote } = useContext(noteContext);
	const handledelete = () => {
		deleteNote(note._id);
	};
	return (
		<div className="col-sm-12 col-md-4 col-lg-3">
			<div className="card m-2">
				<div className="card-body">
					<div className="d-flex align-items-center">
						<h5 className="card-title">{note.title}</h5>
						<i className="fa-solid fa-trash mx-2" onClick={handledelete}></i>
						<i className="fa-solid fa-pen-to-square mx-2" onClick={editNote}></i>
					</div>
					<p className="card-text">{note.description}</p>
				</div>
			</div>
		</div>
	);
}

export default Noteitem;
