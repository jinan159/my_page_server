const express = require('express');
const Joi = require('joi');
const postService = require('../services/postService');
const logger = require('../../utils/logger');

const app = express();

// 글 목록 조회
app.get('/', function(req, res) {

    // API 스키마 정의
    const schema = Joi.object({
        sort : Joi.string().default('asc'),
        start : Joi.number().integer().greater(-1),
        count : Joi.number().integer().greater(-1)
    });

    // 스키마 테스트
    const req_validation = schema.validate(req.query);

    if (req_validation.error) {
        // 오류 로깅
        logger.devErrorConsoleLog(req_validation.error.details[0].message);
        res.json(req_validation.error);
    } else {
        // 서비스 호출
        postService.findAllPost(req.query, (results) => {
            res.json(results);
        });
    }
});

module.exports = app;