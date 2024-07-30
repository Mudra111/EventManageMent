const { supabase } = require("../supabaseClient");

const authMiddleware = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];

		if (!token) {
			return res.status(401).json({ error: "Unauthorized" });
		}

		const { data: user, error } = await supabase.auth.getUser(token);

		if (error) {
			return res.status(401).json({ error: "Unauthorized" });
		}

		req.user = user.user;
		console.log(req.user.id);
		next();
	} catch (err) {
		console.error("Auth middleware error:", err);
		res.status(500).json({ error: "Internal server error" });
	}
};

module.exports = authMiddleware;
