const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware to allow larger request bodies (adjust the limit as needed)
app.use(bodyParser.json({ limit: '10mb' })); // Increase the limit here if needed
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Middleware
app.use(express.json()); // Parse incoming JSON data

// CORS Configuration
const corsOptions = {
    origin: 'https://parifarmers.netlify.app', // Replace with your actual Netlify URL
    methods: ['GET', 'POST'], // Allow GET and POST requests
    allowedHeaders: ['Content-Type'], // Allow Content-Type header
};
app.use(cors(corsOptions)); // Use CORS with the configured options

// Mongoose connection
mongoose.set('strictQuery', false); // Suppresses deprecation warnings
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => {
        console.error('Connection error:', error);
        process.exit(1); // Exit process on connection failure
    });

// Import Routes
const registerRoute = require('./routes/register'); // Ensure path to 'register' is correct
app.use('/api/register', registerRoute);

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Handle undefined routes
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
