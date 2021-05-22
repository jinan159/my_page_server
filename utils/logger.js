const util = require('./util');

module.exports = {
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
        if (process.env.NODE_ENV == 'development') {
            var now = util.dateUtils.dateFormatString("YYYY-MM-DD HH:MI:SS", new Date());
            var message = '';
            for(i in options) {
                message += options[i];
            }

            console.log(`${now}> ${message}`);
        }
    }
}