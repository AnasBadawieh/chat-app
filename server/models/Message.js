// server/models/Message.js
const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  gif: {
    type: String,
    default: null,
  },
}, { timestamps: true });

module.exports = mongoose.model('Message', MessageSchema);