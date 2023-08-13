import React from "react";

function Noteitem(props) {
	const { note } = props;
	return (
		<div className="col-sm-12 col-md-3 col-lg-2">
			<div className="card m-2">
				<div className="card-body">
					<h5 className="card-title">{note.title}</h5>
					<p className="card-text">{note.description}</p>
				</div>
			</div>
		</div>
	);
}

export default Noteitem;
