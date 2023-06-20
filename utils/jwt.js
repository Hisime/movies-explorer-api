const jwt = require('jsonwebtoken');
const { PRODUCTION_ENV_NAME, DEV_SECRET, JWT_DURATION_SECONDS } = require('./utils');

module.exports.getJwtToken = (id) => jwt.sign({ id }, process.env.NODE_ENV === PRODUCTION_ENV_NAME
  ? process.env.JWT_SECRET
  : DEV_SECRET, { expiresIn: JWT_DURATION_SECONDS });
