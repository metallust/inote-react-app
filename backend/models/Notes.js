import mongoose from "mongoose";
const { Schema } = mongoose;

const noteSchema = new Schema({
	tilte: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
		unqiue: true,
	},
	tags: {
		type: Date,
		default: "general",
	},
	content: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("note", noteSchema);
