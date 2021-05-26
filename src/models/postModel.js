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
     * @param {String} sort 정렬방식 (ASC, DESC)
     * @param {Number} start 페이징 시작 인덱스
     * @param {Number} count 페이징 개수
     * @param {Function} callback 
     */
    findAllPost : (sort, start, count, callback) => {
        // 쿼리 파라미터 생성
        let query_params = {}

        // 파라미터 삽입
        if (sort) query_params.sort = sort;
        if (start) query_params.start = start;
        if (count) query_params.count = count;

        logger.devConsoleLog(JSON.stringify(query_params));

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

    // /**
    //  * 글 등록
    //  * @param {String} title 
    //  * @param {String} writer 
    //  * @param {String} content 
    //  * @param {Date} start_date 
    //  * @param {Date} end_date 
    //  */
    // insertPost : (title, writer, content, start_date, end_date) => {
        
    // }
}

module.exports = postModel;