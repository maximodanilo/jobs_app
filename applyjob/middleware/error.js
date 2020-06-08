// const winston = require('winston');
const { createLogger, format, transports } = require('winston');
const logger = createLogger({
    format: format.combine(
        format.splat(),
        format.simple()
    ),
    transports: [new transports.Console()]
});

module.exports = function(err, req, res, next) {
    logger.verbose(err.message, err);
    console.log(err.message)
        // error
        // warn
        // info
        // verbose
        // debug 
        // silly

    res.status(500).send('Something failed.');
}