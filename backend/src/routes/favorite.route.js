const express = require('express');
const { addFavorite, getFavorites, removeFavorite } = require('../controllers/favorite.controller');
const { identifyUser } = require('../middleware/auth.middleware');

const router = express.Router();

// Apply auth middleware to all favorite routes
router.use(identifyUser);

/**
 * @route /api/favorites
 *  */
router.post('/', identifyUser , addFavorite);

/**
 * @route  /api/favorites
 */
router.get('/', identifyUser, getFavorites);


router.delete('/:movieId', identifyUser, removeFavorite);

module.exports = router;
