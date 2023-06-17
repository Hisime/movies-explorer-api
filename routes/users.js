const router = require('express').Router();

const {
  updateProfile, getUser,
} = require('../controllers/users');
const { validateUpdateProfile } = require('../middlewares/validations');

router.get('/users/me', getUser);
router.patch('/users/me', validateUpdateProfile, updateProfile);

module.exports = router;
