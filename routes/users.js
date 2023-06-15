const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  updateProfile, getUser,
} = require('../controllers/users');

router.get('/users/me', getUser);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/),
    mame: Joi.string().min(2).max(30),
  }),
}), updateProfile);

module.exports = router;