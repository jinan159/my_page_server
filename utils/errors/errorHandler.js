const WrongRequestError = require('./WrongRequestError');

module.exports = (err, req, res, next) => {
    if (err instanceof WrongRequestError) {
        return res.status(err.code).json(err);
    }

    return res.status(500).json(err);
};