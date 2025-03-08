const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
require('dotenv').config();

const notesRoutes = require('./routes/notes');
const authRoutes = require('./routes/auth');
const settingsRoutes = require('./routes/settings');

const app = express();

// MySQL Session Store Configuration
const sessionStore = new MySQLStore({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306,
  clearExpired: true,
  checkExpirationInterval: 900000, // Clear expired sessions every 15 min
  expiration: 86400000, // Session valid for 1 day
});

// Middleware to handle sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore, // Use MySQL for session storage
    cookie: {
      secure: process.env.NODE_ENV === 'production', // Secure in production
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Allow requests from frontend
    credentials: true, // Allow sending cookies
  })
);
app.use(bodyParser.json());

// Routes
app.use('/notes', notesRoutes);
app.use('/auth', authRoutes);
app.use('/settings', settingsRoutes);

// Global Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
