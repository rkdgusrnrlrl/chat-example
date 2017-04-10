/**
 * Created by rkdgusrnrlrl on 17. 4. 10.
 */
var path = require('path');
var rootDir = path.dirname(require.main.filename);
var members = require('express').Router();
var User = require(rootDir+'/models/user');

members.get('/', function (req, res) {
    User.findAll()
        .then(function (users) {
            res.send(users.map(user => user.get({plain: true})));
        })
        .catch(function (err) {
            res.send(err);
        });
});

module.exports = members;
