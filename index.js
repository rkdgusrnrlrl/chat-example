/**
 * Created by rkdgusrnrlrl on 17. 4. 9.
 */

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var User = require("./models/user");

var memberRegiter = require('./routes/members/register');
var members = require('./routes/members');
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use('/members', members);
app.use('/members/register', memberRegiter);



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
