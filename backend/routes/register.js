const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
  const {
    firstname, midname, lastname, age, fulladdress, phone, designation,
    id, email, password, profilePicture, region, extraone, extratwo, position
  } = req.body;

  try {
    // Check if the user already exists using phone or ID
    const existingUser = await User.findOne({ phone });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Create a new user object
    const newUser = new User({
      firstname,
      midname,
      lastname,
      age,
      fulladdress,
      phone,
      designation,
      id,
      email,
      password,
      profilePicture, // Ensure the model accepts base64-encoded strings for profile pictures
      workRegion: region, // Map region field
      veoDetails: extraone, // Map extraone to VEO details
      weoDetails: extratwo, // Map extratwo to WEO details
      position, // Added position to user object
    });

    // Save the user to the database
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong', error });
  }
});

module.exports = router;
