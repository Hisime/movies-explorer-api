const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-err');
const { ERROR_AUTH_MESSAGE, PRODUCTION_ENV_NAME, DEV_SECRET } = require('../utils/utils');

module.exports = async (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, process.env.NODE_ENV === PRODUCTION_ENV_NAME
      ? process.env.JWT_SECRET
      : DEV_SECRET);
  } catch (err) {
    next(new AuthError(ERROR_AUTH_MESSAGE));
  }

  req.user = payload;

  return next();
};
