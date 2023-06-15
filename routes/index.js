const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const NotFoundError = require('../errors/not-found-err');
const { login, registerUser, logout } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateLogin, validateRegister } = require('../middlewares/validations');

router.post('/signin', validateLogin, login);
router.post('/signup', validateRegister, registerUser);

router.use(auth);

router.post('/signout', logout);
router.use(userRouter);
router.use(movieRouter);

router.use('**', () => {
  throw new NotFoundError('This is not the web page you are looking for');
});

module.exports = router;
