const connectToMongo = require("./db");
const express = require("express");
const auth = require("./routes/auth");
const notes = require("./routes/notes");
connectToMongo();
const app = express();
const port = 5000;

app.get("/", (req, res) => {
	res.send("Dont worry API is working");
});

app.use(express.json());
app.use("/api/auth", auth);
app.use("/api/notes", notes);

app.listen(port, () => {
	console.log(`inote backend running that http://localhost:${port}`);
});
