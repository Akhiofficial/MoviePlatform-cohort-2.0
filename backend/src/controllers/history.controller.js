const historyModel = require('../models/history.model');

// @desc    Add or update movie in watch history
// @route   POST /api/history
// @access  Private
const addHistory = async (req, res) => {
    try {
        const { movieId, title, poster } = req.body;

        if (!movieId || !title || !poster) {
            return res.status(400).json({ message: 'Please provide all required fields (movieId, title, poster)' });
        }

        // Upsert behavior: If it exists, update watchedAt to now. If not, create it.
        const history = await historyModel.findOneAndUpdate(
            { user: req.user._id, movieId },
            {
                user: req.user._id,
                movieId,
                title,
                poster,
                watchedAt: Date.now()
            },
            { new: true, upsert: true }
        );

        res.status(200).json({
            message: 'History updated',
            history
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get user's watch history
// @route   GET /api/history
// @access  Private
const getHistory = async (req, res) => {
    try {
        const history = await historyModel.find({ user: req.user._id }).sort({ watchedAt: -1 });

        res.status(200).json({
            message: 'History fetched successfully',
            history
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    addHistory,
    getHistory
};
