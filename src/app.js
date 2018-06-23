/* Random comments */

var express = require('express'),
    app = express(),
    fs = require('fs'),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    path = require('path');

//app.listen(3000, () => console.log('App on port 3000'))

app.use(express.static('/public'))

// ================= Linking Main Files =================

app.get('/', function (req,res) {
  res.sendFile(path.join(__dirname + '/main.html'))
})

app.get('/main.css', function (req,res) {
  res.sendFile(path.join(__dirname + '/main.css'))
})

app.get('/main.js', function (req,res) {
  res.sendFile(path.join(__dirname + '/public/main.js'))
})

// ================= IO Interaction Logic ===============

io.on('connection', function(socket) {
  console.log('user connected');  

  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });

})




http.listen(3000, function() {
  console.log('listening on *:3000');
})

