const Events = require("../models/Events");

// Update Event Item
const updateEvents = async (req, res) => {
	const { id } = req.params;
	const { event_name, description, BookFor, location } = req.body;

	try {
		const updatedEvent = await Events.findOneAndUpdate(
			{ _id: id, userId: req.user.id },
			{ event_name, description, BookFor, location },
			{ new: true }
		);

		if (!updatedEvent) {
			return res.status(404).json({ error: "Event item not found" });
		}

		res.json({ event: updatedEvent, success: true });
	} catch (err) {
		console.log(err);
	}
};

module.exports = updateEvents;
