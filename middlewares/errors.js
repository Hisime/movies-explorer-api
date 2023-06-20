const { ERROR_DEFAULT_MESSAGE, ERROR_CODE_DEFAULT } = require('../utils/utils');
// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  const { statusCode = ERROR_CODE_DEFAULT, message } = err;

  res.status(statusCode)
    .send({
      message: statusCode === ERROR_CODE_DEFAULT
        ? ERROR_DEFAULT_MESSAGE
        : message,
    });
};
