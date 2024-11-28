const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables from .env

const authRoutes = require('./routes/authRoutes'); // Import auth routes

const app = express();
const cors = require('cors');

// Middleware
app.use(bodyParser.json());

// Database Connection
mongoose
    .connect(process.env.DB_URI)
    .then(() => {
        app.listen(process.env.PORT || 3001, () => {
            console.log(`Server running at http://localhost:3001`);
        });
        console.log('Connected to MongoDB...');
    })
    .catch((err) => {
        console.error('Could not connect to MongoDB...', err);
        process.exit(1); // Exit the process if DB connection fails
    });

// Allow requests from the frontend url
app.use(cors({
    origin: 'https://passwordresetfelink.netlify.app',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
}));
    

// Routes
app.use('/api/v1/auth', authRoutes);

