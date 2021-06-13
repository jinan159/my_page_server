const { initializeExtends } = require('./utils/extends');
const connectionPool = require('./config/connectionPool');
const express = require('express');
const logger = require('./utils/logger');
const { envUtils } = require('./utils/utils');
const app = express();
const PORT = 3000;

// NODE_ENV가 세팅되지 않았다면 'DEV'로 기본 세팅
envUtils.initNodeEnv();

// DB 연결 테스트
connectionPool.isValidConnectionPool()
    .then(
        resolved => {
            // DB연결 성공
            if (resolved) {
                logger.log(`[${process.env.NODE_ENV}] db connected!!`);

                // 상속 정보들 초기화
                initializeExtends();

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
                    logger.log('Server listening on '+PORT+' . . .');
                });
            } else {
                throw new Error('Error while starting server')
            }
        }, 
        rejected => {
            if (rejected instanceof Error) throw rejected;
            else logger.log(rejected);
        }
    ).catch(error => {
        logger.devError(error);
    });

// .then(
//     resolved => {
//         // DB 연결 성공
//         if (resolved) {
            
//         } 
//         // DB연결 실패
//         else {
//             logger.log('Check DB Connection Information');
//         }
//     },
//     rejected => {
//         logger.log('Error occured during get connection from connectino pool');
//         if (rejected instanceof Error) {
//             logger.devError(rejected);
//         }
//     }
// ).catch(error => {
//     logger.log('Error occured during DB connection config setting');
//     if (rejected instanceof Error) {
//         logger.error(rejected);
//     }
// });