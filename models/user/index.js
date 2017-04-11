/**
 * Created by rkdgusrnrlrl on 17. 4. 10.
 */
var Sequalize = require('sequelize');
var seq = new Sequalize("sqlite", 'rkd', '123', {
    host : "localhost",
    dialect : "sqlite",
    storage : __dirname + "/../../da.sqlite"
});

var User = seq.define('user', {
    id : {
        type : Sequalize.STRING,
        primaryKey : true,
        allowNull : false,
        validate : {
            notEmpty : {
                args : true,
                msg : "아아디를 입력해주세요."
            }
        }
    },
    name : {
        type :Sequalize.STRING,
        allowNull : false,
        notEmpty : {
            args : true,
            msg : "이름을 입력해주세요."
        }
    },
    email : {
        type :Sequalize.STRING,
        allowNull : false,

        validate : {
            notEmpty : {
                args : true,
                msg : "이메일을 입력해주세요."
            },
            isEmail : {
                args : true,
                msg : "이메일 형식에 맞지 않습니다."
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