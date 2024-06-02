const Room = require('../models/Room');

async function getRoom(request, response) {
    const roomName = request.params.roomName;
    try {
        const room = await Room.findOne({ roomId: roomName }).lean();
        if (!room) {
            return response.status(404).send('Room not found');
        }
        response.render('room', { title: 'chatroom', roomName: room.roomId });
    } catch (err) {
        console.error(err);
        response.status(500).send('Server Error');
    }
}

module.exports = {
    getRoom
};
