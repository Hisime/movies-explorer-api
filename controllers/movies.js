const Movie = require('../models/movie');
const {
  VALIDATION_ERROR,
  INVALID_ID_ERROR,
  CREATED_STATUS_CODE,
  MOVIE_NOT_FOUND_ERROR_MESSAGE,
  MOVIE_DELETE_OWNER_ERROR_MESSAGE,
  MOVIE_DELETE_OWNER_ERROR_CODE,
  NOT_VALID_ID_ERROR_MESSAGE,
} = require('../utils/utils');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user.id })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.addMovie = (req, res, next) => {
  const data = {
    country: req.body.country,
    director: req.body.director,
    duration: req.body.duration,
    year: req.body.year,
    description: req.body.description,
    image: req.body.image,
    trailerLink: req.body.trailerLink,
    nameRU: req.body.nameRU,
    nameEN: req.body.nameEN,
    thumbnail: req.body.thumbnail,
    movieId: req.body.movieId,
    owner: req.user.id,
  };
  Movie.create(data)
    .then((movie) => res.status(CREATED_STATUS_CODE).send(movie))
    .catch((err) => {
      if ([VALIDATION_ERROR, INVALID_ID_ERROR].includes(err.name)) {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const userId = req.user.id;
  Movie.findById(movieId)
    .populate('owner')
    .orFail(new Error(NOT_VALID_ID_ERROR_MESSAGE))
    .then((movie) => {
      if (userId === movie.owner.id.toString()) {
        Movie.findByIdAndRemove(movieId)
          .then((removedMovie) => res.send(removedMovie));
      } else {
        throw new Error(MOVIE_DELETE_OWNER_ERROR_CODE);
      }
    })
    .catch((err) => {
      if (err.message === NOT_VALID_ID_ERROR_MESSAGE) {
        next(new NotFoundError(MOVIE_NOT_FOUND_ERROR_MESSAGE));
      } else if (err.name === INVALID_ID_ERROR) {
        next(new BadRequestError(err.message));
      } else if (err.message === MOVIE_DELETE_OWNER_ERROR_CODE) {
        next(new ForbiddenError(MOVIE_DELETE_OWNER_ERROR_MESSAGE));
      } else {
        next(err);
      }
    });
};
