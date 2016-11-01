var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on('message', function(msg){
        console.log('message: ' + msg);
        socket.emit('news', msg);
    });
});

http.listen(3101, function(){
    console.log('listening on *:3101');
});