const { Joi, celebrate } = require('celebrate');
const { PATTERN_EMAIL, PATTERN_LINK } = require('../utils/utils');

module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(PATTERN_EMAIL),
    password: Joi.string().required(),
  }),
});

module.exports.validateRegister = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(PATTERN_EMAIL),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
});

module.exports.validateAddMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(PATTERN_LINK),
    trailerLink: Joi.string().required().pattern(PATTERN_LINK),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().pattern(PATTERN_LINK),
    movieId: Joi.number().required(),
  }),
});

module.exports.validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required(),
  }),
});

module.exports.validateUpdateProfile = celebrate({
  body: Joi.object().keys({
    email: Joi.string().pattern(PATTERN_EMAIL),
    name: Joi.string().min(2).max(30),
  }),
});
