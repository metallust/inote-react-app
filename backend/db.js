const mongoose = require("mongoose");
const mongURI = "mongodb://localhost:27017/inote";

const connectToMongo = async () => {
	await mongoose.connect(mongURI);
	console.log("Connected to mongo ...");
};

module.exports = connectToMongo;
