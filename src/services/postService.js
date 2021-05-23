const postModel = require('../models/postModel');

module.exports = {    
    /**
     * 글 목록 조회
     * @param {String} sort 정렬방식 (ASC, DESC)
     * @param {Number} start 페이징 시작 인덱스
     * @param {Number} count 페이징 개수
     * @param {Function} callback 
     */
    findAllPost : (params, callback) => {

        // 전체 글 목록 조회
        postModel.findAllPost(params.sort, params.start, params.count, (results)=>{
            callback(results);
        });
    }
}

