const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const NotFoundError = require('../errors/not-found-err');
const { login, registerUser, logout } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateLogin, validateRegister } = require('../middlewares/validations');
const { ERROR_NOT_FOUND_MESSAGE } = require('../utils/utils');

router.post('/signin', validateLogin, login);
router.post('/signup', validateRegister, registerUser);

router.use(auth);

router.post('/signout', logout);
router.use(userRouter);
router.use(movieRouter);

router.use('**', () => {
  throw new NotFoundError(ERROR_NOT_FOUND_MESSAGE);
});

module.exports = router;
