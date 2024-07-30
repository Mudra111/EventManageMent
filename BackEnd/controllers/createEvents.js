const Events = require("../models/Events");

// Create Event Item
const createEvents = async (req, res) => {
	// const { event_name, description, BookForReq, location } = req.body;

	try {
		const newEvent = new Events({ ...req.body, userId: req.user.id });

		await newEvent.save();
		res.json({ event: newEvent, success: true });
	} catch (err) {
		console.error("Error during login:", err);
		res.status(500).json({ error: "Internal server error" });
	}
};

module.exports = createEvents;
