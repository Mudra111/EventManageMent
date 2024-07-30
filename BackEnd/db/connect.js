const mongoose = require("mongoose");

uri = process.env.URI;

const connectDB = () => {
	console.log("cennect database..");
	return mongoose.connect(uri);
};

module.exports = connectDB;
