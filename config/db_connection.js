const mysql = require('mysql');
const development = require('./env/development');
const production = require('./env/production');
const logger = require('../utils/logger');

const NODE_ENV = process.env.NODE_ENV;
var pool = null;

// 개발 로깅
logger.consoleLog('db_connection(process.env.NODE_ENV) : ', process.env.NODE_ENV);

if (NODE_ENV === 'dev' || NODE_ENV === 'dev_remote') {
    // 원격 개발일 경우 host를 remote_host로 변경
    if (NODE_ENV === 'dev_remote') development.host = development.remote_host;

    pool = mysql.createPool({
        host     : development.host,
        user     : development.user,
        password : development.password,
        database : development.database,
        port     : development.port
    });
} else if (NODE_ENV === 'prod') {
    pool = mysql.createPool({
        host     : production.host,
        user     : production.user,
        password : production.password,
        database : production.database,
        port     : production.port
    });
}

module.exports = pool;