const postModel = require('../models/postModel');
const logger = require('../../utils/logger');

module.exports = {    
    /**
     * 글 목록 조회
     * @param {Object} params       조회를 위한 파라미터들
     * @param {Function} callback 
     */
    findAllPost: (params, callback) => {

        logger.devLog(JSON.stringify(params));

        // 전체 글 목록 조회
        postModel.findAllPost(params, (results)=>{
            callback(results);
        });
    },

    /**
     * 글 저장
     * @param {Object} params 
     * @param {Function} callback 
     * @returns {Promise} 
     */
    savePost: (params, callback) => {

        logger.devLog(JSON.stringify(params));
        
        // id여부를 통해 등록인지, 수정인지 확인
        if (params.id) {
            // 글 확인
            postModel.selectPostCount({id: params.id}, (results)=>{

                // 해당되는 글이 있음
                if (results[0].count > 0) {

                    logger.devLog(JSON.stringify(params));

                    // 글 수정
                    postModel.updatePost(params, (results)=>{
                        if (results) {
                            callback(params);
                        } else {
                            callback(results);
                        }
                    });
                // 해당되는 글이 없음
                } else {
                    callback({message:'Post that do not exist cannot be updated'});
                }                
            });
        } else {
            // 글 등록
            postModel.insertPost(params, (results)=>{
                callback(results);
            });
        }   
    }
}

