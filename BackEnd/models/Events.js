const mongoose = require("mongoose");

const toDoSchema = new mongoose.Schema({
	userId: { type: String, required: true },
	event_name: { type: String, required: true },
	description: { type: String, required: true },
	Date: { type: Date, default: Date.now },
	BookFor: { type: Date },
	location: { type: String, required: true },
});

module.exports = mongoose.model("Events", toDoSchema);
