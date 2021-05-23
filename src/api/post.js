const express = require('express');
const Joi = require('joi');
const postService = require('../services/postService');
const WrongRequestError = require('../../utils/errors/WrongRequestError');

const app = express();

// 글 목록 조회
app.get('/', function(req, res) {

    // API 스키마 정의
    const schema = Joi.object({
        sort : Joi.string().default('asc'),
        start : Joi.number().integer().greater(-1),
        count : Joi.number().integer().greater(-1)
    });

    // 요청 파라미터 validation
    const req_validation = schema.validate(req.query);

    // validation 오류
    if (req_validation.error) {        
        // 잘못된 요청
        throw new WrongRequestError(400, req_validation.error.details[0].message);
    } else {
        // 서비스 호출
        postService.findAllPost(req.query, (results) => {
            res.json(results);
        });
    }
});

module.exports = app;