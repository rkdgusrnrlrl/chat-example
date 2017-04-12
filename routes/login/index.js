/**
 * Created by rkdgusrnrlrl on 17. 4. 10.
 */
var path = require('path');
var rootDir = path.dirname(require.main.filename);
var login = require('express').Router();
var User = require(rootDir+'/models/user');
var LoginService = require(rootDir+'/services/LoginService');
var bcrypt = require('bcrypt');

login.get('/', function (req, res) {
    res.render(rootDir+"/views/login", {});
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
                var isEquls = bcrypt.compareSync(param.password, user.password);
                if (isEquls) {
                    var session = req.session;
                    LoginService.logind(session, user);
                    res.redirect('/');
                } else {
                    //패스워드 불일치
                    res.render(rootDir+"/views/login", { id : param.id, error : { msg : "잘못된 아이디나 패드워드입니다."} });
                }
            } else {
                //아이디 불일치
                res.render(rootDir+"/views/login",  { id : param.id, error : { msg : "잘못된 아이디나 패드워드입니다."} });
            }
        })
        .catch(function (err) {
            //아이디 불일치
            res.render(rootDir+"/views/login", {});
        })
});

module.exports = login;
