const jwt = require("jsonwebtoken");
const JWT_SECRET = "bittersweetjoy";

const fetchuser = (req, res, next) => {
	const token = req.header("auth-token").trim();

	if (!token) return res.status(401).send({ error: "please try again with a valid token" });
	console.log(token);
	try {
		req.userid = jwt.verify(token, JWT_SECRET).user;
		next();
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "please try again with a valid token", message: error.message });
	}
};

module.exports = fetchuser;
