const bcrypt = require('bcryptjs');
const User = require('../models/user');
const {
  VALIDATION_ERROR,
  INVALID_ID_ERROR,
  USER_NOT_FOUND_ERROR_MESSAGE,
  NOT_VALID_ID_ERROR_MESSAGE, SALT_ROUNDS, DUPLICATE_USER_ERROR_MESSAGE,
  WRONG_CREDENTIALS_ERROR_MESSAGE, JWT_COOKIE_NAME, CREATED_STATUS_CODE, DUPLICATE_USER_ERROR_CODE,
  JWT_DURATION_SECONDS,
} = require('../utils/utils');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict-err');
const AuthError = require('../errors/auth-err');

const { getJwtToken } = require('../utils/jwt');

module.exports.getUser = (req, res, next) => {
  User.findById(req.user.id)
    .orFail(new Error(NOT_VALID_ID_ERROR_MESSAGE))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message === NOT_VALID_ID_ERROR_MESSAGE) {
        next(new NotFoundError(USER_NOT_FOUND_ERROR_MESSAGE));
      } else if (err.name === INVALID_ID_ERROR) {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

module.exports.updateProfile = (req, res, next) => {
  const data = {
    name: req.body.name,
    email: req.body.email,
  };
  User.findByIdAndUpdate(req.user.id, data, {
    new: true,
    runValidators: true,
  })
    .orFail(new Error(NOT_VALID_ID_ERROR_MESSAGE))
    .then((user) => res.send(user))

    .catch((err) => {
      if (err.message === NOT_VALID_ID_ERROR_MESSAGE) {
        next(new NotFoundError(USER_NOT_FOUND_ERROR_MESSAGE));
      } else if ([VALIDATION_ERROR, INVALID_ID_ERROR].includes(err.name)) {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

module.exports.registerUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, SALT_ROUNDS)
    .then((hash) => User.create({
      name, email, password: hash,
    }).then((user) => {
      res.status(CREATED_STATUS_CODE).send(user);
    }))
    .catch((err) => {
      if (err.code === DUPLICATE_USER_ERROR_CODE) {
        next(new ConflictError(DUPLICATE_USER_ERROR_MESSAGE));
      }
      if (err.name === VALIDATION_ERROR) {
        next(new BadRequestError(err.message));
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) throw new AuthError(WRONG_CREDENTIALS_ERROR_MESSAGE);
      bcrypt.compare(password, user.password)
        .then((isValidPassword) => {
          if (!isValidPassword) return next(new BadRequestError(WRONG_CREDENTIALS_ERROR_MESSAGE));
          const token = getJwtToken(user._id);
          res.cookie(JWT_COOKIE_NAME, token, {
            maxAge: JWT_DURATION_SECONDS,
            httpOnly: true,
          });
          return res.send(user);
        });
    })
    .catch(next);
};

module.exports.logout = (req, res, next) => {
  User.findById(req.user.id).then(() => res.clearCookie(JWT_COOKIE_NAME).end()).catch(next);
};
