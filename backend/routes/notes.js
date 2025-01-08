const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Get all notes for a specific user
router.get('/:userId', (req, res) => {
  const { userId } = req.params;

  db.query('SELECT * FROM notes WHERE user_id = ?', [userId], (err, results) => {
    if (err) {
      console.error('Error fetching notes:', err.message);
      return res.status(500).json({ error: 'Failed to fetch notes' });
    }
    res.json(results);
  });
});

// Add a new note
router.post('/', (req, res) => {
  const { title, content, user_id } = req.body;

  if (!title || !content || !user_id) {
    return res.status(400).json({ error: 'Title, content, and user_id are required' });
  }

  db.query(
    'INSERT INTO notes (title, content, user_id) VALUES (?, ?, ?)',
    [title, content, user_id],
    (err, result) => {
      if (err) {
        console.error('Error adding note:', err.message);
        return res.status(500).json({ error: 'Failed to add note' });
      }
      res.status(201).json({ id: result.insertId });
    }
  );
});

// Edit a note
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  db.query(
    'UPDATE notes SET title = ?, content = ? WHERE id = ?',
    [title, content, id],
    (err) => {
      if (err) {
        console.error('Error updating note:', err.message);
        return res.status(500).json({ error: 'Failed to update note' });
      }
      res.status(200).json({ message: 'Note updated successfully' });
    }
  );
});

// Delete a note
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM notes WHERE id = ?', [id], (err) => {
    if (err) {
      console.error('Error deleting note:', err.message);
      return res.status(500).json({ error: 'Failed to delete note' });
    }
    res.status(200).json({ message: 'Note deleted successfully' });
  });
});

module.exports = router;
