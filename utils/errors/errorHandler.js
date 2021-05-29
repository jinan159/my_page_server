const logger = require('../logger');
const WrongRequestError = require('./WrongRequestError');
const ResourceNotExistError = require('./ResourceNotExistError');

module.exports = (err, req, res, next) => {
    if (err instanceof WrongRequestError) { // 400
        return res.status(err.code).json(err.message);
    } 
    else if (err instanceof ResourceNotExistError) { // 404
        return res.status(err.code).json(err.message);
    }

    logger.devError(err instanceof Error);
    logger.devError(err instanceof ResourceNotExistError);
    logger.devError(err.code);

    logger.devError(err.stack);

    if (process.env.NODE_ENV !== 'dev' && process.env.NODE_ENV !== 'dev_remote') {
        return res.status(500).send(err.stack);
    } else {
        return res.status(500).send('Internal Server Error');
    }
    
};