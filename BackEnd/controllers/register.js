const { supabase } = require("../supabaseClient");
const User = require("../models/User");

// Registration Route
const register = async (req, res) => {
	const { name, email, password } = req.body;
	try {
		const { user, error } = await supabase.auth.signUp({
			email,
			password,
		});

		if (error) {
			return res.status(400).json({ error: error.message });
		}

		const newUser = new User({ email, name });
		await newUser.save();
		console.log(user);
		res.json({ user, success: true });
	} catch (err) {
		console.log(err);
	}
};

module.exports = register;
