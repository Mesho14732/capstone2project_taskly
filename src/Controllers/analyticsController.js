const analyticsService = require('../services/analyticsService');

// Fetch analytics data for a specific board
const getBoardAnalytics = async (req, res, next) => {
    try {
        const { boardId } = req.params;
        const analyticsData = await analyticsService.getBoardAnalytics(boardId);

        if (!analyticsData) {
            return res.status(404).json({ message: 'Analytics data not found for this board.' });
        }

        res.status(200).json({
            success: true,
            data: analyticsData,
        });
    } catch (error) {
        next(error);
    }
};

// Fetch analytics data for a specific user
const getUserAnalytics = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const analyticsData = await analyticsService.getUserAnalytics(userId);

        if (!analyticsData) {
            return res.status(404).json({ message: 'Analytics data not found for this user.' });
        }

        res.status(200).json({
            success: true,
            data: analyticsData,
        });
    } catch (error) {
        next(error);
    }
};

// Fetch analytics data for the entire application
const getAppAnalytics = async (req, res, next) => {
    try {
        const analyticsData = await analyticsService.getAppAnalytics();

        res.status(200).json({
            success: true,
            data: analyticsData,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getBoardAnalytics,
    getUserAnalytics,
    getAppAnalytics
}