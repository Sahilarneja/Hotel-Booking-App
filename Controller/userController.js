const User = require('../models/user');
const bcrypt = require('../utils/bcrypt');

const registerController = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the user with the provided email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists. Please use a different email." });
        }

        // If the user doesn't exist, proceed with registration
        const hashedPwd = await bcrypt.hashPwd(password);

        const newUser = new User({ name, email, password: hashedPwd });

        await newUser.save();

        res.send('User registered successfully');
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ error: "Failed to register user" });
    }
};


const loginController = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Login failed. User not found." });
        }

        const isMatched = await bcrypt.matchPwd(password, user.password);

        if (isMatched) {
            const userData = {
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                _id: user._id
            };
            res.json(userData);
        } else {
            return res.status(400).json({ message: "Login failed. Incorrect password." });
        }
    } catch (error) {
        console.error("Error logging in:", error);
        return res.status(500).json({ error: "An internal server error occurred" });
    }
};

module.exports = { registerController, loginController };
