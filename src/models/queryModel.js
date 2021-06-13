const mapper = require('mybatis-mapper');
const path = require('path');
const ConnectionPool = require('../../config/connectionPool');
const logger = require('../../utils/logger');

const pool = ConnectionPool.getConnectionPool();
const format = { language: 'sql', indent: ' ' };
const postMapperPath = path.join(__dirname, '../../sql/Post.xml');

mapper.createMapper([postMapperPath]);

const queryModel = {
    /**
     *  쿼리 실행 공통함수
     * @param {String} namespace mybatis-mapper namespace
     * @param {String} sql_name  mybatis-mapper sql id
     * @param {Object} query_params 쿼리 파라미터들
     * @returns {Promise}
     */
     queryStatement: (namespace, sql_name, query_params) => {
        return new Promise((resolve, reject) => {
            // 쿼리 로드
            let query = mapper.getStatement(namespace, sql_name, query_params, format);
    
            // 커넥션풀에서 DB커넥션 가져옴
            pool.getConnection((error, connection) => {
                if (error) reject(error);

                // 쿼리 개발로그에 출력
                logger.devLog(query);

                // 쿼리 실행
                connection.query(query, (error, result, fields) => {
                    if (error) reject(error);

                    resolve(result);
                });

                // 연결 반환
                connection.release();
            });
        });
    },    
}

module.exports = queryModel;