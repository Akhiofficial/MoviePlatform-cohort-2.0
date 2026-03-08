const express = require('express');
const { getUsers, deleteUser } = require('../controllers/adminUser.controller');
const { identifyUser, isAdmin } = require('../middleware/auth.middleware');

const router = express.Router();

// Apply identifyUser and isAdmin middleware to all admin user routes
router.use(identifyUser);
router.use(isAdmin);

router.get('/', getUsers);
router.delete('/:id', deleteUser);

module.exports = router;
