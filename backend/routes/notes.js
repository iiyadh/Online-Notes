const express = require('express');
const router = express.Router();
const Note = require('../Models/NoteSchema.js');
const User = require('../Models/UserSchema.js');
const mongoose = require('mongoose');

// Get all notes for a specific user
router.get('/:userId', async (req, res) => {
  let { userId } = req.params;
  // Convert userId to ObjectId if it's valid
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: 'Invalid user ID format' });
  }

  try {
    const notes = await Note.find({ user_id: new mongoose.Types.ObjectId(userId) }).sort({ updatedAt: 'desc' });
    res.status(200).json(notes);
  } catch (err) {
    console.error('Error fetching notes:', err.message);
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

// Add a new note
router.post('/', async (req, res) => {
  const { title, content, user_id} = req.body;
  console.log(req.body)
  // if (!title ||!content ||!uid) {
  //   return res.status(400).json({ error: 'Title, content, and uid are required' });
  // }
  try{
    const user = await User.findById(user_id);
    if(!user){
      return res.status(404).json({ error: 'User not found' });
    }
    const note = new Note({ title, content, user_id });
    const result = await note.save();
    res.status(201).json({ id: result._id });
  }catch(err){
    console.error('Error adding note:', err.message);
    res.status(500).json({ error: 'Failed to add note' });
  }
});

// Edit a note
router.put('/:id',async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }
  try{
    const note = await Note.findByIdAndUpdate(id, { title, content }, { new: true });
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.status(200).json({ message: 'Note updated successfully' });
  }catch(err){
    console.error('Error updating note:', err.message);
    res.status(500).json({ error: 'Failed to update note' });
  }
});

// Delete a note
router.delete('/:id', async(req, res) => {
  const { id } = req.params;

  try{
    const note = await Note.findByIdAndDelete(id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.status(200).json({ message: 'Note deleted successfully' });
  }catch(err){
    console.error('Error deleting note:', err.message);
    res.status(500).json({ error: 'Failed to delete note' });
  }
});

module.exports = router;
