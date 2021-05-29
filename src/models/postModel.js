const mapper = require('mybatis-mapper');
const path = require('path');
const pool = require('../../config/db_connection');
const logger = require('../../utils/logger');

const format = { language: 'sql', indent: ' ' };
const mapperPath = path.join(__dirname, '../../sql/Post.xml');

mapper.createMapper([mapperPath]);

const postModel = {
    /**
     * 글 목록 조회
     * @param {Object} query_params 쿼리 파라미터
     * @param {Function} callback 
     */
    findAllPost: (query_params) => {
        return new Promise((resolve, reject) => {
            // 쿼리 로드
            let query = mapper.getStatement('Post', 'findAllPost', query_params, format);
    
            // 커넥션풀에서 DB커넥션 가져옴
            pool.getConnection( (error, connection) => {
                if (error) reject(error);
    
                logger.devLog(query); // [개발] 쿼리 콘솔에 출력
    
                // 쿼리 실행
                connection.query(query, (error, results, fields) => {
                    if (error) reject(error);
                    
                    // 조회 결과 콜백함수에 리턴
                    resolve(results);
                });
            });        
        });
    },

    /**
     * 글 개수 조회
     * @param {Object} query_params 쿼리 파라미터
     * @returns {Promise}
     */
    selectPostCount: (query_params) => {
        return new Promise((resolve, reject) => {
            // 조회 쿼리 로드
            let query = mapper.getStatement('Post', 'selectPostCount', query_params, format);
    
            // 커넥션풀에서 DB커넥션 가져옴
            pool.getConnection( (error, connection) => {
                if (error) reject(error);
    
                logger.devLog(query); // [개발] 쿼리 콘솔에 출력
    
                // 쿼리 실행
                connection.query(query, (error, results, fields) => {
                    if (error) reject(error);
                    
                    // 조회 결과 콜백함수에 리턴
                    resolve(results);
                });
            });            
        });
    },

    /**
     * 글 등록
     * @param {Object} query_params 
     * @returns {Promise}
     */
     insertPost : (query_params) => {
        return new Promise((resolve, reject) => {
            // 쿼리 로드
            let query = mapper.getStatement('Post', 'insertPost', query_params, format);

            // 커넥션풀에서 DB커넥션 가져옴
            pool.getConnection( (error, connection) => {
                if (error) reject(error)

                logger.devLog(query); // [개발] 쿼리 콘솔에 출력

                // 쿼리 실행
                connection.query(query, (error, results, fields) => {
                    if (error) reject(error);
                    
                    // 조회 결과 콜백함수에 리턴
                    resolve(results);
                });
            });
        });
    },

    /**
     * 글 수정
     * @param {Object} query_params 
     * @returns {Promise}
     */
    updatePost: (query_params) => {
        return new Promise((resolve, reject) => {
            // 쿼리 로드
            let query = mapper.getStatement('Post', 'updatePost', query_params, format);
    
            // 커넥션풀에서 DB커넥션 가져옴
            pool.getConnection( (error, connection) => {
                if (error) reject(error);
    
                logger.devLog(query); // [개발] 쿼리 콘솔에 출력
    
                // 쿼리 실행
                connection.query(query, (error, results, fields) => {
                    if (error) reject(error);
                    
                    // 조회 결과 콜백함수에 리턴
                    resolve(results);
                });
            });        
        });
    }
}

module.exports = postModel;