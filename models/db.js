/**
 * Created by rkdgusrnrlrl on 17. 4. 11.
 */
var path = require('path');
var rootDir = path.dirname(require.main.filename);
var Sequalize = require('sequelize');
var seq = new Sequalize("sqlite", 'rkd', '123', {
    host : "localhost",
    dialect : "sqlite",
    storage : rootDir + "/da.sqlite"
});

module.exports = seq;