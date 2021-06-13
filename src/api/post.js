const express = require('express');
const Joi = require('joi');
const postService = require('../services/postService');
const WrongRequestError = require('../../utils/errors/WrongRequestError');
const logger = require('../../utils/logger');

const app = express();

// 글 목록 조회
app.get('/', function(req, res, next) {

    // API 스키마 정의
    const schema = Joi.object({
        sort : Joi.string().valid('asc', 'desc'),
        start: Joi.number().integer().greater(-1),
        count: Joi.number().integer().greater(-1)
    });

    // 요청 파라미터 validation
    const req_validation = schema.validate(req.query);

    logger.devLog("req.query : ", req.query);

    // validation 오류
    if (req_validation.error) {        
        // 잘못된 요청
        throw new WrongRequestError(req_validation.error.details[0].message);
    } else {
        // 서비스 호출
        postService.findAllPost(req.query)
            .then(
                (results) => {        
                    res.json(results);
                },
                (rejected)=>{
                    if (rejected instanceof Error) throw rejected;
                    else res.json(rejected);
                }
            )
            .catch(next);
    }
});

// 글 등록
app.post('/', function(req, res, next) {

    const schema = Joi.object({
        title       : Joi.string().max(50).required(),
        writer      : Joi.string().max(50).required(),
        content     : Joi.string(),
        start_date  : Joi.date(),
        end_date    : Joi.date(),
    });

    // 요청 파라미터 validation
    const req_validation = schema.validate(req.body);

    // validation 오류
    if (req_validation.error) {        
        // 잘못된 요청
        throw new WrongRequestError(req_validation.error.details[0].message);
    } else {
        // 서비스 호출
        postService.savePost(req.body)
            .then(
                (resolved)=>{
                    res.json(resolved);
                },
                (rejected)=>{
                    if (rejected instanceof Error) throw rejected;
                    else res.json(rejected);
                }
            ).catch(next);
    }
});

// 글 수정
app.put('/', function(req, res, next) {
    
    const schema = Joi.object({
        id          : Joi.number().required(),
        title       : Joi.string().max(50).required(),
        writer      : Joi.string().max(50).required(),
        content     : Joi.string(),
        start_date  : Joi.date(),
        end_date    : Joi.date(),
    });

    // 요청 파라미터 validation
    const req_validation = schema.validate(req.body);

    // validation 오류
    if (req_validation.error) {        
        // 잘못된 요청
        throw new WrongRequestError(req_validation.error.details[0].message);
    } else {
        // 서비스 호출
        postService.savePost(req.body)
            .then(
                (resolved)=>{
                    res.json(resolved);
                },
                (rejected)=>{
                    if (rejected instanceof Error) throw rejected;
                    else res.json(rejected);
                }
            ).catch(next);
    }
});

module.exports = app;