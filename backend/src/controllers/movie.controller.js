const movieModel = require('../models/movie.model');

// @desc    Get all public movies
// @route   GET /api/movies
// @access  Public
const getPublicMovies = async (req, res) => {
    try {
        const movies = await movieModel.find().sort({ createdAt: -1 });

        res.status(200).json({
            message: 'Movies fetched successfully',
            count: movies.length,
            movies
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get single public movie by ID
// @route   GET /api/movies/:id
// @access  Public
const getPublicMovieById = async (req, res) => {
    try {
        const movie = await movieModel.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        res.status(200).json({
            message: 'Movie fetched successfully',
            movie
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getPublicMovies,
    getPublicMovieById
};
