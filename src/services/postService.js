const postModel = require('../models/postModel');

module.exports = {    
    /**
     * 글 목록 조회
     * @param {Object} params       정렬 파라미터
     * @param {Function} callback 
     */
    findAllPost : (params, callback) => {

        // 전체 글 목록 조회
        postModel.findAllPost(params.sort, params.start, params.count, (results)=>{
            callback(results);
        });
    }
}

