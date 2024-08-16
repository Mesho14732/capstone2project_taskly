const { BoardModel, TaskModel, UserModel } = require('../models'); // Import necessary models
const { cacheService } = require('./cacheService'); // Optional: Use a caching service for efficiency

class AnalyticsService {
  
  // Method to get general statistics for the dashboard
  async getGeneralStats() {
    try {
      // Use cache if available
      const cachedStats = await cacheService.get('generalStats');
      if (cachedStats) return cachedStats;

      // Fetch statistics from the database
      const userCount = await UserModel.countDocuments({});
      const boardCount = await BoardModel.countDocuments({});
      const taskCount = await TaskModel.countDocuments({});
      
      const stats = { userCount, boardCount, taskCount };
      
      // Cache the result for subsequent requests
      await cacheService.set('generalStats', stats, { ttl: 60 * 60 }); // Cache for 1 hour
      
      return stats;
    } catch (error) {
      throw new Error('Error fetching general statistics');
    }
  }
  
  // Method to get detailed task analytics (e.g., completed vs. pending tasks)
  async getTaskAnalytics(boardId) {
    try {
      // Fetch data related to tasks in a specific board
      const completedTasks = await TaskModel.countDocuments({ board: boardId, status: 'completed' });
      const pendingTasks = await TaskModel.countDocuments({ board: boardId, status: 'pending' });
      
      return {
        completedTasks,
        pendingTasks,
      };
    } catch (error) {
      throw new Error('Error fetching task analytics');
    }
  }

  // Method to get user engagement analytics
  async getUserEngagementAnalytics() {
    try {
      // Example logic: Calculate active users within the last month
      const activeUsers = await UserModel.countDocuments({ lastLogin: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } });

      return {
        activeUsers,
        period: 'Last 30 days',
      };
    } catch (error) {
      throw new Error('Error fetching user engagement analytics');
    }
  }
  
  // Additional analytics methods can be implemented as needed
}

module.exports =  AnalyticsService;
