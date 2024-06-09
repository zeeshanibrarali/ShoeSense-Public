const User = require('../models/users');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const saltRounds = Number(process.env.SALT_ROUNDS);

const handleLoginController = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const token = await JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "3d",
        });

        res.status(200).json({
            success: true,
            message: "Login Successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                age: user.age,
                gender: user.gender,
                shoeBrandPreference: user.shoeBrandPreference,
                priceRangePreference: user.priceRangePreference,
                shoeColorPreference: user.shoeColorPreference,
                hobbies: user.hobbies
            },
            token: token
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.message
        });
    }
}

const handleSignupController = async (req, res) => {

    const { name, email, password, age, gender, brandPreference, priceRangePreference, shoeColorPreference, hobbies } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists Please Login' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user
        const user = new User({
            name,
            email,
            password: hashedPassword,
            age,
            gender,
            shoeBrandPreference: brandPreference,
            priceRangePreference,
            shoeColorPreference,
            hobbies
        });

        await user.save();

        const token = await JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "3d",
        });

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                age: user.age,
                gender: user.gender,
                shoeBrandPreference: user.shoeBrandPreference,
                priceRangePreference: user.priceRangePreference,
                shoeColorPreference: user.shoeColorPreference,
                hobbies: user.hobbies
            },
            token: token
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.message
        });
    }
}

const handleTestController = async (req, res) => {
    res.send("You Got into Test");
}

module.exports = {
    handleLoginController,
    handleSignupController,
    handleTestController
};