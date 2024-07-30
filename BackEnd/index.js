const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const connectDB = require("./db/connect");

const routes = require("./routes");

app.use("/", routes);

const PORT = process.env.PORT || 3005;

const start = async () => {
	try {
		await connectDB();
		app.listen(PORT, () => {
			console.log("Server running on :", PORT);
		});
	} catch (error) {
		console.log(error);
	}
};

start();
