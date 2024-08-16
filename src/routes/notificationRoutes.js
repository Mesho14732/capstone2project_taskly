const express = require('express');
const notificationRoutes = express.Router();
const notificationController = require ('../controllers/notificationController');

// Route to get all notifications
notificationRoutes.get('/', notificationController.getAllNotifications);

// Route to get a specific notification by ID
notificationRoutes.get('/:id', notificationController.getNotificationById);

// Route to create a new notification
notificationRoutes.post('/', notificationController.createNotification);

// Route to update an existing notification
notificationRoutes.put('/:id', notificationController.updateNotification);

// Route to delete a notification
notificationRoutes.delete('/:id', notificationController.deleteNotification);

module.exports = notificationRoutes;
