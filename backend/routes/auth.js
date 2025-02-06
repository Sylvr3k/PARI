const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Login Route
router.post('/login', async (req, res) => {
    const { emailOrPhone, password } = req.body;

    try {
        // Check if user exists with email or phone
        const user = await User.findOne({ 
            $or: [{ email: emailOrPhone }, { phone: emailOrPhone }]
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d' // Token expires in 7 days
        });

        // Send response with token and user data
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                phone: user.phone,
                position: user.position
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong', error });
    }
});

module.exports = router;
