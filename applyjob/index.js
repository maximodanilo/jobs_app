const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/logging.js');
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);


winston.info('7')
const port = process.env.NODE_ENV === "test" ? 0 : process.env.PORT || 3040;
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = server;