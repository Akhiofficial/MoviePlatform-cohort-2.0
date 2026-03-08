const express = require('express');
const { registerUser, loginUser, logoutUser, getMe } = require('../controllers/auth.controller');
const { identifyUser } = require('../middleware/auth.middleware');

const router = express.Router();

// @description    register new user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', registerUser);


// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
router.post('/login', loginUser);


// @desc    Logout user
// @route   POST /api/auth/logout
// @access  private
router.delete('/logout', identifyUser, logoutUser)

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
router.get('/me', identifyUser, getMe);

module.exports = router;
