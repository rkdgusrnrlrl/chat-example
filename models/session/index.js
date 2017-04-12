/**
 * Created by rkdgusrnrlrl on 17. 4. 12.
 */
var path = require('path');
var rootDir = path.dirname(require.main.filename);
var Sequalize = require('sequelize');
var seq = new Sequalize("sqlite", 'rkd', '123', {
    host : "localhost",
    dialect : "sqlite",
    storage : rootDir + "/sessions.db"
});

var Session = seq.define('session', {
    sid : {
        type : Sequalize.STRING,
        primaryKey : true,
        allowNull : false,
    },
    expired : {
        type :Sequalize.STRING,
        allowNull : false,
    },
    sess : {
        type :Sequalize.STRING,
        allowNull : false,
    }
}, {
    timestamps : false,
    instanceMethods : {
        getJson : function () {
            return JSON.parse(this.sess);
        },
        setAttr : function (propertiName, val) {
            var data = JSON.parse(this.sess);
            data[propertiName] = val;
            this.update({sess: JSON.stringify(data)});
        }
    }
});

Session.sync();

module.exports = Session;