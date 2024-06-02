const Room = require('../models/Room');

async function getHome(request, response){
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