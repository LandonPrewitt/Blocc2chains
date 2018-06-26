/* Random comments */

var express = require('express'),
    app = express(),
    fs = require('fs'),
    http = require('http').Server(app),
    https = require('https').Server(app),
    io = require('socket.io')(http, {
      pingTimeout: 5000
    }),
    path = require('path'),
    count = 0,
    connect_count = 0;

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

app.get('/public/images/iccced.png', function (req,res) {
  res.sendFile(path.join(__dirname + '/public/images/iccced.png'))
})

// ================= IO Shortcut / Functions

function updateUserCount() {
  io.sockets.emit('updateUserCount', connect_count);
  console.log(connect_count);
}

// ================= IO Interaction Logic ===============

io.on('connection', function(socket) {
  
  // Initial Connection Code
  console.log('user connected');  
  connect_count++;
  updateUserCount();
  console.log(connect_count);

  // Assign an ID
  socket.nickname = count;
  count++;

  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', function() {
    console.log('user disconnected');
    connect_count--;
    updateUserCount();
  });

  socket.on('sendMsg', function(data) {
    var msg = data.msg;
    io.sockets.emit('newMsg', socket.nickname + ': ' + msg);
    //callback(msg);
  });

})



http.listen(8080, '0.0.0.0', function() {
  console.log('http listening on *:8080');
})



