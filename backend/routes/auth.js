const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Function to normalize phone number
const normalizePhoneNumber = (phone) => {
    // Remove spaces or dashes if present
    phone = phone.replace(/\s|-/g, '');

    // If starts with '07' or '06', convert to international format
    if (phone.startsWith('07')) {
        return '+255' + phone.slice(1); // Converts '07xxxxxx' -> '+2557xxxxxx'
    }
    if (phone.startsWith('06')) {
        return '+255' + phone.slice(1); // Converts '06xxxxxx' -> '+2556xxxxxx'
    }

    // If already in +255 format, return as is
    return phone;
};

// Login Route (Phone Number Only)
router.post('/login', async (req, res) => {
    let { phone, password } = req.body;

    try {
        // Normalize phone number
        phone = normalizePhoneNumber(phone);

        // Find user by normalized phone number
        const user = await User.findOne({ phone });

        if (!user) {
            return res.status(400).json({ message: 'Invalid phone number or password' });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid phone number or password' });
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
