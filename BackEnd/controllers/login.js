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

const login = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ error: "Email and password are required" });
	}

	try {
		const {
			data: user,
			session,
			error,
		} = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			return res.status(400).json({ error: error.message });
		}

		const userIdHexString = uuidToObjectId(user.user.id);
		const userIdObjectId =
			mongoose.Types.ObjectId.createFromHexString(userIdHexString);

		const newSession = new Session({
			userId: userIdObjectId,
			loginTime: new Date(),
			ipAddress: req.ip,
		});

		await newSession.save();

		res.json({ user, session, success: true });
	} catch (err) {
		console.error("Error during login:", err);
		res.status(500).json({ error: "Internal server error" });
	}
};

module.exports = login;
