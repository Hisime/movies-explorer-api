const winston = require('winston');
const expressWinston = require('express-winston');
const { ERROR_LOG_FILE_NAME, LOG_FILE_NAME } = require('../utils/utils');

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: LOG_FILE_NAME }),
  ],
  format: winston.format.json(),
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: ERROR_LOG_FILE_NAME }),
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
