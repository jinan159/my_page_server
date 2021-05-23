/**
 * 잘못된 요청이 들어온 경우 발생하는 error
 */
class WrongRequestError extends Error {
    /**
     * 
     * @param {Number} code 오류코드(default:400)
     * @param {String} message 오류 메세지
     * @param  {...any} params 
     */
    constructor(code, message, ...params) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, WrongRequestError);
        }

        this.code = code;
        this.message = message;
    }
}

module.exports = WrongRequestError;