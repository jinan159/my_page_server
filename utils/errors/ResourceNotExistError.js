/**
 * 요청한 resource가 없는 경우 발생하는 error
 */
class ResourceNotExistError extends Error {
    /**
     * 
     * @param {String} message 오류 메세지
     * @param  {...any} params 
     */
    constructor(message, ...params) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ResourceNotExistError);
        }

        this.code = 404;
        this.message = message;
    }
}

module.exports = ResourceNotExistError;