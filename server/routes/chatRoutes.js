// server/routes/chatRoutes.js
const express = require('express');
const { getMessages, sendMessage } = require('../controllers/chatController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getMessages);
router.post('/', authMiddleware, sendMessage);

module.exports = router;