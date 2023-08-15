import React from "react";
import AddNote from "./AddNote";
import Notes from "./Notes";

function Home() {
	return (
		<div className="container">
			<AddNote />
			<Notes />
		</div>
	);
}

export default Home;
