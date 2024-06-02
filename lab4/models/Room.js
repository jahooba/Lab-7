// Import Mongoose
const mongoose = require('mongoose');

// Set schema fields for messages in rooms
const messageSchema = new mongoose.Schema({
    nickname: String,
    content: String,
    timestamp: {type: Date, default: Date.now}
});

// Set schema fields for rooms
const roomSchema = new mongoose.Schema({
    roomId: {type: String, unique: true, required: true},
    messages: [messageSchema]
});

// Set the Room object for accessing database documents
const Room = mongoose.model('Room', roomSchema);

module.exports = Room;