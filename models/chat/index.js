/**
 * Created by rkdgusrnrlrl on 17. 4. 10.
 */
var path = require('path');
var rootDir = path.dirname(require.main.filename);
var db = require(rootDir+'/models/db');
var Sequalize = require('sequelize');

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
});

Chat.sync();

module.exports = Chat;