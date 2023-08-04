const express = require('express');
const router = express.Router();

const { loginUser } = require('../controllers/user')
const { sign, authorise } = require('../controllers/auth')

router.get('/validate_token', authorise, (req, res) => res.sendStatus(200))
router.post('/login', loginUser, sign)

module.exports = router;
