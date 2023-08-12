const express = require("express");
const router = express.Router();
const User = require("../models/User");

// define the home page route
router.post("/", (req, res) => {
	console.log(req.body);
	const user = User(req.body);
	user.save();
	res.json(req.body);
});
// define the about route
router.get("/about", (req, res) => {
	res.send("About Auth");
});

module.exports = router;
