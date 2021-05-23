const pool = require('../config/db_connection');
const mapper = require('mybatis-mapper');
const path = require('path');
const format = { language: 'sql', indent: ' ' };
const logger = require('../utils/logger');
const { devConsoleLog } = require('../utils/logger');

const mapperPath = path.join(__dirname, '../sql/Post.xml');

mapper.createMapper([mapperPath]);

const PostDAO = {
    /**
     * 글 목록 조회
     * @param {String} sort 정렬방식 (ASC, DESC)
     * @param {Number} start 페이징 시작 인덱스
     * @param {Number} count 페이징 개수
     * @param {Function} callback 
     */
    findAllPost : (sort, start, count, callback) => {
        let query_params = {};

        // 정렬 파라미터 있을경우, 쿼리 파라미터에 삽입
        if (sort) {
            sort = sort.toUpperCase();
            query_params.sort = sort;
        }

        // 페이징 파라미터 있을경우, 쿼리 파라미터에 삽입
        if (start > -1 && count > -1) {
            query_params.start = start;
            query_params.count = count;
        }

        // 조회 쿼리 로드
        let query = mapper.getStatement('Post', 'findAllPost', query_params, format);

        // 커넥션풀에서 DB커넥션 가져옴
        pool.getConnection( (error, connection) => {
            if (error) throw error;

            logger.devConsoleLog(query); // [개발] 쿼리 콘솔에 출력

            // 쿼리 실행
            connection.query(query, (error, results, fields) => {
                if (error) throw error;
                
                // 조회 결과 콜백함수에 리턴
                callback(results);
            });
        });
    },
    insertPost : (title, writer, content, start_date, end_date) => {
        
    }
}

module.exports = PostDAO;