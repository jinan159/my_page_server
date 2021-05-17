
var mysql = require('mysql');
var development = require('./env/development.js');
var production = require('./env/production.js');
var pool = null;

if (process.env.NODE_ENV === 'development') {
    pool = mysql.createPool({
        host     : development.host,
        user     : development.user,
        password : development.password,
        database : development.database,
        port     : development.port
    });
} else if (process.env.NODE_ENV === 'production') {
    pool = mysql.createPool({
        host     : production.host,
        user     : production.user,
        password : production.password,
        database : production.database,
        port     : production.port
    });
}

module.exports = pool;