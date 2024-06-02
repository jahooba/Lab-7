// import dependencies
const express = require('express');
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');

// import handlers
const homeHandler = require('./controllers/home.js');
const createRoomHandler = require('./controllers/createRoom.js');
const roomHandler = require('./controllers/room.js');
const Room = require('./models/Room.js');

const uri = "mongodb+srv://jpena079:PZ8J9sdjSquThjNe@cluster0.gz2bz2x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB 
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// If you choose not to use handlebars as template engine, you can safely delete the following part and use your own way to render content
// view engine setup
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Create controller handlers to handle requests at each endpoint
app.get('/', homeHandler.getHome);
app.post('/create-room', createRoomHandler.createRoom);
app.get('/:roomName', roomHandler.getRoom);

app.get('/:roomName/messages', async (req, res) => {
  try {
      const room = await Room.findOne({ roomId: req.params.roomName }).lean();
      if (!room) {
          return res.status(404).send('Room not found');
      }
      res.json(room.messages);
  } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
  }
});

// Route for posting messages
app.post('/:roomName/message', async (req, res) => {
  const { nickname, content } = req.body;
  try {
      const room = await Room.findOne({ roomId: req.params.roomName });
      if (!room) {
          return res.status(404).send('Room not found');
      }
      room.messages.push({ nickname, content });
      await room.save();
      res.send('Message sent');
  } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
  }
});

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
