/**
 * Created by rkdgusrnrlrl on 17. 4. 10.
 */
var path = require('path');
var rootDir = path.dirname(require.main.filename);
var db = require(rootDir+'/models/db');
var Sequalize = require('sequelize');

var User = db.define('user', {
    id : {
        type : Sequalize.STRING,
        primaryKey : true,
        allowNull : false,
        unique : true,
        validate : {
            notEmpty : {
                args : true,
                msg : "아아디를 입력해주세요."
            },
            unique : function (value, next) {
                User.count({where: {id : value}, attributes: ["id"]}).then(function(cnt) {
                    if (cnt > 0) {
                        var errorMesg = "이미 존재하는 아이디 입니다";
                        return next(errorMesg);
                    } else {
                        next();
                    }
                });
            }
        }
    },
    name : {
        type :Sequalize.STRING,
        allowNull : false,
        validate : {
            notEmpty: {
                args: true,
                msg: "이름을 입력해주세요."
            }
        }
    },
    email : {
        type :Sequalize.STRING,
        allowNull : false,
        unique : true,
        validate : {
            notEmpty : {
                args : true,
                msg : "이메일을 입력해주세요."
            },
            isEmail : {
                args : true,
                msg : "이메일 형식에 맞지 않습니다."
            },
            unique : function (value, next) {
                User.count({where: {email : value}, attributes: ["email"]}).then(function(cnt) {
                    if (cnt > 0) {
                        var errorMesg = "이미 존재하는 이메일 입니다";
                        return next(errorMesg);
                    } else {
                        next();
                    }
                });
            }
        }
    },
    password: {
        type :Sequalize.STRING,
        allowNull : false,
        validate : {
            notEmpty : {
                args : true,
                msg : "비밀번호를 입력해주세요."
            }
        }
    },
    password_re : {
        type :Sequalize.VIRTUAL,
        validate : {
            notEmpty : {
                args : true,
                msg : "비밀번호를 다시 입력해주세요."
            },
            notEqualPassword : function () {
                console.log(this.password);
                console.log(this.password_re);
                if (this.password !== this.password_re) {
                    throw new Error('패스워드가 일치 하지 않습니다.');
                }
            }
        }
    }
});

User.sync();

module.exports = User;