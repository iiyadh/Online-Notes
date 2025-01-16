const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const notesRoutes = require('./routes/notes');
const authRoutes = require('./routes/auth');
const settingsRoutes = require("./routes/settings");
const app = express();
const session = require('express-session');


// Middleware to handle sessions
app.use(
  session({
    secret: "f4e5e2f57c8f9a63b7d9c61d8f93e4d3f59f2d8d39c1c8d8f9c3b7a6b1b2a9f9",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Allow all origins
  credentials: true, // Allow sending cookies
}));
app.use(bodyParser.json());

// Routes
app.use('/notes', notesRoutes); // Notes routes
app.use('/auth', authRoutes);   // Authentication routes 
app.use('/settings', settingsRoutes);   // Authentication routes 

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
