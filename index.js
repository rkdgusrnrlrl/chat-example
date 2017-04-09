/**
 * Created by rkdgusrnrlrl on 17. 4. 9.
 */

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname+"/index.html");
});

io.on('connection', function (socket) {
    socket.broadcast.emit("hi");
    socket.on('disconnect', function () {
        console.log("a user disconnected");
    });
    socket.on('chat message', function (msg) {
        console.log(msg);
        io.emit('chat message', msg);
    });
});

io.emit('some event', {for : 'everyone'});


http.listen(3000, function () {
    console.log("listening on *: 3000");
});
