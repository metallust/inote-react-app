const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECREAT = "bittersweetjoy";
// define the the router after api/auth/
// Router 1: this is for creating the new user
router.post(
	// path
	"/createuser",
	// express validator check if the info in the request is valid
	[
		body("name", "Name can't be less that 3 character").isLength({ min: 3 }),
		body("email", "Give a valid Emal ..").isEmail(),
		body("password", "Password should be greater than 5 characters").isLength({ min: 5 }),
	],
	// function which handles the createuser endpoint
	async (req, res) => {
		// returning invalid info if any
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.json({ errors: errors.array() });
		}
		// creating a hash of the password using bcryptjs
		const salt = await bcryptjs.genSalt(10);
		const paswordhash = await bcryptjs.hash(req.body.password, salt);

		try {
			// checking if the email is already registered
			let user = await User.findOne({ email: req.body.email });
			if (user) return res.status(400).json({ error: "Enter another Email id ..." });

			// adding the info to the database
			user = await User.create({
				name: req.body.name,
				email: req.body.email,
				password: paswordhash,
			});

			// creating a authtoken using jsonwebtoken
			const data = {
				user: user.id,
			};
			const authtoken = jwt.sign(data, JWT_SECREAT);
			res.json({ authtoken });
		} catch (error) {
			console.log(error);
			res.status(500).json({ error: "Some error occured", message: error.message });
		}
	}
);

//Router 2: to login the user
router.post("/login", [body("email", "not a valid email").isEmail(), body("password", "password can't be blank").exists()], async (req, res) => {
	// returning invalid info if any
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.json({ errors: errors.array() });
	}
	try {
		// fetching the user
		let user = await User.findOne({ email: req.body.email });
		if (!user) return res.status(400).json({ error: "Please try login with correct credentials" });
		const bcryptjscompare = await bcryptjs.compare(req.body.password, user.password);
		if (!bcryptjscompare) return res.status(400).json({ error: "Please try login with correct credentials" });
		// creating a authtoken using jsonwebtoken
		const data = {
			user: user.id,
		};
		const authtoken = jwt.sign(data, JWT_SECREAT);
		res.json({ authtoken, db: user, user: req.body, bcryptjscompare: bcryptjscompare });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Some error occured", message: error.message });
	}
});

// Route 3: give user data to authenicated users

// define the about route
router.post("/getuser", fetchuser, async (req, res) => {
	try {
		const userid = req.userid;
		let user = await User.findById(userid);
		res.send(user);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Some error occured", message: error.message });
	}
});

module.exports = router;
