// src/services/notificationService.js

const { NotificationModel } = require('../models/notificationModel'); 
const { User } = require('../models/userModel');
const { emailService } = require('./emailService'); 
const { logger } = require('../utils/logger'); 

class NotificationService {
    /**
     * Send a notification to a user
     * @param {ObjectId} userId 
     * @param {String} message 
     * @param {Object} options 
     */
    async sendNotification(userId, message, options = {}) {
        try {
            // Find the user
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }

            // Create a new notification in the database
            const notification = new NotificationModel({
                userId: user._id,
                message,
                read: false,
                createdAt: new Date(),
            });
            await notification.save();

            // Optionally send an email notification
            if (options.email) {
                await emailService.sendEmail(user.email, 'New Notification', message);
            }

            // Optionally send a push notification (if implemented)
            if (options.push) {
                // Logic for sending push notifications
            }

            return notification;
        } catch (error) {
            logger.error(`Failed to send notification: ${error.message}`);
            throw error;
        }
    }

    /**
     * Mark a notification as read
     * @param {ObjectId} notificationId - The ID of the notification to mark as read
     */
    async markAsRead(notificationId) {
        try {
            const notification = await NotificationModel.findByIdAndUpdate(
                notificationId,
                { read: true },
                { new: true }
            );
            if (!notification) {
                throw new Error('Notification not found');
            }

            return notification;
        } catch (error) {
            logger.error(`Failed to mark notification as read: ${error.message}`);
            throw error;
        }
    }

    /**
     * Get notifications for a user
     * @param {ObjectId} userId 
     * @param {Object} options 
     */
    async getUserNotifications(userId, options = {}) {
        try {
            const query = { userId };
            if (options.unreadOnly) {
                query.read = false;
            }

            const notifications = await NotificationModel.find(query)
                .sort({ createdAt: -1 })
                .limit(options.limit || 10);

            return notifications;
        } catch (error) {
            logger.error(`Failed to get notifications: ${error.message}`);
            throw error;
        }
    }

    /**
     * Delete a notification
     * @param {ObjectId} notificationId 
     */
    async deleteNotification(notificationId) {
        try {
            const result = await NotificationModel.findByIdAndDelete(notificationId);
            if (!result) {
                throw new Error('Notification not found');
            }

            return result;
        } catch (error) {
            logger.error(`Failed to delete notification: ${error.message}`);
            throw error;
        }
    }
}

module.exports = new NotificationService();
