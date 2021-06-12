const util = require('./utils');
const LOG = '[LOG]';
const ERR = '[ERR]';
const DEV = '[DEV]';

/**
 * 실제 로그를 남기는 함수
 * @param  {...any} options 
 */
const writeLog = (...options) => {
    let pre = '';
    let now = util.dateUtils.dateFormatString("YYYY-MM-DD HH:MI:SS", new Date());
    let messageArr = [];
    let isError = false;

    // pre Text 여부에 따라 메세지 생성
    for(i in options) {
        switch (options[i]) {
            case ERR: pre += ERR; isError = true; break;
            case LOG: pre += LOG;                 break;
            case DEV: pre += DEV;                 break;
            default: messageArr.push(options[i]); break;
        }
    }

    // 오류가 포함된 경우 error 로깅
    if (isError) {
        console.error(`${pre} ${now} > `, ...messageArr);
    } else {
        console.log(`${pre} ${now} > `, ...messageArr);
    }
}

const logger = {
    /**
     * 일반 로그 ([LOG] 현재시간> message)
     * @param {any} message
     */
    log : (...message) => {
        writeLog(LOG, ...message);
    },
    /**
     * 에러 로그 ([ERROR] 현재시간> message)
     * @param {any} message 
     */
     error : (...message) => {
        writeLog(ERR, ...message);
    },
    /**
     * 개발 로그 ([DEV] 현재시간> message)
     * @param {any} message 
     */
    devLog : (...message) => {
        if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'dev_remote') {
            writeLog(DEV, ...message);
        }
    },
    /**
     * 개발 에러 로그 ([DEV][ERROR] 현재시간> message)
     * @param {any} message 
     */
     devError : (...message) => {
        if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'dev_remote') {
            writeLog(DEV, ERR, ...message);
        }
        
    }
}

module.exports = logger;