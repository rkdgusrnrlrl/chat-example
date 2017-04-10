/**
 * Created by rkdgusrnrlrl on 17. 4. 10.
 */


var Sequalize = require('sequelize');
var seq = new Sequalize("sqlite", 'rkd', '123', {
    host : "localhost",
    dialect : "sqlite",
    storage : __dirname + "/../../da.sqlite"
});

module.exports = seq.define('user', {
    id : {
        type : Sequalize.STRING,
        primaryKey : true,
        allowNull : false
    },
    name : {
        type :Sequalize.STRING,
        allowNull : false
    },
    email : {
        type :Sequalize.STRING,
        allowNull : false
    },
    password: {
        type :Sequalize.STRING,
        allowNull : false
    },
    password_re : {
        type :Sequalize.VIRTUAL
    }
});