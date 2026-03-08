const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema(
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
    },
    { timestamps: true }
);

const favoriteModel = mongoose.model('favorite', favoriteSchema);

module.exports = favoriteModel;
