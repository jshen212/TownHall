var express = require('express');
// var cors = require('cors');
var http = require('http');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var server = http.createServer(app).listen(process.env.PORT || 3000);
var io = require('socket.io')(server);
var mongoose = require('mongoose');

// app.use(cors());
app.use(morgan('dev'));
app.use(express.static(__dirname + '/../client/'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/node_modules', express.static(__dirname + '/../node_modules'));

mongoose.connect('mongodb://' + 'townhall' + ':' + 'makersquare32' + '@ds011369.mlab.com:11369/townhall');
console.log('Connected to Mongoose');

// socket io will load on connection
// on "boardChange" event, socket will broadcast the board info to all users
io.on('connection', function(socket) {
  socket.on('boardChange', function(board) {
    socket.broadcast.emit('board', board);
  });
});

require('./routes/routes.js')(app, express);

module.exports = io;
module.exports = app;

console.log('chat app now listening on localhost:3000');
