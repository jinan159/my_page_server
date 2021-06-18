const postModel = require('../models/postModel');
const logger = require('../../utils/logger');
const ResourceNotExistError = require('../../utils/errors/ResourceNotExistError');

module.exports = {    
    /**
     * 글 목록 조회
     * @param {Object} params       조회를 위한 파라미터들
     * @returns {Promise} 
     */
    findAllPost: async (params) => {
        logger.devLog("[Service]", JSON.stringify(params));
        var page = null;
        var cnt = null;
        try {
            page = await postModel.findAllPost(params);
            cnt = await postModel.selectPostCount(params);
        } catch (error) {
            throw error;
        } finally {
            return {page, cnt};
        }   

        // return new Promise((resolve, reject) => {
            
    
        //     // 전체 글 목록 조회
        //     postModel.findAllPost(params)
        //         .then(
        //             (results) => {
        //                 resolve(results);
        //             },
        //             (rejected) => {
        //                 reject(rejected);
        //             }
        //         )
        //         .catch(err => {reject(err)});
        // });

    },

    /**
     * 글 저장
     * @param {Object} params
     * @returns {Promise} 
     */
    savePost: (params) => {
        return new Promise((resolve, reject) => {
            
            logger.devLog(JSON.stringify(params));
            
            // id여부를 통해 등록인지, 수정인지 확인
            if (params.id) {
                // 글 확인
                postModel.selectPostCount({id: params.id})
                    .then(
                        (resolved) => {
                            // 해당되는 글이 있음
                            if (resolved[0].count > 0) {
                                logger.devLog(JSON.stringify(params));
                                // 글 수정
                                postModel.updatePost(params)
                                    .then((resolved) => {
                                        if (resolved) {
                                            resolve(params);
                                        } else {
                                            reject(resolved);
                                        }
                                    })
                                    .catch(err => { reject(err)} );
                            // 해당되는 글이 없음
                            } else {
                                reject(new ResourceNotExistError('Post that do not exist cannot be updated'));
                            }         
                        }, 
                        (rejected) => {
                            reject(rejected);
                        }
                    )
                    .catch(err => {reject(err)});
            } else {
                // 글 등록
                postModel.insertPost(params)
                    .then(
                        (resolved) => {
                            resolve(resolved);
                        },
                        (rejected) => {
                            reject(rejected);
                        }
                    )
                    .catch(err => {reject(err)});
            }
        });
    }
}

