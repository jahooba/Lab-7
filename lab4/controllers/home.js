const Room = require('../models/Room');

/*
Get the room documents in the database.

Render the title and room documents in list.
*/
async function getHome(request, response){
  // do any work you need to do, then
  // const rooms = [
  //   { roomId: 1 },
  //   { roomId: 2 },
  //   { roomId: 3 },
  // ];
  //response.render('home', {title: 'home', rooms: rooms});

  try {
    const rooms = await Room.find().lean();
    response.render('home', { title: 'home', rooms: rooms });
  } 
  catch (err) {
    console.error(err);
    response.status(500).send('Server Error');
  }
}

module.exports = {
    getHome
};