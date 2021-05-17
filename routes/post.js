const express = require('express');
const app = express();
const PostDAO = require('../models/Post.js');

// 글 목록 조회
app.get('/', function(req, res) {
    PostDAO.findAllPost(req.param.sort, (results) => {
        res.send(results);
    });
});

module.exports = app;