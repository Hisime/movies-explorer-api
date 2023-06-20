const router = require('express').Router();
const {
  getMovies,
  addMovie,
  deleteMovie,
} = require('../controllers/movies');
const { validateAddMovie, validateDeleteMovie } = require('../middlewares/validations');

router.get('/movies', getMovies);
router.post('/movies', validateAddMovie, addMovie);

router.delete('/movies/:movieId', validateDeleteMovie, deleteMovie);

module.exports = router;
