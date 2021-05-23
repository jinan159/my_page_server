const express = require('express');
const app = express();
const PORT = 3000;
const NODE_ENV = process.env.NODE_ENV;
if (NODE_ENV !== 'prod' && NODE_ENV !== 'dev' && NODE_ENV !== 'dev_remote') process.env.NODE_ENV = 'dev';

// 모듈 선언
const cors = require('cors');
const errorHandler = require('./utils/errors/errorHandler');

// 모듈 적용
app.use(cors());                                    // CORS 허용 설정
app.use(express.json());                            // Request 데이터 json으로 변환

// router 선언
const post = require('./src/api/post'); 

// router 적용
app.use('/api/post', post);

// error 핸들러 추가
app.use(errorHandler);

//서버 start
app.listen(PORT, function() {
    console.log('Server listening on '+PORT+' . . .');
});