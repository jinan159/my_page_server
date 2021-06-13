const mapper = require('mybatis-mapper');
const path = require('path');
const ConnectionPool = require('../../config/connectionPool');
const logger = require('../../utils/logger');
const queryModel = require('./queryModel');
const pool = ConnectionPool.getConnectionPool();

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
        return queryModel.queryStatement('Post', 'findAllPost', query_params);
    },

    /**
     * 글 개수 조회
     * @param {Object} query_params 쿼리 파라미터
     * @returns {Promise}
     */
    selectPostCount: (query_params) => {
        return queryModel.queryStatement('Post', 'selectPostCount', query_params);
    },

    /**
     * 글 등록
     * @param {Object} query_params 
     * @returns {Promise}
     */
     insertPost : (query_params) => {
        return queryModel.queryStatement('Post', 'insertPost', query_params);
    },

    /**
     * 글 수정
     * @param {Object} query_params 
     * @returns {Promise}
     */
    updatePost: (query_params) => {
        return queryModel.queryStatement('Post', 'updatePost', query_params);
    }
}

module.exports = postModel;