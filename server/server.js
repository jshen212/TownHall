var express = require('express');
var http = require('http');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var server = http.createServer(app).listen(process.env.PORT || 3000);
var io = require('socket.io')(server);

app.use(morgan('dev'));
app.use(express.static(__dirname + '/../client/'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/node_modules', express.static(__dirname + '/../node_modules'));

io.on('connection', function(socket) {
  socket.on('change', function(card) {
    socket.broadcast.emit('card', card);
  });
});

// module.exports = app;
module.exports = io;

console.log('chat app now listening on localhost:3000');
