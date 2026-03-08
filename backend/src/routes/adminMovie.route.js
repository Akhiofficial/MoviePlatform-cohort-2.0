const express = require('express');
const { addMovie, updateMovie, deleteMovie, getMovies } = require('../controllers/adminMovie.controller');
const { identifyUser, isAdmin } = require('../middleware/auth.middleware');

const router = express.Router();

// Apply identifyUser and isAdmin middleware to all admin movie routes
router.use(identifyUser);
router.use(isAdmin);

router.post('/', addMovie);
router.get('/', getMovies);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);

module.exports = router;
