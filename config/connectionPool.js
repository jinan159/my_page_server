const mysql = require('mysql');
const development = require('./env/development');
const production = require('./env/production');
const logger = require('../utils/logger');
const { dateUtils, envUtils } = require('../utils/utils');

var ConnectionPool = (function() {
    // private 영역
    var pool = null;
  
    return {
        // public 영역

        /**
         * connection pool 싱글톤 객체 반환
         * @returns {Object} connection pool 싱글톤 객체
         */
        getConnectionPool: function () {
            if (!pool) {
                try {
                    logger.log(`Creating [${envUtils.getCurrentNodeEnv()}] DB Connnection pool...`);
                    // 개발환경일 경우
                    if (envUtils.isDevEnv()) {
                        // 원격 개발일 경우 host를 remote_host로 변경
                        if (envUtils.isRemoteDevEnv()) development.host = development.remote_host;
                    
                        pool = mysql.createPool({
                            host     : development.host,
                            user     : development.user,
                            password : development.password,
                            database : development.database,
                            port     : development.port
                        });

                        logger.log(`Success to create [${envUtils.getCurrentNodeEnv()}] DB Connection pool!`);
                    } 
                    // 운영환경일 경우
                    else if (envUtils.isProductionEnv()) {
                        pool = mysql.createPool({
                            host     : production.host,
                            user     : production.user,
                            password : production.password,
                            database : production.database,
                            port     : production.port
                        });
                        logger.log(`Success to create [${envUtils.getCurrentNodeEnv()}] DB Connection pool!`);
                    }
                } catch (error) {
                    logger.error('Error while create pool');
                    logger.devError(error);
                }
            }

            return pool;
        },
        /**
         * DB 연결 테스트
         * @returns {Promise}
         */
        isValidConnectionPool: async function() {
            
            try {
                var connectionTest = new Promise((resolve, reject) => {
                    if (!pool) pool = this.getConnectionPool();

                    logger.log(`Validate Connection of [${envUtils.getCurrentNodeEnv()}] DB Connection pool...`);
    
                    pool.getConnection( (error, connection) => {
                        if (error) reject(error);

                        if (!!connection) {
                            // 테스트 쿼리 실행
                            connection.query("SELECT NOW() now", (error, results, fields) => {
                                if (error) reject(error);
                                var db_server_time = dateUtils.getFormattedDateString('YYYY-MM-DD HH:MI:SS', new Date(results[0].now));
                                logger.log(`[${envUtils.getCurrentNodeEnv()}] DB Server time : ${db_server_time}`);
        
                                if (results && results.length > 0 && results[0].now) {
                                    resolve(true);
                                }
                            });
                        }
                    });    
                });
                return await connectionTest;
            } catch (error) {
                logger.error(`Error while validate [${envUtils.getCurrentNodeEnv()}] db connection`);
                logger.devError(error);
            }
        }
    };
  })();

module.exports = ConnectionPool;