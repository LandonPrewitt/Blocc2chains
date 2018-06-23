/* Random comments */

var express = require('express'),
    app = express(),
    fs = require('fs'),
    http = require('http').Server(app),
    io = require('socket.io')(http, {
      pingTimeout: 5000
    }),
    path = require('path'),
    count = 0;

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

  // Assign an ID
  socket.nickname = count;
  count++;
  console.log(count);

  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });

  socket.on('sendMsg', function(data) {
    var msg = data.msg;
    console.log(msg);
    io.sockets.emit('newMsg', socket.nickname + ': ' + msg);
    //callback(msg);
  });

})




http.listen(3000, '0.0.0.0', function() {
  console.log('listening on *:3000');
})

