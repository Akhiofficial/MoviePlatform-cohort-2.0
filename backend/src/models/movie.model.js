const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        poster: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        releaseDate: {
            type: Date,
            required: true,
        },
        trailer: {
            type: String,
            required: true,
        },
        genre: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        director: {
            type: String,
            default: 'Unknown'
        },
        budget: {
            type: String,
            default: 'Unknown'
        },
        revenue: {
            type: String,
            default: 'Unknown'
        },
        duration: {
            type: Number,
            default: 120
        }
    },
    { timestamps: true }
);

const movieModel = mongoose.model('movie', movieSchema);

module.exports = movieModel;
