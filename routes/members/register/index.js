/**
 * Created by rkdgusrnrlrl on 17. 4. 10.
 */

var path = require('path');
var rootDir = path.dirname(require.main.filename);
var memberRegister = require('express').Router();
var User = require(rootDir+'/models/user');
var LoginService = require(rootDir+'/services/LoginService');
var bcrypt = require('bcrypt');


memberRegister.get('/', function (req, res) {
    res.sendFile(rootDir+"/views/register.html");
});

memberRegister.post('/', function (req, res) {
    bcrypt.hash(req.body.password, 10)
        .then(hashPassword => {
            var user = req.body;
            user.password = hashPassword;
            user.password_re = hashPassword;
            return User.create(user)
        })
        .then(function (user) {
            LoginService.logind(req.session, user.toJSON());
            res.redirect('/');
        })
        .catch(function (err) {
            res.json(err);
        });
});

module.exports = memberRegister;