const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../Models/UserSchema');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Change Password
router.put('/password', async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const token = req.cookies.token;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }
        
        user.password = await bcrypt.hash(newPassword, 10);
        user.updated_at = Date.now();
        await user.save();
        
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while updating the password' });
    }
});

// Change Username
router.put('/username', async (req, res) => {
    const { newUsername } = req.body;
    try {
        
        const existingUser = await User.findOne({ username: newUsername });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already used' });
        }
        const token = req.cookies.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.username = newUsername;
        user.updated_at = Date.now();
        await user.save();
        
        res.status(200).json({ message: 'Username updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while updating the username' });
    }
});

module.exports = router;