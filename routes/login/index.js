/**
 * Created by rkdgusrnrlrl on 17. 4. 10.
 */
var path = require('path');
var rootDir = path.dirname(require.main.filename);
var login = require('express').Router();
var User = require(rootDir+'/models/user');

login.get('/', function (req, res) {
    res.sendFile(__dirname+"/login.html");
});

login.post('/', function (req, res) {
    var param = req.body;
    User.findAndCountAll({
        where : {
            id : param.id
        }
    })
        .then(function (result) {
            if (result.count == 1) {
                var user = result.rows[0];
                var plainUser = user.get({plain : true});
                console.log(plainUser);
                if (user.password === param.password) {
                    res.send(plainUser);
                } else {
                    res.send("패스워드 불일치");
                }
            } else {
                res.send("없는 아이디");
            }
        })
        .catch(function (err) {
            res.send(err);
        })
});

module.exports = login;
