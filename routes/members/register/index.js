/**
 * Created by rkdgusrnrlrl on 17. 4. 10.
 */

var path = require('path');
var rootDir = path.dirname(require.main.filename);
var memberRegister = require('express').Router();
var User = require(rootDir+'/models/user');


memberRegister.get('/', function (req, res) {
    res.sendFile(rootDir+"/register.html");
});

memberRegister.post('/', function (req, res) {
    User.create(req.body)
        .then(function (user) {
            res.sendFile(rootDir+"/index.html");
        })
        .catch(function (err) {
            res.send(err);
        });
});

module.exports = memberRegister;