const Events = require("../models/Events");

// Delete Event Item
const deleteEvents = async (req, res) => {
	const { id } = req.params;

	const deletedEvent = await Events.findOneAndDelete({
		_id: id,
		userId: req.user.id,
	});

	if (!deletedEvent) {
		return res.status(404).json({ error: "Event item not found" });
	}

	res.json({ message: "Event item deleted", success: true });
};

module.exports = deleteEvents;
