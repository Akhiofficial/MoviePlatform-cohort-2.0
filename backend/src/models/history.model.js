const mongoose = require('mongoose');

const historySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        movieId: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        poster: {
            type: String,
            required: true,
        },
        watchedAt: {
            type: Date,
            default: Date.now,
        }
    },
    { timestamps: true }
);

// Optional: ensure unique combinations for a user & movie to avoid duplication
// Note: Some models might want duplicates for 'multiple watches', but usually watch history updates the watchedAt timestamp
historySchema.index({ user: 1, movieId: 1 }, { unique: true });

const historyModel = mongoose.model('history', historySchema);

module.exports = historyModel;
