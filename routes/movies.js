const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getMovies,
  addMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/movies', getMovies);
router.post('/movies', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/^https?:\/\/(?:www\.)?[a-zA-Z0-9а-яА-Я-._~:/?#[\]@!$&'()*+,;=]+/im),
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(/^https?:\/\/(?:www\.)?[a-zA-Z0-9а-яА-Я-._~:/?#[\]@!$&'()*+,;=]+/im),
    trailerLink: Joi.string().required().pattern(/^https?:\/\/(?:www\.)?[a-zA-Z0-9а-яА-Я-._~:/?#[\]@!$&'()*+,;=]+/im),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().pattern(/^https?:\/\/(?:www\.)?[a-zA-Z0-9а-яА-Я-._~:/?#[\]@!$&'()*+,;=]+/im),
    movieId: Joi.number().required(),
  }),
}), addMovie);

router.delete('/movies/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required(),
  }),
}), deleteMovie);

module.exports = router;
