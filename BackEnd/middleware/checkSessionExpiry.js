const Session = require("../models/Session");

const checkSessionExpiry = async (req, res, next) => {
	try {
		const userIdHexString = uuidToObjectId(req.user.id);
		const userIdObjectId =
			mongoose.Types.ObjectId.createFromHexString(userIdHexString);

		const session = await Session.findOne({ userId: userIdObjectId }).sort({
			loginTime: -1,
		});

		if (session) {
			const sessionDuration = 1000 * 60 * 30; // Example: 30 minutes session duration
			const now = new Date();

			if (now - session.loginTime > sessionDuration) {
				// Session expired, handle automatic logout
				session.logoutTime = now;
				await session.save();

				// Optionally, invalidate the session or perform other cleanup
				// Example: Log the user out of Supabase
				await supabase.auth.signOut();

				return res
					.status(401)
					.json({ message: "Session expired. Please log in again." });
			}
		}

		next();
	} catch (err) {
		console.error("Error checking session expiry:", err);
		res.status(500).json({ error: "Internal server error" });
	}
};

module.exports = checkSessionExpiry;
