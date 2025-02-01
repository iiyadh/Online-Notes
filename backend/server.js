const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const notesRoutes = require('./routes/notes');
const authRoutes = require('./routes/auth');
const settingsRoutes = require("./routes/settings");
const app = express();
const session = require('express-session');
require('dotenv').config();


// ✅ Middleware: Secure Sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // Secure cookies in production (requires HTTPS)
      httpOnly: true, // Prevents JavaScript access
      sameSite: "none", // Required for cross-origin cookies
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// ✅ Middleware: CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "https://online-notes-client.vercel.app",
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    credentials: true, // Allow sending cookies & sessions
  })
);
app.options("*", cors()); // Handles preflight requests
app.use(bodyParser.json());

// Routes
app.use('/notes', notesRoutes); // Notes routes
app.use('/auth', authRoutes);   // Authentication routes 
app.use('/settings', settingsRoutes);   // Authentication routes 

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send({ error: 'Something went wrong!' });
// });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
