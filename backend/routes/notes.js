const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// Route 1: Fetches all the notes of the user Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
	try {
		const userid = req.userid;
		const notes = await Notes.find({ user: userid });
		res.json(notes);
		console.log(userid, " User fetched all the notes");
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Some error occured", message: error.message });
	}
});

// Route 2: add notes
router.post(
	"/addnote",
	fetchuser,
	[body("title", "Enter a valid title (should be atleast 3 char)").isLength({ min: 3 }), body("description", "Enter a valid description...").exists()],
	async (req, res) => {
		const userid = req.userid;
		// returning invalid info if any
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.json({ errors: errors.array() });
		}

		try {
			const { title, description, tags } = req.body;
			let notes = await Notes.create({
				title,
				description,
				tags,
				user: userid,
			});
			let savednotes = await notes.save();
			res.json(savednotes);
			console.log(userid, " User added note");
		} catch (error) {
			console.log(error);
			res.status(500).json({ error: "Some error occured", message: error.message });
		}
	}
);

// Route 3: update note
router.put("/updatenote/:id", fetchuser, async (req, res) => {
	const { title, description, tags } = req.body;
	const userid = req.userid;
	const noteid = req.params.id.trim();

	// creating a new note
	let newnote = {};
	if (title) newnote.title = title;
	if (description) newnote.description = description;
	if (tags) newnote.tags = tags;
	// find the route to be updated and update it

	try {
		let note = await Notes.findById(noteid);
		if (!note) return res.status(400).json({ error: "Not found" });
		if (note.user.toString() !== userid) return res.status(401).json({ error: "Not Allowed" });
		note = await Notes.findByIdAndUpdate(noteid, { $set: newnote }, { new: true });
		res.json(note);
		console.log(userid, " User updated note ", noteid);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Internal server error" });
	}
});
module.exports = router;

// Route 4: delete note
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
	try {
		const userid = req.userid;
		const noteid = req.params.id;
		// check if the note exists
		let note = await Notes.findById(noteid);
		if (!note) return res.status(400).json({ error: "Not found" });
		// check if the note belongs to the user
		if (note.user.toString() !== userid) return res.status(401).json({ error: "Not Allowed" });
		note = await Notes.findByIdAndDelete(noteid);
		res.json({ sucess: "deleted", note: note });
		console.log(userid, " User deleted note ", noteid);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Internal server error" });
	}
});
module.exports = router;
