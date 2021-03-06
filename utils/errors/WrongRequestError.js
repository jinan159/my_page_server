/**
 * 잘못된 요청이 들어온 경우 발생하는 error
 */
class WrongRequestError extends Error {
    /**
     * 
     * @param {String} message 오류 메세지
     * @param  {...any} params 
     */
    constructor(message, ...params) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, WrongRequestError);
        }

        this.code = 400;
        this.message = message;
    }
}

module.exports = WrongRequestError;