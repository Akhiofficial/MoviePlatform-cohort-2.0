const movieModel = require('../models/movie.model');

// @desc    Add a new movie
// @route   POST /api/admin/movies
// @access  Private/Admin
const addMovie = async (req, res) => {
    try {
        const { title, poster, description, releaseDate, trailer, genre, category } = req.body;

        if (!title || !poster || !description || !releaseDate || !trailer || !genre || !category) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const movie = await movieModel.create({
            title,
            poster,
            description,
            releaseDate,
            trailer,
            genre,
            category
        });

        res.status(201).json({
            message: 'Movie added successfully',
            movie
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Update a movie
// @route   PUT /api/admin/movies/:id
// @access  Private/Admin
const updateMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const movie = await movieModel.findByIdAndUpdate(id, updates, { new: true });

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        res.status(200).json({
            message: 'Movie updated successfully',
            movie
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Delete a movie
// @route   DELETE /api/admin/movies/:id
// @access  Private/Admin
const deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;

        const movie = await movieModel.findByIdAndDelete(id);

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        res.status(200).json({ message: 'Movie deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get all movies
// @route   GET /api/admin/movies
// @access  Private/Admin
const getMovies = async (req, res) => {
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

module.exports = {
    addMovie,
    updateMovie,
    deleteMovie,
    getMovies
};
