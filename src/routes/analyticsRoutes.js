const express = require('express');
const analyticsRoutes = express.Router();
const analyticsController = require ('../Controllers/analyticsController');

// Route to get summary analytics
analyticsRoutes.get('/summary', analyticsController.getSummary);

// Route to get detailed analytics by ID
analyticsRoutes.get('/details/:id', analyticsController.getDetails);

module.exports = analyticsRoutes;
