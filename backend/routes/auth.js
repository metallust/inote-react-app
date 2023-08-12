const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECREAT = "bittersweetjoy";
// define the home page route
router.post(
	"/createuser",
	[
		body("name", "Name can't be less that 3 character").isLength({ min: 3 }),
		body("email", "Give a valid Emal ..").isEmail(),
		body("password", "Password should be greater than 5 characters").isLength({ min: 5 }),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return json({ errors: errors.array() });
		}

		const salt = await bcryptjs.genSalt(10);
		const paswordhash = await bcryptjs.hash(req.body.password, salt);

		try {
			let user = await User.findOne({ email: req.body.email });
			if (user) return res.status(400).json({ error: "Enter another Email id ..." });
			user = await User.create({
				name: req.body.name,
				email: req.body.email,
				password: paswordhash,
			});

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
// define the about route
router.get("/about", (req, res) => {
	res.send("About Auth");
});

module.exports = router;
