const historyModel = require('../models/history.model');

// @desc    Add or update movie in watch history
// @route   POST /api/history
// @access  Private
const addHistory = async (req, res) => {
    try {
        const { movieId, title, poster, currentTime, duration } = req.body;

        if (!movieId || !title || !poster) {
            return res.status(400).json({ message: 'Please provide all required fields (movieId, title, poster)' });
        }

        const updateData = {
            user: req.user._id,
            movieId,
            title,
            poster,
            watchedAt: Date.now()
        };

        if (currentTime !== undefined) updateData.currentTime = currentTime;
        if (duration !== undefined) updateData.duration = duration;

        const history = await historyModel.findOneAndUpdate(
            { user: req.user._id, movieId },
            updateData,
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
