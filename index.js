/**
 * Created by rkdgusrnrlrl on 17. 4. 9.
 */
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var sess = require('express-session');
var SqliteStore = require('connect-sqlite3')(sess);

var session = sess({
    secret: 'chat-example',
    resave: false,
    saveUninitialized: true,
    store : new SqliteStore({dir : '.'})
});

app.set('view engine', 'ejs');
app.use(session);
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

io.use(function (socket, next) {
    session(socket.request, socket.request.res, next);
});


var path = require('path');
var rootDir = path.dirname(require.main.filename);

var memberRegiter = require('./routes/members/register');
var members = require('./routes/members');
var login = require('./routes/login');
var chat = require(rootDir+'/routes/chat');
var Chat = require(rootDir+'/models/chat');
var User = require(rootDir+'/models/user');
var Session = require(rootDir+'/models/session');
app.use(express.static('public'));
app.use('/members', members);
app.use('/members/register', memberRegiter);
app.use('/login', login);
app.use('/chats', chat);

app.get('/', function (req, res) {
    if (req.session.isLogined) {
        res.sendFile(rootDir+"/views/index.html");
    } else {
        res.redirect('/login');
    }
});


io.on('connection', function (socket) {
    if (!socket.request.session.isLogined) {
        socket.emit('logout');
    } else {
        var userId = socket.request.session.logindUser.id;
        var userName = socket.request.session.logindUser.name;

        Session.findOne({where : {
            sid : socket.request.sessionID
        }})
            .then(session => {
                var json = JSON.parse(session.get('sess'));
                json['socket_id'] = socket.id;
                session.update({sess : JSON.stringify(json)});
            });

        //TODO 같은 아이디로 로그인시 해당 소캣에 logout 이벤트 emit

        Chat.count()
            .then((cnt) => {
                var isFirstChat = !(cnt > 20);
                var limit = isFirstChat ? cnt : 20;
                return Chat.findAll({
                    limit : limit,
                    order : [['createdAt', 'DESC']],
                    include : [{model : User}]
                })
                    .then(chats => chats.map(chat => chat.convertJson()))
                    .then(chats => socket.emit('init message', { isFirstChat : isFirstChat ,chats :chats}));
            });

        socket.on('disconnect', function () {
            console.log("a user disconnected");
        });
        socket.on('chat message', function (msg) {
            Chat.create({id: userId, msg : msg})
                .then(chat => chat.reload({include : [{model:User}]}))
                .then(chat => io.emit('chat message', chat.convertJson()))
        });

        socket.on('previous chat', function (seq) {
            Chat.count({where : {
                seq : {
                    $lt : seq
                }
            }})
                .then((cnt) => {
                    var isFirstChat = !(cnt > 20);
                    var limit = isFirstChat ? cnt : 20;
                    return Chat.findAll({
                        where : {
                            seq : {
                                $lt : seq
                            }
                        },
                        limit : limit,
                        order : [['createdAt', 'DESC']],
                        include : [{model : User}]
                    })
                        .then(chats => chats.map(chat => chat.convertJson()))
                        .then(chats => socket.emit('init message', { isFirstChat : isFirstChat ,chats :chats}));
                });

        });
    }
});

io.emit('some event', {for : 'everyone'});

http.listen(3000, function () {
    console.log("listening on *: 3000");
});
