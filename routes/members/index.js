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
            res.json(users.map(user => user.get({plain: true})));
        })
        .catch(function (err) {
            res.json(err);
        });
});

members.post('/validate', function (req, res) {
    User.build(req.body)
        .validate()
        .then(function (err) {
            var data = {hasError : err? true : false, errors : err};
            res.json(data);
        })
        .catch(function (err) {
            res.json(err);
        });
});

module.exports = members;
