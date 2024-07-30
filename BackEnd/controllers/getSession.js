const Session = require("../models/Session");
const mongoose = require("mongoose");
const crypto = require("crypto");

function uuidToObjectId(uuid) {
	if (!uuid) {
		throw new Error("UUID is undefined or null");
	}
	const hash = crypto.createHash("md5").update(uuid).digest("hex");
	return hash.substring(0, 24);
}

const getSession = async (req, res) => {
	const userId = req.user.id;

	try {
		const userIdHexString = uuidToObjectId(userId);
		const userIdObjectId =
			mongoose.Types.ObjectId.createFromHexString(userIdHexString);

		const sessions = await Session.find({ userId: userIdObjectId });
		if (!sessions) {
			return res.status(404).json({ error: "Session not found" });
		}
		res.json({ sessions, success: true });
	} catch (err) {
		console.error("Error getting session:", err);
		res.status(500).json({ error: "Internal server error" });
	}
};

module.exports = getSession;
