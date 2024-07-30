const axios = require("axios");
require("dotenv").config();

const getWeather = async (req, res) => {
	const location = req.params.location;
	if (!location) {
		return res.status(400).send({ error: "Location is required" });
	}

	try {
		const apiKey = process.env.WEATHER_API_KEY;
		const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

		const response = await axios.get(url);
		const weatherData = response.data;

		res.json({
			location: weatherData.name,
			temperature: weatherData.main.temp,
			description: weatherData.weather[0].description,
		});
	} catch (error) {
		if (error.response && error.response.status === 404) {
			res.status(404).send({ error: "Location not found" });
		} else {
			res.status(500).send({ error: "Error fetching weather data" });
		}
	}
};

module.exports = getWeather;
