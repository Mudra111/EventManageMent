const { supabase } = require("../supabaseClient");
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

// Logout Route
const logout = async (req, res) => {
	try {
		// const token = req.headers["authorization"]?.split(" ")[1];
		let { error } = await supabase.auth.signOut();

		const userIdHexString = uuidToObjectId(req.user.id);
		const userIdObjectId =
			mongoose.Types.ObjectId.createFromHexString(userIdHexString);

		console.log(error);
		const session = await Session.findOne({ userId: userIdObjectId }).sort({
			loginTime: -1,
		});
		session.logoutTime = new Date();
		await session.save();

		res.json({ message: "Logged out successfully", success: true });
	} catch (err) {
		console.error("Error during login:", err);
		res.status(500).json({ error: "Internal server error" });
	}
};

module.exports = logout;
