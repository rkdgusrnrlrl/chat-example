/**
 * Created by rkdgusrnrlrl on 17. 4. 10.
 */
var path = require('path');
var rootDir = path.dirname(require.main.filename);
var members = require('express').Router();
var Chat = require(rootDir+'/models/chat');
var User = require(rootDir+'/models/user');

function convertJson(chat) {
    var convertChat = { msg : chat.msg, userId : chat.user.id , userName : chat.user.name, seq : chat.seq };
    return convertChat;
}

members.get('/', function (req, res) {
    Chat.findAll({
        limit : 30,
        order : [['createdAt', 'DESC']],
        include : [{model : User}]
    })
        .then(chats => chats.map(chat => chat.convertJson()))
        .then(chats => res.json(chats))
        .catch(err => res.json(err));
});



module.exports = members;
