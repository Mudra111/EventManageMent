// models/Session.js
const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	loginTime: {
		type: Date,
		required: true,
	},
	logoutTime: {
		type: Date,
	},
	ipAddress: {
		type: String,
		required: true,
	},
});

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;
