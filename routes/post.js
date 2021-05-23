const express = require('express');
const app = express();
const PostDAO = require('../models/Post');
const logger = require('../utils/logger');

// 글 목록 조회
app.get('/', function(req, res) {
    let query_params = {};

    // 정렬 파라미터 있으면 삽입
    if (req.query.sort) {
        query_params.sort = req.query.sort;
    }

    // 페이징 파라미터 삽입
    if (req.query.start && req.query.count) {
        query_params.start = Number(req.query.start); // 페이징 시작 index
        query_params.count = Number(req.query.count); // 페이징 개수
    }

    logger.devConsoleLog(query_params.sort, ', ', query_params.start, ', ', query_params.count);
    logger.devConsoleLog(typeof query_params.sort, ', ', typeof query_params.start, ', ', typeof query_params.count);

    // 전체 글 목록 조회
    PostDAO.findAllPost(query_params.sort, query_params.start, query_params.count, (results) => {
        res.send(results);
    });
});

module.exports = app;