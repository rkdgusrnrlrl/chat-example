/**
 * Created by rkdgusrnrlrl on 17. 4. 9.
 */

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var session = require('express-session');

var session = session({
    secret: 'chat-example',
    resave: false,
    saveUninitialized: true
});
app.use(session);

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

io.use(function (socket, next) {
    session(socket.request, socket.request.res, next);
});

var memberRegiter = require('./routes/members/register');
var members = require('./routes/members');
var login = require('./routes/login');

app.use('/members', members);
app.use('/members/register', memberRegiter);
app.use('/login', login);

app.get('/', function (req, res) {
    if (req.session.isLogined) {

        res.sendFile(__dirname+"/index.html");
    } else {
        res.redirect('/login');
    }
});

io.on('connection', function (socket) {
    socket.broadcast.emit("hi");
    var userName = socket.request.session.logindUser.name;

    socket.on('disconnect', function () {
        console.log("a user disconnected");
    });
    socket.on('chat message', function (msg) {
        console.log(msg);
        io.emit('chat message', { userName: userName ,msg : msg});
    });
});

io.emit('some event', {for : 'everyone'});

http.listen(3000, function () {
    console.log("listening on *: 3000");
});
