const express = require('express');
const router = express.Router();

const { authorise, sign } = require('../controllers/auth')
const { createUser, readUser, patchUser, deleteUser } = require('../controllers/user');

/* User CRUD Operations */
router.post('/signup', createUser, sign)
router.get('/', authorise, readUser) 
router.patch('/', authorise, patchUser)
router.delete('/', authorise, deleteUser)

module.exports = router;
