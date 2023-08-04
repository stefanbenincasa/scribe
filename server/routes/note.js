const express = require('express');
const router = express.Router();

const { authorise, sign } = require('../controllers/auth')
const { createNote, patchNote, readNote, readNotes, deleteNote, favoriteNote } = require('../controllers/note');

/* User CRUD Operations */
router.post('/', authorise, createNote)
router.get('/', authorise, readNotes) 
router.get('/:noteId', authorise, readNote) 
router.patch('/:noteId', authorise, patchNote)
router.patch('/favorite/:noteId', authorise, favoriteNote)
router.delete('/:noteId', authorise, deleteNote)

module.exports = router;
