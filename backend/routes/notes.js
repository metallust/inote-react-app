const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// define the router after api/notes/

// Route 1: Fetches all the notes of the user Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
	try {
		const userid = req.userid;
		const notes = await Notes.find({ user: userid });
		res.json({ success: true, message: "This are all the notes", notes });
		console.log(userid, "User fetched all the notes");
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, error: "Internal error", message: error.message });
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
			return res.json({ success: false, message: "Invalid inputs", errors: errors.array() });
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
			res.json({ success: true, message: "The note has been added to the database", note: savednotes });
			console.log(userid, " User added note");
		} catch (error) {
			console.log(error);
			res.status(500).json({ success: false, error: "Internal error", message: error.message });
		}
	}
);

// Route 3: update note
router.put(
	"/updatenote/:id",
	fetchuser,
	[body("title", "Enter a valid title (should be atleast 3 char)").isLength({ min: 3 }), body("description", "Enter a valid description...").exists()],
	async (req, res) => {
		const { title, description, tags } = req.body;
		const userid = req.userid;
		const noteid = req.params.id.trim();
		// returning invalid info if any
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.json({ success: false, message: "Invalid inputs", errors: errors.array() });
		}

		// creating a new note
		let newnote = {};
		if (title) newnote.title = title;
		if (description) newnote.description = description;
		if (tags) newnote.tags = tags;
		// find the route to be updated and update it

		try {
			// checking if the note exist
			let note = await Notes.findById(noteid);
			if (!note) return res.status(400).json({ success: false, message: "Not found" });

			// checking if the request is from a valid user
			if (note.user.toString() !== userid) return res.status(401).json({ success: false, message: "Not Allowed" });

			// updating the note in the database
			note = await Notes.findByIdAndUpdate(noteid, { $set: newnote }, { new: true });
			res.json({ success: true, message: "The note has been updated" });
			console.log(userid, " User updated note ", noteid);
		} catch (error) {
			console.log(error);
			res.status(500).json({ success: false, error: "Internal error", message: error.message });
		}
	}
);

// Route 4: delete note
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
	try {
		const userid = req.userid;
		const noteid = req.params.id;

		// check if the note exists
		let note = await Notes.findById(noteid);
		if (!note) return res.status(400).json({ success: false, message: "Not found" });

		// check if the note belongs to the user
		if (note.user.toString() !== userid) return res.status(401).json({ success: false, message: "Not Allowed" });
		note = await Notes.findByIdAndDelete(noteid);
		res.json({ success: true, message: "The note has been deleted" });
		console.log(userid, " User deleted note ", noteid);
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, error: "Internal error", message: error.message });
	}
});
module.exports = router;
