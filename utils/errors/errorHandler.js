const logger = require('../logger');
const WrongRequestError = require('./WrongRequestError');

module.exports = (err, req, res, next) => {
    if (err instanceof WrongRequestError) {
        return res.status(err.code).json(err.message);
    }

    logger.devError(err.stack);

    if (process.env.NODE_ENV !== 'dev' && process.env.NODE_ENV !== 'dev_remote') {
        return res.status(500).send(err.stack);
    } else {
        return res.status(500).send('Internal Server Error');
    }
    
};