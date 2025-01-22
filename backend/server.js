const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Replacing bodyParser.json() (express has built-in body parsing from version 4.16.0 onwards)

// Mongoose connection with improved settings
mongoose.set('strictQuery', false); // Suppresses deprecation warnings for mongoose
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => {
        console.error('Connection error:', error);
        process.exit(1); // Exit the process if the connection fails
    });

// Import Routes
const registerRoute = require('./routes/register'); // Ensure the path to 'register' is correct
app.use('/api/register', registerRoute);

// Handle undefined routes
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

