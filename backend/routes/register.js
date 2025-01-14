const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
  const {
    firstname, midname, lastname, age, fulladdress, phone, designation,
    id, email, password, profilePicture, workRegion, veoDetails, weoDetails
  } = req.body;

  try {
    const existingUser = await User.findOne({ phone });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const newUser = new User({
      firstname, midname, lastname, age, fulladdress, phone, designation,
      id, email, password, profilePicture, workRegion, veoDetails, weoDetails
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
});

module.exports = router;
