var express = require('express');
var http = require('http');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + '/../client/'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/node_modules', express.static(__dirname + '/../node_modules'));

module.exports = app;
