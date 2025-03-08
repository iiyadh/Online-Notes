const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./db/connection');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// Connect to the database
connectDB();

const notesRoutes = require('./routes/notes');
const authRoutes = require('./routes/auth');
const settingsRoutes = require('./routes/settings');

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL, 
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());


// Routes
app.use('/notes', notesRoutes);
app.use('/auth', authRoutes);
app.use('/settings', settingsRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
