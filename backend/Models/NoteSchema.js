const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: { type: String },
    content: { type: String},
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const Note = mongoose.model('Note', noteSchema);
module.exports = Note;