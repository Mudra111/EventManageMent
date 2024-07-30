const express = require("express");
const router = express.Router();
const authMiddleware = require("./middleware/authMiddleware");

const register = require("./controllers/register");
const login = require("./controllers/login");
const logout = require("./controllers/logout");
const createEvents = require("./controllers/createEvents");
const getEvents = require("./controllers/getEvents");
const updateEvents = require("./controllers/updateEvents");
const deleteEvents = require("./controllers/deleteEvents");
const getSession = require("./controllers/getSession");
const getWeather = require("./controllers/getWeather");

router.post("/register", register);

router.post("/login", login);

router.post("/logout", authMiddleware, logout);

router.post("/events", authMiddleware, createEvents);

router.get("/events", authMiddleware, getEvents);

router.put("/events/:id", authMiddleware, updateEvents);

router.delete("/events/:id", authMiddleware, deleteEvents);

router.get("/sessions", authMiddleware, getSession);

router.get("/weather/:location", authMiddleware, getWeather);

module.exports = router;
