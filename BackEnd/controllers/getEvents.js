const Events = require("../models/Events");

// Get Event Items
const getEvents = async (req, res) => {
	try {
		const events = await Events.find({ userId: req.user.id });
		res.json({ events, success: true });
	} catch (err) {
		console.log(err);
	}
};

module.exports = getEvents;
