const express = require('express');
const app = express();
const PostDAO = require('../models/Post');

// 글 목록 조회
app.get('/', function(req, res) {

    // 정렬 파라미터 있으면 삽입
    if (req.param.sort) {
        var sort = req.param.sort;
    }

    // 페이징 파라미터 삽입
    if (req.param.start && req.param.count) {
        var start = req.param.start; // 페이징 시작 index
        var count = req.param.count; // 페이징 개수
    }

    // 전체 글 목록 조회
    PostDAO.findAllPost(sort, start, count, (results) => {
        res.send(results);
        
    });
});

module.exports = app;