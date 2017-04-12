/**
 * Created by rkdgusrnrlrl on 17. 4. 10.
 */
var path = require('path');
var rootDir = path.dirname(require.main.filename);
var db = require(rootDir+'/models/db');
var Sequalize = require('sequelize');
var User = require(rootDir+'/models/user');

var Chat = db.define('chat', {
    seq : {
        type : Sequalize.INTEGER,
        primaryKey : true,
        allowNull : false,
        autoIncrement: true,
    },
    id : {
        type :Sequalize.STRING,
        allowNull : false,
        notEmpty : true
    },
    msg : {
        type :Sequalize.STRING,
        allowNull : false,
        validate : {
            notEmpty : true
        }
    }
}, {
    instanceMethods : {
        convertJson : function () {
            return { msg : this.msg, userId : this.user.id , userName : this.user.name, seq : this.seq };
        }
    }
});


Chat.belongsTo(User, {foreignKey : 'id', targetKey : 'id'});

Chat.sync();

module.exports = Chat;