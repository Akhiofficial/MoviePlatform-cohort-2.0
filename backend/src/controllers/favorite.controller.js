const favoriteModel = require('../models/favorite.model');

// @desc    Add a movie to favorites
// @route   POST /api/favorites
// @access  Private
const addFavorite = async (req, res) => {
    try {
        const { movieId, title, poster } = req.body;

        if (!movieId || !title || !poster) {
            return res.status(400).json({ message: 'Please provide all required fields (movieId, title, poster)' });
        }

        // Check if movie is already in favorites
        const existingFavorite = await favoriteModel.findOne({
            user: req.user._id,
            movieId
        });

        if (existingFavorite) {
            return res.status(400).json({ message: 'Movie is already in favorites' });
        }

        const favorite = await favoriteModel.create({
            user: req.user._id,
            movieId,
            title,
            poster
        });

        res.status(201).json({
            message: 'Added to favorites',
            favorite
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get user's favorite movies
// @route   GET /api/favorites
// @access  Private
const getFavorites = async (req, res) => {
    try {
        const favorites = await favoriteModel.find({ user: req.user._id });

        res.status(200).json({
            message: 'Favorites fetched successfully',
            favorites
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Remove a movie from favorites
// @route   DELETE /api/favorites/:movieId
// @access  Private
const removeFavorite = async (req, res) => {
    try {
        const { movieId } = req.params;

        const favorite = await favoriteModel.findOneAndDelete({
            user: req.user._id,
            movieId
        });

        if (!favorite) {
            return res.status(404).json({ message: 'Favorite not found' });
        }

        res.status(200).json({ message: 'Removed from favorites successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    addFavorite,
    getFavorites,
    removeFavorite
};
