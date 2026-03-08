const express = require('express');
const { addHistory, getHistory } = require('../controllers/history.controller');
const { identifyUser } = require('../middleware/auth.middleware');

const router = express.Router();

// Apply auth middleware to all history routes
router.use(identifyUser);

/**
 * @route POST /api/history
 */
router.post('/', addHistory);

/**
 * @route GET /api/history
 */
router.get('/', getHistory);


module.exports = router;
