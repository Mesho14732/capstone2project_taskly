
const NotificationService = require('../services/notificationService');
const { validationResult } = require('express-validator');

// Controller function to get all notifications for a user
const getAllNotifications = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is stored in the request object
        const notifications = await NotificationService.getAllNotifications(userId);
        return res.status(200).json({
            success: true,
            data: notifications
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Controller function to create a new notification
const createNotification = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }

    try {
        const { title, message, recipientId } = req.body;
        const newNotification = await NotificationService.createNotification({ title, message, recipientId });
        return res.status(201).json({
            success: true,
            data: newNotification
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Controller function to mark a notification as read
const markAsRead = async (req, res) => {
    try {
        const notificationId = req.params.id;
        const userId = req.user.id;
        const updatedNotification = await NotificationService.markAsRead(notificationId, userId);

        if (!updatedNotification) {
            return res.status(404).json({
                success: false,
                message: 'Notification not found'
            });
        }

        return res.status(200).json({
            success: true,
            data: updatedNotification
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Controller function to delete a notification
const deleteNotification = async (req, res) => {
    try {
        const notificationId = req.params.id;
        const userId = req.user.id;
        const deletedNotification = await NotificationService.deleteNotification(notificationId, userId);

        if (!deletedNotification) {
            return res.status(404).json({
                success: false,
                message: 'Notification not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Notification deleted'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

module.exports = {
    getAllNotifications,
    createNotification,
    markAsRead,
    deleteNotification
}