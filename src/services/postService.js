const postModel = require('../models/postModel');
const logger = require('../../utils/logger');

module.exports = {    
    /**
     * 글 목록 조회
     * @param {Object} params       조회를 위한 파라미터들
     * @param {Function} callback 
     */
    findAllPost : (params, callback) => {

        logger.devLog(JSON.stringify(query_params));

        // 전체 글 목록 조회
        postModel.findAllPost(params, (results)=>{
            callback(results);
        });
    }
}

