// server/routes/authRoutes.js
const express = require('express');
const { register, login, verify } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/verify', verify);

module.exports = router;