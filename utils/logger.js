const util = require('./utils');

const logger = {
    /**
     * console에 로깅 (현재시간> message)
     * @param {String} message 
     */
    consoleLog : (...options) => {
        var now = util.dateUtils.dateFormatString("YYYY-MM-DD HH:MI:SS", new Date());
        var message = '';
        for(i in options) {
            message += options[i];
        }
        console.log(`${now}> ${message}`);
    },
    /**
     * DEV || REMOTE_DEV 일때만 console에 로깅 (현재시간> message)
     * @param {String} message 
     */
    devConsoleLog : (...options) => {
        if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'dev_remote') {
            var now = util.dateUtils.dateFormatString("YYYY-MM-DD HH:MI:SS", new Date());
            var message = '';
            for(i in options) {
                message += options[i];
            }

            console.log(`${now}> ${message}`);
        }
    },
    /**
     * DEV || REMOTE_DEV 일때만 console에 로깅 (현재시간> message)
     * @param {String} message 
     */
     devErrorConsoleLog : (...options) => {
        logger.devConsoleLog('error ', ...options);
    }
}

module.exports = logger;