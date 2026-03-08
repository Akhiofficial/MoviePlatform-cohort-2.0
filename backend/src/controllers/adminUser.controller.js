const userModel = require('../models/user.model');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = async (req, res) => {
    try {
        const users = await userModel.find().select('-password').sort({ createdAt: -1 });

        res.status(200).json({
            message: 'Users fetched successfully',
            count: users.length,
            users
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Ban or delete a user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Prevent admin from deleting themselves
        if (req.user._id.toString() === id) {
            return res.status(400).json({ message: 'You cannot delete yourself' });
        }

        const user = await userModel.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User banned/deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getUsers,
    deleteUser
};
