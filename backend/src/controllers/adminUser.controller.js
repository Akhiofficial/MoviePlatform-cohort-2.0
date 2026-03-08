const userModel = require('../models/user.model');
const movieModel = require('../models/movie.model');
const historyModel = require('../models/history.model');

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

// @desc    Get admin dashboard stats (user growth, counts, etc.)
// @route   GET /api/admin/users/stats
// @access  Private/Admin
const getStats = async (req, res) => {
    try {
        const now = new Date();

        // ── 7-day daily signup aggregation ──────────────────────────────
        const sevenDaysAgo = new Date(now);
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6); // inclusive of today = 7 days
        sevenDaysAgo.setHours(0, 0, 0, 0);

        const dailySignups = await userModel.aggregate([
            { $match: { createdAt: { $gte: sevenDaysAgo } } },
            {
                $group: {
                    _id: {
                        $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
                    },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        // Build a full 7-day array (fill missing days with 0)
        const userGrowth = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date(now);
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().slice(0, 10);
            const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d.getDay()];
            const found = dailySignups.find((x) => x._id === dateStr);
            userGrowth.push({ day, date: dateStr, count: found ? found.count : 0 });
        }

        // ── Total counts ─────────────────────────────────────────────────
        const [totalUsers, totalMovies, totalViews] = await Promise.all([
            userModel.countDocuments(),
            movieModel.countDocuments(),
            historyModel.countDocuments()  // each doc = 1 unique user × movie view
        ]);

        // ── User growth: this month vs last month ────────────────────────
        const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

        const thisMonthUsers = await userModel.countDocuments({
            createdAt: { $gte: startOfThisMonth }
        });
        const lastMonthUsers = await userModel.countDocuments({
            createdAt: { $gte: startOfLastMonth, $lt: startOfThisMonth }
        });

        const userGrowthPercent = lastMonthUsers === 0
            ? thisMonthUsers > 0 ? 100 : 0
            : Math.round(((thisMonthUsers - lastMonthUsers) / lastMonthUsers) * 100);

        // ── Movie growth: this week vs last week ─────────────────────────
        const startOfThisWeek = new Date(now);
        startOfThisWeek.setDate(now.getDate() - now.getDay());
        startOfThisWeek.setHours(0, 0, 0, 0);

        const startOfLastWeek = new Date(startOfThisWeek);
        startOfLastWeek.setDate(startOfLastWeek.getDate() - 7);

        const thisWeekMovies = await movieModel.countDocuments({
            createdAt: { $gte: startOfThisWeek }
        });
        const lastWeekMovies = await movieModel.countDocuments({
            createdAt: { $gte: startOfLastWeek, $lt: startOfThisWeek }
        });

        const movieGrowthPercent = lastWeekMovies === 0
            ? thisWeekMovies > 0 ? 100 : 0
            : Math.round(((thisWeekMovies - lastWeekMovies) / lastWeekMovies) * 100);

        res.status(200).json({
            message: 'Stats fetched successfully',
            totalUsers,
            totalMovies,
            totalViews,
            userGrowthPercent,
            movieGrowthPercent,
            userGrowth  // array of { day, date, count } for last 7 days
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
    getStats,
    deleteUser
};
