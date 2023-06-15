const { Joi, celebrate } = require('celebrate');

module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/),
    password: Joi.string().required(),
  }),
});

module.exports.validateRegister = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
});
