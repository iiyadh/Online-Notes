const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../db/connection');

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
  if (req.session && req.session.userId) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
}

// Change Password
router.put('/password', isAuthenticated, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'Both current and new passwords are required' });
  }

  try {
    const userId = req.session.userId;

    // Fetch the current password from the database
    const [rows] = await db.promise().query('SELECT password FROM users WHERE id = ?', [userId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, rows[0].password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password in the database
    await db.promise().query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, userId]);

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while updating the password' });
  }
});


// Change Username
router.put('/settings/username', isAuthenticated, async (req, res) => {
    const { newUsername } = req.body;
  
    if (!newUsername) {
      return res.status(400).json({ message: 'New username is required' });
    }
  
    try {
      const userId = req.session.userId;
  
      // Check if the new username already exists
      const [existingUser] = await db.promise().query('SELECT id FROM users WHERE username = ?', [newUsername]);
  
      if (existingUser.length > 0) {
        return res.status(400).json({ message: 'Username is already taken' });
      }
  
      // Update the username in the database
      await db.promise().query('UPDATE users SET username = ? WHERE id = ?', [newUsername, userId]);
  
      res.status(200).json({ message: 'Username updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while updating the username' });
    }
});

module.exports = router;