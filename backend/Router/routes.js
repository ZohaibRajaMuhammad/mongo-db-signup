const express = require('express');
const router = express.Router();
const { createUser } = require('../Controller/auth');

router.post('/register', createUser);

module.exports = router;