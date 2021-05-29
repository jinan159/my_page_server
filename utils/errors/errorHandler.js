const logger = require('../logger');
const WrongRequestError = require('./WrongRequestError');
const ResourceNotExistError = require('./ResourceNotExistError');

module.exports = (err, req, res, next) => {
    if (err instanceof WrongRequestError ||  // 400
        err instanceof ResourceNotExistError // 404
        ) { 
        res.status(err.code).json(err.message);
    }

    logger.devError(err.stack);

    if (process.env.NODE_ENV == 'dev' || process.env.NODE_ENV == 'dev_remote') {
        res.status(500).send(err.stack);
    } else {
        
        res.status(500).send("Internal Server Error");
    }
};